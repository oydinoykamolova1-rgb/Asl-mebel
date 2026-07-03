const express = require('express');
const path = require('path');
const cors = require('cors');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to send message to Telegram
function sendTelegramMessage(messageText) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === 'YOUR_TELEGRAM_BOT_TOKEN_HERE' || chatId === 'YOUR_TELEGRAM_CHAT_ID_HERE') {
    console.warn('⚠️ Telegram bot credentials are not configured. Message content:');
    console.log(messageText);
    return Promise.resolve({ success: false, message: 'Telegram credentials not configured. Logged to console.' });
  }

  const data = JSON.stringify({
    chat_id: chatId,
    text: messageText,
    parse_mode: 'HTML'
  });

  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${token}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ success: true, data: JSON.parse(responseBody) });
        } else {
          console.error(`Telegram API Error (Status ${res.statusCode}):`, responseBody);
          reject(new Error(`Telegram API responded with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Telegram request error:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Endpoint: Regular Order from Shopping Cart
app.post('/api/order', async (req, res) => {
  try {
    const { name, phone, address, cart, totalAmount } = req.body;

    if (!name || !phone || !address || !cart || cart.length === 0) {
      return res.status(400).json({ error: "Barcha ma'lumotlar to'ldirilishi shart!" });
    }

    // Format cart items
    let cartDetails = '';
    cart.forEach((item, index) => {
      const priceFormatted = new Intl.NumberFormat('uz-UZ').format(item.price);
      const totalItemPrice = new Intl.NumberFormat('uz-UZ').format(item.price * item.quantity);
      cartDetails += `${index + 1}. <b>${item.name}</b>\n`;
      cartDetails += `   Soni: ${item.quantity} dona | Narxi: ${priceFormatted} so'm\n`;
      cartDetails += `   Jami: ${totalItemPrice} so'm\n\n`;
    });

    const totalFormatted = new Intl.NumberFormat('uz-UZ').format(totalAmount);

    const message = `🔔 <b>YANGI BUYURTMA (Asl Mebellar)</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>Mijoz:</b> ${name}\n` +
      `📞 <b>Telefon:</b> ${phone}\n` +
      `📍 <b>Manzil:</b> ${address}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🛒 <b>Mahsulotlar:</b>\n\n${cartDetails}` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 <b>JAMI TO'LOV:</b> <b>${totalFormatted} so'm</b>\n` +
      `📅 <b>Sana:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}\n` +
      `🚚 <i>Kredit/Yetkazib berish so'raladi</i>`;

    const result = await sendTelegramMessage(message);
    res.status(200).json({ success: true, message: "Buyurtmangiz muvaffaqiyatli qabul qilindi!", result });
  } catch (error) {
    console.error('Order handling error:', error);
    res.status(500).json({ error: "Buyurtmani yuborishda xatolik yuz berdi. Iltimos keyinroq urinib ko'ring." });
  }
});

// Endpoint: Custom Order
app.post('/api/custom-order', async (req, res) => {
  try {
    const { name, phone, furnitureType, dimensions, material, color, details } = req.body;

    if (!name || !phone || !furnitureType) {
      return res.status(400).json({ error: "Ism, telefon va mebel turi to'ldirilishi shart!" });
    }

    const message = `🛠 <b>BUYURTMA ASOSIDA MEBEL YASASH</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>Mijoz:</b> ${name}\n` +
      `📞 <b>Telefon:</b> ${phone}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🪑 <b>Mebel turi:</b> ${furnitureType}\n` +
      `📏 <b>O'lchamlar (Uzunlik x Kenglik x Bo'yi):</b> ${dimensions || "Kiritilmagan"}\n` +
      `🪵 <b>Material:</b> ${material || "Kiritilmagan"}\n` +
      `🎨 <b>Rang:</b> ${color || "Kiritilmagan"}\n` +
      `📝 <b>Qo'shimcha tafsilotlar:</b>\n<i>${details || "Yo'q"}</i>\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📅 <b>Sana:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;

    const result = await sendTelegramMessage(message);
    res.status(200).json({ success: true, message: "Buyurtmangiz muvaffaqiyatli qabul qilindi!", result });
  } catch (error) {
    console.error('Custom order handling error:', error);
    res.status(500).json({ error: "Buyurtmani yuborishda xatolik yuz berdi. Iltimos keyinroq urinib ko'ring." });
  }
});

// Serve Frontend SPA router fallback (for clean routes if required, default to index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} portida ishlamoqda.`);
});
