#!/bin/bash
ssh -tt -o StrictHostKeyChecking=no root@alpha.space.shira.app

echo "Running on \$(hostname)"
cd /home/shira

# git fetch --all
# git reset --hard origin/development

# npm --version
# npm install

# ./deploy-frontend.sh
# echo "frontend done"

# ./deploy-api.sh

echo "api done"

exit
