import { Product } from "../models/Product.model.js";
import Order from "../models/Order.model.js";
import * as xtra from "../services/xtraService.js";
import QRCode from 'qrcode';
import { sendOrderSuccessEmail } from "../services/mailer.services.js";
import { User } from "../models/User.model.js";

function makeTransactionId() {
  return `MOMO${Date.now()}${Math.random().toString(36).substring(2,8).toUpperCase()}`;
}

export const createXtraOrder = async (req, res) => {
  try {
    const { products, customer_mobile = '', customer_email = '', customer_game_id = '', customer_server_id = '', customer_account_link = '', remark1, remark2, redirect_path } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ ok: false, message: 'Products array required' });
    }

    if (!process.env.PAYMENT_TOKEN) {
      return res.status(500).json({ 
        ok: false, 
        message: 'Payment gateway not configured. Please contact administrator.' 
      });
    }

    let totalAmount = 0;
    const validatedProducts = await Promise.all(products.map(async (p) => {
      const db = await Product.findById(p._id);
      if (!db) throw new Error(`Product ${p._id} not found`);
      const price = db.getPriceForDuration ? db.getPriceForDuration(p.duration) : (db.price || 0);
      if (!price) throw new Error(`Price not found for duration ${p.duration} on product ${db.name}`);
      const qty = p.quantity && p.quantity > 0 ? p.quantity : 1;
      totalAmount += price * qty;
      return { product: db._id, quantity: qty, price, duration: p.duration };
    }));

    const transactionId = makeTransactionId();

    if (!req.user || !req.user._id) {
      return res.status(401).json({ 
        ok: false, 
        message: 'Please log in to create an order' 
      });
    }

    
    const newOrder = new Order({
      user: req.user._id, 
      products: validatedProducts.map(v => ({ product: v.product, quantity: v.quantity, price: v.price, duration: v.duration })),
      totalAmount,
      orderStatus: 'pending',
      transactionId,
      customerWhatsapp: customer_mobile,
      customerEmail: customer_email,
      customerGameId: customer_game_id,
      customerServerId: customer_server_id,
      customerAccountLink: customer_account_link,
    });

    await newOrder.save();

    
    let gatewayResp;
    try {
      gatewayResp = await xtra.createOrder({
        customer_mobile,
        amount: totalAmount,
        order_id: transactionId,
        redirect_path: `/checkout?orderId=${newOrder._id}&txnId=${transactionId}`,
        remark1: remark1 || `Order ${newOrder._id}`,
        remark2: remark2 || ''
      });
    } catch (gatewayError) {
      console.error('XtraGate API Error:', gatewayError.response?.data || gatewayError.message);
      
      
      newOrder.orderStatus = 'cancelled';
      await newOrder.save();
      
      return res.status(502).json({ 
        ok: false, 
        message: 'Payment gateway error. Please try again later.',
        error: gatewayError.response?.data?.message || gatewayError.message
      });
    }

    if (gatewayResp && gatewayResp.status === true && gatewayResp.result) {
      newOrder.paymentId = gatewayResp.result.orderId || gatewayResp.result.order_id || newOrder.paymentId;
      newOrder.paymentVerifiedAt = undefined;
      await newOrder.save();

      return res.json({
        ok: true,
        message: 'Order created',
        order: {
          id: newOrder._id,
          transactionId,
          totalAmount,
          payment_url: gatewayResp.result.payment_url,
        }
      });
    }

    newOrder.orderStatus = 'cancelled';
    await newOrder.save();
    
    return res.status(502).json({ ok: false, message: 'Gateway error', gatewayResp });
  } catch (err) {
    console.error('createXtraOrder error', err);
    return res.status(500).json({ ok: false, message: 'Server error', error: err.message });
  }
};

export const checkXtraOrderStatus = async (req, res) => {
  try {
    const { orderId, transactionId } = req.body;
    let order = null;
    if (orderId) order = await Order.findById(orderId);
    else if (transactionId) order = await Order.findOne({ transactionId });

    if (!order) return res.status(404).json({ ok: false, message: 'Order not found' });

    const idToCheck = order.paymentId || order.transactionId;
    const resp = await xtra.checkOrderStatus({ order_id: idToCheck });

    const isSuccess = resp && (
      resp.status === 'COMPLETED' || 
      resp.status === 'SUCCESS' ||
      resp.status === true ||
      (resp.result && (
        resp.result.txnStatus === 'COMPLETED' || 
        resp.result.txnStatus === 'SUCCESS' || 
        resp.result.status === 'SUCCESS'
      ))
    );
    
    if (isSuccess) {
      order.orderStatus = 'completed';
      order.deliveryStatus = 'processing';
      order.paymentVerifiedAt = new Date();
      order.payment_details = resp.result || resp;
      await order.save();

      await order.populate('products.product');
      
      try {
        const user = await User.findById(order.user);
        if (user && user.email) {
          sendOrderSuccessEmail(order, user);
        }
      } catch (emailError) {
        console.error('Order email error:', emailError.message);
      }
      
      return res.json({ ok: true, message: 'Transaction completed', result: resp.result || resp });
    }

    order.payment_details = resp.result || resp;
    await order.save();
    return res.json({ ok: true, message: 'Status fetched', result: resp });
  } catch (err) {
    console.error('checkXtraOrderStatus error', err);
    return res.status(500).json({ ok: false, message: 'Server error', error: err.message });
  }
};
