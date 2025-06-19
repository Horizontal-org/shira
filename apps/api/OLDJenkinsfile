pipeline {
    agent any

    stages {
      stage('Deploy production') {
          when {
            branch 'main'  
          }
          steps {

            echo 'Do nothing..'
            // script {
            //   sh '''            
            //     ssh -o StrictHostKeyChecking=no root@shira.app "cd /home/shira-production/shira-api ; git pull"
            //   '''
            // }

            // script {
            //   sh '''            
            //     ssh -o StrictHostKeyChecking=no root@shira.app "cd /home/shira-production/shira-api ; docker compose build prod ; docker compose up -d prod"
            //   '''
            // }

            // script {
            //   sh '''            
            //     ssh -o StrictHostKeyChecking=no root@shira.app "cd /home/shira-production/shira-api ; docker compose exec -it prod npm run typeorm migration:run"
            //   '''
            // }

            // script {
            //   sh '''            
            //     ssh -o StrictHostKeyChecking=no root@shira.app "cd /home/shira-production/shira-api ; docker image prune -a -f "
            //   '''
            // }
          }
      }

      stage('Deploy staging') {
          when {
            branch 'development'  
          }
          steps {
            script {
              sh '''            
                ssh -o StrictHostKeyChecking=no root@beta.shira.app "cd /home/shira-staging/shira-api ; git pull"
              '''
            }

            script {
              sh '''            
                ssh -o StrictHostKeyChecking=no root@beta.shira.app "cd /home/shira-staging/shira-api ; docker-compose -f docker-compose.app.yml build staging ; docker-compose -f docker-compose.app.yml up -d staging"
              '''
            }

            script {
              sh '''            
                ssh -o StrictHostKeyChecking=no root@beta.shira.app "cd /home/shira-staging/shira-api ; docker-compose -f docker-compose.app.yml exec -T staging npm run typeorm migration:run -- -d ./src/utils/datasources/mysql.datasource.ts"
              '''
            }

            script {
              sh '''            
                ssh -o StrictHostKeyChecking=no root@beta.shira.app "cd /home/shira-staging/shira-api ; docker image prune -a -f"
              '''
            }
          }
      }
    }
}