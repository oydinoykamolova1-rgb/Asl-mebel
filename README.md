# 🛋️ Asl Mebellar — Premium Onlayn Mebel Do'koni

<div align="center">

![Asl Mebellar](https://img.shields.io/badge/Asl%20Mebellar-Premium%20Furniture-8B4513?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxIDIwVjhhMiAyIDAgMCAwLTItMkg1YTIgMiAwIDAgMC0yIDJ2MTJIM3YyaDE4di0yaC0xek01IDhoMTR2OEg1VjhaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Telegram](https://img.shields.io/badge/Telegram-Bot%20API-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)

**Guliston shahrida joylashgan "Asl Mebellar" do'koni uchun yaratilgan zamonaviy, to'liq ishlaydigan e-commerce veb-sayt.**

[🌐 Demo Ko'rish](#-ishga-tushirish) • [📦 O'rnatish](#-ornatish) • [⚙️ Sozlash](#️-telegram-bot-sozlash)

</div>

---

## 📸 Sayt Ko'rinishi

| Bosh Sahifa | Mahsulotlar Katalogi |
|:-----------:|:--------------------:|
| Hero banner, aksiyalar, kategoriyalar | Filtrlash, qidiruv, savat |

| Buyurtma Shakli | Aloqa va Xarita |
|:-----------:|:--------------------:|
| Individual mebel buyurtmasi | Google Xarita, kontakt |

---

## ✨ Xususiyatlar

### Frontend
- 🎨 **Premium dizayn** — To'q jigarrang (chocolate), tillarangi va krem rang uyg'unligi
- 📱 **Responsive** — Mobil, planshet va kompyuterlarda mukammal ishlaydi
- ✨ **Animatsiyalar** — Hover effektlar, fade-in, smooth transitions
- 🔤 **Premium shriftlar** — Google Fonts: `Outfit` + `Playfair Display`

### Sahifalar
- 🏠 **Bosh sahifa** — Hero banner, promo aksiyalar, kategoriyalar, about section
- 🛋️ **Katalog** — 8 ta mebel, kategoriya filter, qidiruv, narx saralash
- 🛒 **Savat** — Mahsulot qo'shish/o'chirish, soni o'zgartirish, jami narx
- 📋 **Buyurtma shakli** — Tur, o'lcham, material, rang, tafsilot maydonlari
- 📍 **Aloqa** — Do'kon ma'lumotlari, Google Maps, ijtimoiy tarmoqlar

### Backend
- ⚡ **Express.js** server
- 📦 **LocalStorage** — Savat ma'lumotlari saqlanadi
- 📲 **Telegram Bot API** — Buyurtmalar to'g'ridan-to'g'ri Telegramga keladi
- 🔔 **Toast bildirishnomalar** — Foydalanuvchi uchun real-time feedback

---

## 🗂️ Loyiha Tuzilmasi

```
Asl-mebel/
├── 📄 server.js          # Express server + Telegram API integratsiyasi
├── 📦 package.json       # Loyiha bog'liqliklari
├── 🔒 .env.example       # Muhit o'zgaruvchilari namunasi
├── 🚫 .gitignore
└── 📁 public/
    ├── 🌐 index.html     # Asosiy HTML sahifa (SPA)
    ├── 🎨 styles.css     # Premium CSS stillar
    └── ⚡ app.js         # Frontend mantiq va interaktivlik
```

---

## 🚀 O'rnatish

### Talablar
- [Node.js](https://nodejs.org/) v18 yoki undan yuqori
- npm (Node.js bilan birga o'rnatiladi)

### Qadamlar

```bash
# 1. Repozitoriyani yuklab oling
git clone https://github.com/oydinoykamolova1-rgb/Asl-mebel.git

# 2. Papkaga kiring
cd Asl-mebel

# 3. Bog'liqliklarni o'rnating
npm install

# 4. .env faylini yarating
cp .env.example .env

# 5. .env faylini tahrirlang (quyida ko'rsatilgan)

# 6. Serverni ishga tushiring
node server.js
```

Brauzerda oching: **http://localhost:3000**

---

## ⚙️ Telegram Bot Sozlash

Buyurtmalar Telegramga kelishi uchun `.env` faylini to'ldiring:

```dotenv
PORT=3000
TELEGRAM_BOT_TOKEN=123456789:AABbCcDd-YourRealTokenHere
TELEGRAM_CHAT_ID=123456789
```

### Bot Token olish:
1. Telegramda **@BotFather** ga `/newbot` yuboring
2. Botga nom bering
3. Berilgan tokenni nusxalab `.env` ga joylashtiring

### Chat ID olish:
1. Telegramda **@userinfobot** ga xabar yuboring
2. U sizga `id` raqamini qaytaradi
3. Shu raqamni `TELEGRAM_CHAT_ID` ga yozing

> [!WARNING]
> `.env` faylini **hech qachon** GitHub'ga yuklamang! `.gitignore` orqali himoyalangan.

---

## 📲 Telegram Xabar Ko'rinishi

Mijoz buyurtma berganda administratorga quyidagicha xabar keladi:

```
🔔 YANGI BUYURTMA (Asl Mebellar)
━━━━━━━━━━━━━━━━━━━━━━
👤 Mijoz: Alisher Toshmatov
📞 Telefon: +998901234567
📍 Manzil: Guliston, Yangi bozor ko'chasi 12-uy
━━━━━━━━━━━━━━━━━━━━━━
🛒 Mahsulotlar:

1. "Imperiya" premium yotoqxona to'plami
   Soni: 1 dona | Narxi: 14 500 000 so'm
   Jami: 14 500 000 so'm

━━━━━━━━━━━━━━━━━━━━━━
💰 JAMI TO'LOV: 14 500 000 so'm
📅 Sana: 03/07/2026, 13:17:55
🚚 Kredit/Yetkazib berish so'raladi
```

---

## 🌐 Internet'ga Chiqarish (Deploy)

### Render.com (Bepul)
1. [render.com](https://render.com) da ro'yxatdan o'ting
2. **New → Web Service** tanlang
3. Shu GitHub reponi ulang
4. **Environment Variables** bo'limiga `.env` qiymatlarini kiriting
5. **Deploy** bosing — URL avtomatik beriladi!

### Railway.app (Bepul)
1. [railway.app](https://railway.app) ga GitHub orqali kiring
2. **New Project → Deploy from GitHub** tanlang
3. Repo tanlang va **Variables** bo'limiga `.env` qiymatlarini kiriting

---

## 🏪 Do'kon Ma'lumotlari

| | |
|--|--|
| 📍 **Manzil** | Guliston shahar, Yangi bozor tomon yo'nalishda, 11-maktab yaqinida |
| 📞 **Telefon** | +998 88 277 77 71 / +998 87 322 00 66 |
| ⏰ **Ish vaqti** | Har kuni 08:00 dan 00:00 gacha |
| 📸 **Instagram** | [@Asl.Mebellar](https://instagram.com/Asl.Mebellar) |

---

## 🛠️ Texnologiyalar

| Qatlam | Texnologiya |
|--------|-------------|
| Frontend | HTML5, CSS3 (Vanilla), JavaScript (ES6+) |
| Backend | Node.js, Express.js |
| Bot integratsiya | Telegram Bot API (HTTPS) |
| Ma'lumot saqlash | LocalStorage (savat), dotenv (muhit) |
| Shriftlar | Google Fonts (Outfit, Playfair Display) |
| Ikonlar | Font Awesome 6 |

---

## 📄 Litsenziya

Ushbu loyiha **"Asl Mebellar"** do'koni uchun maxsus yaratilgan.

---

<div align="center">

Made with ❤️ for **Asl Mebellar** • Guliston, Uzbekistan 🇺🇿

</div>
