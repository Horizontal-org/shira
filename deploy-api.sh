#!/bin/bash

FOLDER="apps/api"

echo "Checking for changes in $FOLDER..."

# check if there are changes in the last commit
if git diff --quiet HEAD~1 -- "$FOLDER"; then
  echo "No changes detected in $FOLDER"
  exit 0
else
  echo "Changes detected in $FOLDER"
fi


echo "Starting deployment for $FOLDER..."

cd "$FOLDER" && ./deploy.sh

echo "✅ Deployment completed for $FOLDER."
