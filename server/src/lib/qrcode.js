import QRCode from 'qrcode';

/**
 * Generate QR code for GPay merchant payment
 * @param {Object} options - QR code generation options
 * @param {String} options.merchantId - GPay merchant ID (UPI ID)
 * @param {Number} options.amount - Amount in rupees
 * @param {String} options.transactionId - Unique transaction ID
 * @param {String} options.merchantName - Merchant name (optional)
 * @returns {Promise<String>} - Base64 encoded QR code image
 */
export const generateGPayQRCode = async ({ merchantId, amount, transactionId, merchantName = 'OTTMOMO' }) => {
    try {
        // Validate inputs
        if (!merchantId) {
            throw new Error('GPay merchant ID is required');
        }
        if (!amount || amount <= 0) {
            throw new Error('Valid amount is required');
        }
        if (!transactionId) {
            throw new Error('Transaction ID is required');
        }

        // Format amount to 2 decimal places
        const formattedAmount = parseFloat(amount).toFixed(2);

        // Create UPI payment string
        // Format: upi://pay?pa=<merchant_id>&pn=<merchant_name>&am=<amount>&cu=INR&tn=<transaction_note>
        const upiString = `upi://pay?pa=${encodeURIComponent(merchantId)}&pn=${encodeURIComponent(merchantName)}&am=${formattedAmount}&cu=INR&tn=${encodeURIComponent(`OTTMOMO Order ${transactionId}`)}`;

        // Generate QR code as data URL (base64)
        const qrCodeDataURL = await QRCode.toDataURL(upiString, {
            errorCorrectionLevel: 'M',
            type: 'image/png',
            quality: 0.92,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            width: 300
        });

        return qrCodeDataURL;
    } catch (error) {
        console.error('Error generating GPay QR code:', error);
        throw error;
    }
};

/**
 * Generate QR code as buffer (for direct download)
 * @param {Object} options - QR code generation options
 * @returns {Promise<Buffer>} - QR code image buffer
 */
export const generateGPayQRCodeBuffer = async ({ merchantId, amount, transactionId, merchantName = 'OTTMOMO' }) => {
    try {
        if (!merchantId) {
            throw new Error('GPay merchant ID is required');
        }
        if (!amount || amount <= 0) {
            throw new Error('Valid amount is required');
        }
        if (!transactionId) {
            throw new Error('Transaction ID is required');
        }

        const formattedAmount = parseFloat(amount).toFixed(2);
        const upiString = `upi://pay?pa=${encodeURIComponent(merchantId)}&pn=${encodeURIComponent(merchantName)}&am=${formattedAmount}&cu=INR&tn=${encodeURIComponent(`OTTMOMO Order ${transactionId}`)}`;

        const qrCodeBuffer = await QRCode.toBuffer(upiString, {
            errorCorrectionLevel: 'M',
            type: 'image/png',
            margin: 1,
            width: 300
        });

        return qrCodeBuffer;
    } catch (error) {
        console.error('Error generating GPay QR code buffer:', error);
        throw error;
    }
};

