#!/bin/bash
set -e

git pull
docker compose -f docker-compose-cloud.yml pull
docker compose -f docker-compose-cloud.yml up -d
