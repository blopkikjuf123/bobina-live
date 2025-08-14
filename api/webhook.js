const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

module.exports = async function (req, res) {
  console.log('🔴 Incoming request:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await bot.handleUpdate(req.body);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('💥 Webhook error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
