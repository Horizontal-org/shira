#!/bin/bash

echo "Checking for changes in frontend folders..."

# check if there are changes in the last commit
if [git diff --quiet HEAD~1 -- "apps/public"] && [git diff --quiet HEAD~1 -- "apps/spaces"]; then
  echo "No changes detected"
  exit 0
else
  echo "Changes detected -> deploying..."
fi

# build both apps 
turbo build