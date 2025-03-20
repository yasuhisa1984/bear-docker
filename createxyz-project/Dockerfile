# ビルド用コンテナ
FROM node:18 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# 配信用コンテナ（nginx）
FROM nginx:alpine
# Cloud Run では $PORT を利用するので、任意の環境変数設定を追加
ENV PORT=8080
# ビルド済みファイルを配置
COPY --from=builder /app/out /usr/share/nginx/html
# カスタムの nginx 設定をコピー（例：nginx.conf）
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

