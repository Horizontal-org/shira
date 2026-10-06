#!/bin/bash
set -e

npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts

if test "$1" = ""; then
  node dist/main
else
  exec "$@"
fi
