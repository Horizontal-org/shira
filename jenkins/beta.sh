#!/bin/bash

echo "Running on beta"

# check node exists
node --version

# STRICT FAIL
set -e 

cd /home/shira

git fetch --all
git reset --hard origin/beta

npm install

./deploy-frontend.sh
echo "frontend done"

./deploy-api.sh
echo "api done"

echo "run migrations"
cd apps/api
docker compose -f docker-compose.api.yml exec -T staging npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts
echo "migrations done"

exit
