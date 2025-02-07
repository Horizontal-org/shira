pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        stage('Deploy for production') {
            when {
                branch 'main'  
            }
            steps {
              script {
                sh '''            
                  ssh -o StrictHostKeyChecking=no root@shira.app "cd /home/shira-production/shira-public ; git fetch --all ; git reset --hard origin/main ; export PATH=/root/.nvm/versions/node/v16.20.0/bin:$PATH ; npm install ; npm run build"
                '''
              }
            }
        }
        stage ('Deploy for staging') {
            when {
                branch 'development'  
            }
            steps {
              script {
                sh '''            
                  ssh -o StrictHostKeyChecking=no root@beta.shira.app "cd /home/shira-staging/shira-public ; git fetch --all ; git reset --hard origin/development ; export PATH=/root/.nvm/versions/node/v16.17.1/bin:$PATH ; npm install ; npm run build"
                '''
              }
            }
        }

    }
}