🔸envファイルの内容を誤ると、mysqlのdockerと疎通できずこけます。下記は成功例
TKT_DB_HOST=mysql:3306
TKT_DB_NAME=ticket
TKT_DB_USER=root
TKT_DB_PASS=root
TKT_DB_SLAVE=''
TKT_DB_DSN="mysql:host=${TKT_DB_HOST};dbname=${TKT_DB_NAME};

