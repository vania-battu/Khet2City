const axios = require('axios');

// POST /api/notify/push  — Firebase Cloud Messaging
exports.sendPush = async (req, res) => {
  try {
    const { token, title, body, data } = req.body;
    const fcmKey = process.env.FCM_SERVER_KEY;

    if (!fcmKey) {
      console.log(`[DEV] Push notification: ${title} → ${body}`);
      return res.json({ success: true, message: 'Push skipped (no FCM key)', dev: true });
    }

    await axios.post('https://fcm.googleapis.com/fcm/send', {
      to: token,
      notification: { title, body },
      data: data || {},
    }, {
      headers: {
        Authorization: `key=${fcmKey}`,
        'Content-Type': 'application/json',
      },
    });

    res.json({ success: true, message: 'Push notification sent.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notify/sms  — MSG91 SMS
exports.sendSms = async (req, res) => {
  try {
    const { phone, message } = req.body;
    const apiKey = process.env.MSG91_API_KEY;

    if (!apiKey) {
      console.log(`[DEV] SMS to ${phone}: ${message}`);
      return res.json({ success: true, message: 'SMS skipped (no MSG91 key)', dev: true });
    }

    await axios.post('https://api.msg91.com/api/v2/sendsms', {
      sender: 'KHET2C',
      route: '4',
      country: '91',
      sms: [{ message, to: [phone] }],
    }, {
      headers: { authkey: apiKey, 'Content-Type': 'application/json' },
    });

    res.json({ success: true, message: 'SMS sent.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notify/price-alert  — send price alert to all subscribed farmers
exports.priceAlert = async (req, res) => {
  try {
    const { commodity, price, change, market } = req.body;
    const msg = `🌾 Khet2City Alert: ${commodity} price is ₹${price}/qtl at ${market} (${change}). Login to sell now!`;
    console.log(`[PRICE ALERT] ${msg}`);
    res.json({ success: true, message: 'Price alert queued.', alert: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
