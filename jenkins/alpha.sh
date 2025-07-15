#!/bin/bash

echo "Running on alpha"

cd /home/shira

# git fetch --all
# git reset --hard origin/development

ls -la

pwd 

# npm install

# ./deploy-frontend.sh
# echo "frontend done"

# ./deploy-api.sh

# echo "api done"

docker compose -f docker-compose.api.yml exec -T stagingg npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts

# echo "run migrations" lala

# cd apps/api

# docker compose -f docker-compose.api.yml exec -T staging npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts

# echo "migrations done"

exit
