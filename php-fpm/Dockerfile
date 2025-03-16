# ./php-fpm/Dockerfile
FROM php:8.3-fpm
WORKDIR /var/www/html

# 必要なパッケージ（PHP用）のインストール
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev unzip git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo_mysql gd

# アプリコードはボリュームマウントにより提供するため、COPYは行いません
# COPY . /var/www/html

# php-fpm はデフォルトでポート 9000 で待ち受けます
EXPOSE 9000
CMD ["php-fpm"]

