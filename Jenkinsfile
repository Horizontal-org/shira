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
                
                try {
                  // mattermostSend (
                  //   color: "#2A42EE", 
                  //   message: "Build STARTED FOR ALPHA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                  // )

                  echo 'Test concurrency 1'

                  sh 'ssh -tt -o StrictHostKeyChecking=no root@alpha.space.shira.app "/home/shira/jenkins/alpha.sh"'

                  echo 'Test concurrency 2'

                } catch (e) {
                    currentBuild.result = "FAILURE"
                } finally {
                  if(currentBuild.result == "FAILURE") {
                    // mattermostSend (
                    //   color: "danger", 
                    //   message: "Build FAILED FOR ALPHA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                    // )
                  } else {
                    // mattermostSend (
                    //   color: "good", 
                    //   message: "Build SUCCESS FOR ALPHA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                    // )
                  }
                }                
              }
            }
        }

    }
}