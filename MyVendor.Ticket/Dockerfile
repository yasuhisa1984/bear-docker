FROM php:8.3-fpm

# 必要なパッケージをインストール（Nginx 追加）
RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd

WORKDIR /var/www/html

COPY . /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["php-fpm"]

