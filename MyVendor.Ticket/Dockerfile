FROM php:8.3-fpm

# 必要なパッケージをインストール（Nginx 追加 + bash-completion + Vim）
RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    unzip \
    git \
    vim \
    bash-completion \
    supervisor \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd

# 作業ディレクトリ
WORKDIR /var/www/html

# プロジェクトファイルをコピー
COPY . /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Bash の補完を有効化
RUN echo "source /usr/share/bash-completion/bash_completion" >> ~/.bashrc

# Supervisor を使って Nginx と PHP-FPM を同時に起動
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

