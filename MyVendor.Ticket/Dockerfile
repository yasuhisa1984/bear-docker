# MyVendor.Ticket/Dockerfile
FROM php:8.3-fpm

# 作業ディレクトリの設定
WORKDIR /var/www/html

# 必要なパッケージとPHP拡張のインストール
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    libpng-dev \
    libjpeg-dev \
    libjpeg62-turbo-dev \
    libfreetype-dev \
    unzip \
    git \
  && docker-php-ext-configure gd --with-freetype=/usr/include/freetype2 --with-jpeg \
  && docker-php-ext-install pdo_mysql gd \
  && rm -rf /var/lib/apt/lists/*
# アプリケーションコードをイメージ内にコピー
COPY . /var/www/html

# php-fpm はデフォルトでポート9000で待ち受けるので、必要に応じてEXPOSE
EXPOSE 9000

# コンテナ起動時にPHP-FPMを実行
CMD ["php-fpm"]

