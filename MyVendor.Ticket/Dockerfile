# MyVendor.Ticket/Dockerfile
FROM php:8.3-fpm

# 作業ディレクトリの設定
WORKDIR /var/www/html

# 必要なパッケージとPHP拡張のインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    unzip \
    git \
 && docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install pdo_mysql gd

# アプリケーションコードをイメージ内にコピー
COPY . /var/www/html

# php-fpm はデフォルトでポート9000で待ち受けるので、必要に応じてEXPOSE
EXPOSE 9000

# コンテナ起動時にPHP-FPMを実行
CMD ["php-fpm"]

