echo "DEPLOY API"

echo "build docker image"

docker-compose -f docker-compose.api.yml build staging


echo "start docker image"

docker-compose -f docker-compose.api.yml up -d staging