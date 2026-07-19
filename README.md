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

## Docker و Caddy

با هر push به `main`، GitHub Actions تصویر را می‌سازد و به GHCR می‌فرستد:

`ghcr.io/alyreza/raility-docs:latest`

### روی سرور

```bash
# اگر ریپو خصوصی است، یک‌بار لاگین کنید
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USER --password-stdin

docker compose pull
docker compose up -d
```

Caddy روی پورت‌های ۸۰/۴۴۳ گوش می‌دهد، TLS را برای `help.riality.app` می‌گیرد، و ترافیک را به سرویس `docs` پروکسی می‌کند.

برای تست محلی بدون دامنه، در `deploy/Caddyfile` موقتاً بنویسید:

```caddy
:80 {
	reverse_proxy docs:80
}
```

### ساخت محلی تصویر

```bash
docker build -t raility-docs .
docker run --rm -p 8080:80 raility-docs
```
