🔸envファイルの内容を誤ると、mysqlのdockerと疎通できずこけます。下記は成功例
TKT_DB_HOST=mysql:3306
TKT_DB_NAME=ticket
TKT_DB_USER=root
TKT_DB_PASS=root
TKT_DB_SLAVE=''
TKT_DB_DSN="mysql:host=${TKT_DB_HOST};dbname=${TKT_DB_NAME};



┌────────────────────────────┐
│       Client Browser       │
│  (例: http://localhost)    │
└─────────────┬──────────────┘
              │
              │
              ▼
┌────────────────────────────┐
│  Frontend Container        │
│ (createxyz-project, port 3000)│
│  - 静的コンテンツ提供        │
└─────────────┬──────────────┘
              │
              │  /api/shops リクエスト (Next.js rewrites)
              ▼
┌────────────────────────────┐
│     API Container          │
│    (nginx, port 8080)        │
│  - 受け取ったリクエストを   │
│    PHP-FPM へ転送 (FastCGI)  │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│      PHP-FPM Container     │
│         (php-fpm)          │
│ - PHP コード実行 (API処理)  │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│    MySQL Container         │
│      (mysql:8.2)           │
│  - データベース処理         │
└────────────────────────────┘
