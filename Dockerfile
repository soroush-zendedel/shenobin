FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html about.html app.html privacy.html sitemap.xml site.webmanifest manifest.json config.js background.js favicon.ico /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY css/ /usr/share/nginx/html/css/
COPY fa/ /usr/share/nginx/html/fa/
COPY icons/ /usr/share/nginx/html/icons/
COPY img/ /usr/share/nginx/html/img/
COPY js/ /usr/share/nginx/html/js/
