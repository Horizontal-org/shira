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
                sh '''            
                  ssh -o StrictHostKeyChecking=no root@beta.space.shira.app <<EOF
                    echo "Running on \$(hostname)"
                    cd /home/shira
                    git fetch --all
                    npm --version
                  EOF
                '''
              }
            }
        }

        stage ('Deploy for alpha') {
            when {
                branch 'development'  
            }
            steps {
              script {
                sh '''            
                  ssh -o StrictHostKeyChecking=no root@alpha.space.shira.app <<EOF
                    echo "Running on \$(hostname)"
                    cd /home/shira
                    git fetch --all
                    npm --version
                  EOF
                '''
              }
            }
        }

    }
}