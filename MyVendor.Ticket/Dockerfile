FROM php:8.3-fpm

WORKDIR /var/www/html

# 必要なパッケージをインストール + Composer のインストール
RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    unzip \
    git \
    curl \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install pdo_mysql gd \
  && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# ソースコード・設定ファイルのコピー
COPY . /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf

# Composer の依存パッケージをインストール（スクリプト実行を抑制）
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 必要なディレクトリを作成し、書き込み権限を付与する
RUN mkdir -p /var/www/html/var/tmp/hal-api-app \
    && mkdir -p /var/www/html/var/log/hal-api-app \
    && chown -R www-data:www-data /var/www/html/var \
    && chmod -R 777 /var/www/html/var

# ポートを公開する
EXPOSE 8080 9000

# PHP-FPM と Nginx を起動するコマンド
CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]

