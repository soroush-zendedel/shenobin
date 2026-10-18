# ShenoBin

**A browser-based music workspace for learning theory, composing, and experimenting with sound.**

[![Version](https://img.shields.io/badge/version-1.0.0-00bfc2)](manifest.json)
[![License: GPL-3.0-or-later](https://img.shields.io/badge/license-GPL--3.0--or--later-blue)](LICENSE)
[![Languages: English and Persian](https://img.shields.io/badge/languages-English%20%7C%20Persian-7b61a8)](#pages-and-languages)

**ShenoBin** brings a piano-roll workspace, music-theory tools, synthesized sound, and idea-generation features together in one web app. Use it to explore harmony, sketch a musical idea, listen to it in the browser, and export it for further work in a DAW.

- **Live site:** [English](https://soroush-zendedel.github.io/shenobin/) · [فارسی](https://soroush-zendedel.github.io/shenobin/fa/)
- **Studio:** [Open ShenoBin](https://soroush-zendedel.github.io/shenobin/app.html)
- **Product information:** [About ShenoBin](https://soroush-zendedel.github.io/shenobin/about.html) · [دربارهٔ شنوبین](https://soroush-zendedel.github.io/shenobin/fa/about.html)
- **Source and issue tracker:** [GitHub repository](https://github.com/soroush-zendedel/shenobin)
- **License:** [GNU GPL version 3 or later](LICENSE)

## What you can do

- Write, move, resize, and play notes in a piano roll; adjust tempo, key, and scale.
- Explore harmonic relationships with the Circle of Fifths, chord calculator, and chord suggestions.
- Generate melody continuations with a Markov-chain process, create drum patterns, and sketch song structures.
- Play notes with the built-in synthesizer and use the practice display to follow chords.
- Import MIDI, save and reopen project files, and export MIDI or WAV.
- Save projects to the cloud when signed in and connected to the configured service.

ShenoBin is intended for music learners and teachers, songwriters, and producers who want a quick place to explore theory or develop a musical sketch. It complements a full DAW rather than replacing one.

## Pages and languages

| Page | English | فارسی |
| --- | --- | --- |
| Landing page | [Open](https://soroush-zendedel.github.io/shenobin/) · `/` | [باز کردن](https://soroush-zendedel.github.io/shenobin/fa/) · `/fa/` |
| Product About page | [Open](https://soroush-zendedel.github.io/shenobin/about.html) · `/about.html` | [باز کردن](https://soroush-zendedel.github.io/shenobin/fa/about.html) · `/fa/about.html` |
| Music studio | [Open](https://soroush-zendedel.github.io/shenobin/app.html) · `/app.html` | The studio interface is currently in English. |
| Privacy | [Privacy policy](https://soroush-zendedel.github.io/shenobin/privacy.html) · `/privacy.html` | The published privacy page is currently in English. |

The landing and About pages are available in English and Persian. `sitemap.xml` lists the public pages and the reciprocal language alternatives for translated pairs.

## Run locally

The site is served as static files. You do not need Node.js, npm, pnpm, or a frontend build step. Run a local web server from the project root; opening `app.html` directly as a `file://` URL may prevent JavaScript modules from loading.

### Python

With Python 3 installed, run:

```bash
python -m http.server 8000
```

On Windows, `py -m http.server 8000` may be used instead. Open [http://localhost:8000](http://localhost:8000). Stop the server with `Ctrl+C`.

### Docker Compose

Install Docker Desktop or Docker Engine with the Compose v2 plugin, then run this from the repository root:

```bash
docker compose up --build -d
```

Open [http://localhost:8080](http://localhost:8080). Compose binds the web server to `127.0.0.1`, so it is available on the local machine. To use a different host port in PowerShell:

```powershell
$env:SHENOBIN_PORT = "8081"
docker compose up --build -d
```

In Bash or another POSIX shell:

```bash
SHENOBIN_PORT=8081 docker compose up --build -d
```

Useful commands:

```bash
docker compose logs -f web  # Follow the web server logs
docker compose ps           # Check service status
docker compose down         # Stop and remove the container
```

The first Docker build needs to download the Nginx base image. The container serves the project files through Nginx; it does not run a separate application build.

## Browser support and connectivity

The studio requires JavaScript, ES modules, HTML Canvas, and the Web Audio API. Use a current desktop browser for the full workspace. Audio playback may require a user gesture, as required by browser audio policies.

Core composition and sound features run in the browser. Sign-in and cloud project storage require an internet connection and the configured Supabase service. The repository also contains a Manifest V3 browser-extension package; it is not distributed through a browser extension store from this repository.

## Project layout

```text
.
├── index.html              # English landing page
├── fa/
│   ├── index.html          # Persian landing page
│   └── about.html          # Persian product information
├── about.html              # English product information
├── app.html                # Music studio
├── privacy.html            # Privacy policy
├── css/style.css           # Studio styles
├── js/                     # Studio modules and local dependencies
├── img/                    # Landing and feature images
├── assets/                 # Social image and local fonts
├── icons/                  # Site and extension icons
├── manifest.json           # Browser-extension manifest
├── background.js           # Extension service worker
├── docker-compose.yml      # Local web-server configuration
├── Dockerfile              # Nginx static-site image
├── nginx.conf              # Nginx site configuration
├── sitemap.xml             # Public URL and language-alternate sitemap
└── LICENSE                 # GNU GPL version 3 or later
```

The public landing pages use self-contained HTML and CSS. The studio’s JavaScript is organized into modules for application state, drawing, interaction, audio, theory, MIDI, history, and export.

## Development and contributions

For a content-only change, edit the relevant HTML page. Landing-page styles are in each landing page’s inline `<style>` block; studio styles are in `css/style.css`, and studio behavior is implemented in `js/`.

When changing public pages, keep language-specific text and metadata aligned, use working relative asset links, and update `sitemap.xml` when public URLs or their last-modified dates change. Keep product claims consistent with visible behavior and the project license.

Issues and pull requests are welcome. For larger changes, opening an issue first helps discuss the intended behavior. Do not commit local environment files, credentials, or generated project exports.

## License

ShenoBin is free software distributed under the **GNU General Public License, version 3 or (at your option) any later version**. See [LICENSE](LICENSE) for the license text and redistribution terms.

For inquiries about commercial licensing, contact [Soroush Zendedel](mailto:Soroush_Zendedel@Live.com). The terms in `LICENSE` apply unless a separate license is arranged.

---

# شنوبین

**فضای موسیقی در مرورگر برای یادگیری تئوری، آهنگ‌سازی و تجربه با صدا.**

**شنوبین** پیانو رول، ابزارهای تئوری موسیقی، صدای تولیدشده و قابلیت‌های ایده‌پردازی را در یک برنامهٔ تحت وب کنار هم قرار می‌دهد. با آن هارمونی را بررسی کنید، طرح موسیقایی بسازید، در مرورگر بشنوید و برای ادامهٔ کار به نرم‌افزار آهنگ‌سازی خود خروجی بگیرید.

- **نسخهٔ آنلاین:** [English](https://soroush-zendedel.github.io/shenobin/) · [فارسی](https://soroush-zendedel.github.io/shenobin/fa/)
- **استودیو:** [اجرای شنوبین](https://soroush-zendedel.github.io/shenobin/app.html)
- **معرفی محصول:** [About ShenoBin](https://soroush-zendedel.github.io/shenobin/about.html) · [دربارهٔ شنوبین](https://soroush-zendedel.github.io/shenobin/fa/about.html)
- **کد منبع و گزارش مشکل:** [مخزن گیت‌هاب](https://github.com/soroush-zendedel/shenobin)
- **مجوز:** [GNU GPL نسخهٔ ۳ یا بالاتر](LICENSE)

## چه کارهایی می‌توانید انجام دهید؟

- نت‌ها را در پیانو رول بنویسید، جابه‌جا یا کوتاه‌وبلند کنید و پخش کنید؛ تمپو، گام و تونالیته را تنظیم کنید.
- ارتباط هارمونیک را با دایرهٔ پنجم‌ها، محاسبه‌گر آکورد و پیشنهادهای آکورد بررسی کنید.
- با فرایند زنجیرهٔ مارکوف ادامهٔ ملودی بسازید، الگوی درام تولید کنید و ساختار قطعه را طرح‌ریزی کنید.
- نت‌ها را با سینتی‌سایزر داخلی بشنوید و در حالت تمرین آکوردها را دنبال کنید.
- فایل MIDI وارد کنید، پروژه را ذخیره و دوباره باز کنید و خروجی MIDI یا WAV بگیرید.
- پس از ورود به حساب و اتصال به سرویس پیکربندی‌شده، پروژه‌ها را در فضای ابری ذخیره کنید.

شنوبین برای هنرجوها و مدرس‌های موسیقی، ترانه‌سراها و تولیدکنندگانی مناسب است که محیطی سریع برای بررسی تئوری یا گسترش یک طرح موسیقایی می‌خواهند. این ابزار مکمل نرم‌افزار کامل آهنگ‌سازی است و جایگزین آن نیست.

## صفحه‌ها و زبان‌ها

| صفحه | English | فارسی |
| --- | --- | --- |
| صفحهٔ اصلی | [باز کردن](https://soroush-zendedel.github.io/shenobin/) · `/` | [باز کردن](https://soroush-zendedel.github.io/shenobin/fa/) · `/fa/` |
| معرفی محصول | [Open](https://soroush-zendedel.github.io/shenobin/about.html) · `/about.html` | [باز کردن](https://soroush-zendedel.github.io/shenobin/fa/about.html) · `/fa/about.html` |
| استودیو موسیقی | [Open](https://soroush-zendedel.github.io/shenobin/app.html) · `/app.html` | رابط استودیو در حال حاضر انگلیسی است. |
| حریم خصوصی | [سیاست حریم خصوصی](https://soroush-zendedel.github.io/shenobin/privacy.html) · `/privacy.html` | صفحهٔ منتشرشدهٔ حریم خصوصی فعلاً انگلیسی است. |

صفحه‌های اصلی و معرفی محصول به فارسی و انگلیسی در دسترس‌اند. `sitemap.xml` صفحه‌های عمومی و پیوندهای متقابل نسخه‌های ترجمه‌شده را فهرست می‌کند.

## اجرای محلی

سایت به‌صورت فایل‌های ایستا ارائه می‌شود و برای اجرا به Node.js، npm، pnpm یا مرحلهٔ build فرانت‌اند نیاز ندارد. سرور محلی را از ریشهٔ پروژه اجرا کنید؛ بازکردن مستقیم `app.html` با نشانی `file://` ممکن است مانع بارگذاری ماژول‌های JavaScript شود.

### با Python

با نصب Python 3، این دستور را اجرا کنید:

```bash
python -m http.server 8000
```

در ویندوز می‌توانید از `py -m http.server 8000` استفاده کنید. سپس [http://localhost:8000](http://localhost:8000) را باز کنید. برای توقف سرور `Ctrl+C` را بزنید.

### با Docker Compose

Docker Desktop یا Docker Engine به‌همراه افزونهٔ Compose نسخهٔ ۲ را نصب کنید و از ریشهٔ مخزن اجرا کنید:

```bash
docker compose up --build -d
```

سپس [http://localhost:8080](http://localhost:8080) را باز کنید. Compose وب‌سرور را به `127.0.0.1` متصل می‌کند؛ بنابراین از همان دستگاه در دسترس است. برای انتخاب پورت میزبان دیگر در PowerShell:

```powershell
$env:SHENOBIN_PORT = "8081"
docker compose up --build -d
```

در Bash یا پوسته‌های مشابه:

```bash
SHENOBIN_PORT=8081 docker compose up --build -d
```

دستورهای کاربردی:

```bash
docker compose logs -f web  # مشاهدهٔ پیوستهٔ گزارش وب‌سرور
docker compose ps           # بررسی وضعیت سرویس
docker compose down         # توقف و حذف کانتینر
```

ساخت Docker در اجرای نخست به دریافت image پایهٔ Nginx نیاز دارد. کانتینر فایل‌های پروژه را با Nginx ارائه می‌کند و برنامه را جداگانه build نمی‌کند.

## مرورگر و اتصال شبکه

استودیو به JavaScript، ماژول‌های ES، HTML Canvas و Web Audio API نیاز دارد. برای استفاده از همهٔ بخش‌های محیط کار از مرورگر دسکتاپ به‌روز استفاده کنید. طبق سیاست مرورگرها، شروع پخش صدا ممکن است به تعامل کاربر نیاز داشته باشد.

ابزارهای اصلی ساخت موسیقی در مرورگر اجرا می‌شوند. ورود به حساب و ذخیرهٔ ابری به اینترنت و سرویس Supabase پیکربندی‌شده نیاز دارد. مخزن همچنین بستهٔ افزونهٔ مرورگر با Manifest نسخهٔ ۳ دارد؛ این مخزن افزونه را از طریق فروشگاه رسمی مرورگرها منتشر نمی‌کند.

## ساختار پروژه

```text
.
├── index.html              # صفحهٔ اصلی انگلیسی
├── fa/
│   ├── index.html          # صفحهٔ اصلی فارسی
│   └── about.html          # معرفی محصول به فارسی
├── about.html              # معرفی محصول به انگلیسی
├── app.html                # استودیوی موسیقی
├── privacy.html            # سیاست حریم خصوصی
├── css/style.css           # استایل‌های استودیو
├── js/                     # ماژول‌های استودیو و وابستگی‌های محلی
├── img/                    # تصویرهای اصلی و قابلیت‌ها
├── assets/                 # تصویر شبکه‌های اجتماعی و فونت‌های محلی
├── icons/                  # آیکون‌های سایت و افزونه
├── manifest.json           # مانیفست افزونهٔ مرورگر
├── background.js           # سرویس‌ورکر افزونه
├── docker-compose.yml      # تنظیمات وب‌سرور محلی
├── Dockerfile              # image ایستای Nginx
├── nginx.conf              # پیکربندی سایت در Nginx
├── sitemap.xml             # نقشهٔ صفحه‌ها و نسخه‌های زبانی
└── LICENSE                 # مجوز GNU GPL نسخهٔ ۳ یا بالاتر
```

صفحه‌های عمومی با HTML و CSS داخلی ارائه می‌شوند. کد JavaScript استودیو برای مدیریت وضعیت، رسم، تعامل، صدا، تئوری موسیقی، MIDI، تاریخچه و خروجی به ماژول‌های جدا تقسیم شده است.

## توسعه و مشارکت

برای تغییر محتوا، فایل HTML مربوط به همان صفحه را ویرایش کنید. استایل صفحه‌های اصلی در بلوک `<style>` خودشان قرار دارد؛ استایل استودیو در `css/style.css` و رفتار برنامه در `js/` است.

هنگام تغییر صفحه‌های عمومی، متن و متادیتای هر زبان را هماهنگ نگه دارید، مسیر تصویرها را بررسی کنید و اگر نشانی عمومی یا تاریخ آخرین تغییر آن عوض شد، `sitemap.xml` را نیز به‌روز کنید. ادعاهای محصول باید با قابلیت‌های قابل‌مشاهده و مجوز پروژه سازگار باشند.

گزارش مشکل و درخواست ادغام پذیرفته می‌شود. برای تغییرات بزرگ بهتر است ابتدا مسئله‌ای ثبت کنید تا هدف تغییر روشن شود. فایل‌های محیط محلی، اطلاعات دسترسی و خروجی‌های پروژه را commit نکنید.

## مجوز

شنوبین نرم‌افزار آزاد است و تحت **مجوز عمومی همگانی گنو، نسخهٔ ۳ یا بنا به انتخاب شما هر نسخهٔ جدیدتر** منتشر می‌شود. متن مجوز و شرایط بازتوزیع در فایل [LICENSE](LICENSE) قرار دارد.

برای پرسش دربارهٔ مجوز تجاری با [سروش زنده‌دل](mailto:Soroush_Zendedel@Live.com) تماس بگیرید. تا زمانی که مجوز جداگانه‌ای توافق نشده باشد، شرایط فایل `LICENSE` برقرار است.
