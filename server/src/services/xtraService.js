import axios from 'axios';
import qs from 'qs';

const XTRA_BASE = 'https://xtragateway.site/api';
const USER_TOKEN = process.env.PAYMENT_TOKEN;
const FRONTEND = process.env.FRONT_END || 'http://localhost:5173';

export async function createOrder({ customer_mobile = '', amount, order_id, redirect_path = '/', remark1 = '', remark2 = '' }) {
  const url = `${XTRA_BASE}/create-order`;
  
  // XtraGate expects form-encoded data
  const payload = qs.stringify({
    customer_mobile,
    user_token: USER_TOKEN,
    amount: String(amount),
    order_id,
    redirect_url: `${FRONTEND}${redirect_path}`,
    remark1,
    remark2,
  });

  const resp = await axios.post(url, payload, { 
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
  });
  return resp.data;
}

export async function checkOrderStatus({ order_id }) {
  const url = `${XTRA_BASE}/check-order-status`;
  const form = qs.stringify({ user_token: USER_TOKEN, order_id });
  const resp = await axios.post(url, form, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  return resp.data;
}
