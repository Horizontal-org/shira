#!/bin/bash

echo "Running on alpha"

# LOAD NODE [USE THIS ONLY FOR NVM]
export NVM_DIR="/root/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use default

# STRICT FAIL
set -e 

cd /home/shira

git fetch --all
git reset --hard origin/development

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
