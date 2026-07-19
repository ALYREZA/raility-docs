# راهنمای کاربری ریالیتی (Docusaurus)

سایت کمک فارسی و RTL برای اپ ریالیتی.

## اجرا

```bash
cd web
npm install
npm start
```

سایت روی `http://localhost:3000` باز می‌شود.

## ساخت نسخهٔ تولید

```bash
npm run build
npm run serve
```

## ساختار محتوا

| مسیر | نقش |
| --- | --- |
| `src/pages/index.tsx` | صفحه اول — معرفی کوتاه |
| `docs/*.mdx` | راهنما و how-to هر بخش اپ |
| `src/css/custom.css` | فونت Estedad، رنگ برند، موبایل‌اول |
| `static/fonts/` | فایل‌های فونت Estedad |

زبان پیش‌فرض: **فارسی (`fa`)** با جهت **RTL**.
