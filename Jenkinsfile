pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        // stage('Deploy for production') {
        //     when {
        //         branch 'main'  
        //     }
        //     steps {
        //       script {
        //         sh '''            
        //           ssh -o StrictHostKeyChecking=no root@shira.app "cd /home/shira-production/shira-private ; git fetch --all ; git reset --hard origin/main; export PATH=/root/.nvm/versions/node/v16.20.0/bin:$PATH ; npm install ; npm run build"
        //         '''
        //       }
        //     }
        // }
        stage ('Deploy for beta') {
            when {
                branch 'main'  
            }
            steps {
              script {
                sh """#!/bin/bash
ssh -tt -o StrictHostKeyChecking=no root@beta.space.shira.app <<EOF
echo "Running on \$(hostname)"
cd /home/shira
git fetch --all
npm --version
echo "done"
exit
EOF
"""
              }
            }
        }

        stage ('Deploy for alpha') {
            when {
                branch 'development'  
            }
            steps {
              script {
                sh """#!/bin/bash
ssh -tt -o StrictHostKeyChecking=no root@alpha.space.shira.app <<EOF
echo "Running on \$(hostname)"
cd /home/shira
git fetch --all
git reset --hard origin/development
npm --version
npm install
./deploy-frontend.sh
echo "frontend done"
./deploy-api.sh
echo "api done"
cd apps/api
docker compose -f docker-compose.api.yml exec -T staging npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts 
echo "done"
exit
EOF
"""
              }
            }
        }

    }
}