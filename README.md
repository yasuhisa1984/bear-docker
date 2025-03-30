# プロジェクト概要

このプロジェクトは、フロントエンドコンテナ、APIコンテナ、PHP-FPMコンテナ、およびMySQLコンテナを使用したマルチコンテナ構成です。各コンテナはDocker Composeで管理され、疎通を確保するために正しい`.env`設定が必要です。

## `.env` ファイル設定例

`.env` ファイルの内容を誤ると、MySQL コンテナと疎通できずエラーが発生します。以下は成功例です：

```env

TKT_DB_HOST=mysql:3306
TKT_DB_NAME=ticket
TKT_DB_USER=root
TKT_DB_PASS=root
TKT_DB_SLAVE=''
TKT_DB_DSN="mysql:host=${TKT_DB_HOST};dbname=${TKT_DB_NAME};"

```


## システム構成図


```
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
```



## 注意点

- 環境変数 `.env` の設定を正しく行わないと MySQL コンテナと疎通ができずにエラーとなります。
- 各コンテナの通信は Docker Compose によって自動的に設定されますが、名前解決 (`mysql`) が正しく指定されているか確認してください。



