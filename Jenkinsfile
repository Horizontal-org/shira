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
                
                try {
                  mattermostSend (
                    color: "#2A42EE", 
                    message: "Build STARTED FOR PRODUCTION: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                  )

                  sh 'ssh -tt -o StrictHostKeyChecking=no root@space.shira.app "/home/shira/jenkins/prod.sh"'
                
                } catch (e) {
                    currentBuild.result = "FAILURE"
                } finally {
                  if(currentBuild.result == "FAILURE") {
                    mattermostSend (
                      color: "danger", 
                      message: "Build FAILED FOR PRODUCTION: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                    )
                  } else {
                    mattermostSend (
                      color: "good", 
                      message: "Build SUCCESS FOR PRODUCTION: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                    )
                  }
                }                
              }
            }
        }
        stage ('Deploy for beta') {
            when {
                branch 'beta'  
            }
            steps {
            
              script {
                
                try {
                  mattermostSend (
                    color: "#2A42EE", 
                    message: "Build STARTED FOR BETA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                  )

                  sh 'ssh -tt -o StrictHostKeyChecking=no root@beta.space.shira.app "/home/shira/jenkins/beta.sh"'
                
                } catch (e) {
                    currentBuild.result = "FAILURE"
                } finally {
                  if(currentBuild.result == "FAILURE") {
                    mattermostSend (
                      color: "danger", 
                      message: "Build FAILED FOR BETA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                    )
                  } else {
                    mattermostSend (
                      color: "good", 
                      message: "Build SUCCESS FOR BETA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                    )
                  }
                }                
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
                  mattermostSend (
                    color: "#2A42EE", 
                    message: "Build STARTED FOR ALPHA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                  )

                  sh 'ssh -tt -o StrictHostKeyChecking=no root@alpha.space.shira.app "/home/shira/jenkins/alpha.sh"'

                } catch (e) {
                    currentBuild.result = "FAILURE"
                } finally {
                  if(currentBuild.result == "FAILURE") {
                    mattermostSend (
                      color: "danger", 
                      message: "Build FAILED FOR ALPHA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                    )
                  } else {
                    mattermostSend (
                      color: "good", 
                      message: "Build SUCCESS FOR ALPHA: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                    )
                  }
                }                
              }
            }
        }

        stage('Trigger automated tests') {
          when { branch 'development' }
          steps {
            script {
              def scmVars = checkout(scm)
              gitSha = scmVars.GIT_COMMIT

              withCredentials([
                usernamePassword(
                  credentialsId: 'jenkins-api-creds',
                  usernameVariable: 'JENKINS_USER',
                  passwordVariable: 'JENKINS_API_TOKEN'
                )
              ])
              {
                sh """
                  curl -sS -X POST \
                    -u "${JENKINS_USER}:${JENKINS_API_TOKEN}" \
                    "${env.JENKINS_URL}/job/${env.JOB_NAME}/buildWithParameters?GIT_SHA=${gitSha}"
                """
              }
            }
          }
        }

  }
}