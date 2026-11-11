#!/bin/bash
set -e

cd `realpath $0 | xargs dirname`

git pull
docker compose -f docker-compose-cloud.yml pull
docker compose -f docker-compose-cloud.yml up -d
