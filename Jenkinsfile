pipeline {
  agent any
  tools { nodejs "nodejs" }

  stages {

    stage('Deploy') {
      steps {
        script {
          def envs = [
            [
              name: 'PRODUCTION',
              branch: 'main',
              sshHost: 'root@space.shira.app',
              remoteScript: '/home/shira/jenkins/prod.sh',
              baseUrl: 'https://space.shira.app'
            ],
            [
              name: 'BETA',
              branch: 'beta',
              sshHost: 'root@beta.space.shira.app',
              remoteScript: '/home/shira/jenkins/beta.sh',
              baseUrl: 'https://beta.space.shira.app'
            ],
            [
              name: 'ALPHA',
              branch: 'development',
              sshHost: 'root@alpha.space.shira.app',
              remoteScript: '/home/shira/jenkins/alpha.sh',
              baseUrl: 'https://alpha.space.shira.app'
            ]
          ]

          envs.each { envConfig ->
            if (env.BRANCH_NAME == envConfig.branch) {

              echo "Deploying for ${envConfig.name}..."

              try {
                mattermostSend(
                  color: "#2A42EE",
                  message: "Build STARTED FOR ${envConfig.name}: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                )

                sh """
                  ssh -tt -o StrictHostKeyChecking=no ${envConfig.sshHost} "${envConfig.remoteScript}"
                """

                env.ENV_NAME = envConfig.name
                env.DEPLOY_BASE_URL = envConfig.baseUrl

              } catch (e) {
                currentBuild.result = "FAILURE"
                mattermostSend(
                  color: "danger",
                  message: "Build FAILED FOR ${envConfig.name}: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                )
                throw e
              }

              mattermostSend(
                color: "good",
                message: "Build SUCCESS FOR ${envConfig.name}: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
              )
            }
          }
        }
      }
    }

    stage('E2E tests') {
      when {
        anyOf {
          branch 'main'
          branch 'beta'
          branch 'development'
        }
      }
      steps {
        script {
          // If deploy failed, skip tests
          if (currentBuild.result && currentBuild.result != 'SUCCESS') {
            echo "Skipping E2E because deploy failed."
            return
          }

          def envs = [
            [
              name: 'PRODUCTION',
              branch: 'main',
              baseUrl: 'https://space.shira.app'
            ],
            [
              name: 'BETA',
              branch: 'beta',
              baseUrl: 'https://beta.space.shira.app'
            ],
            [
              name: 'ALPHA',
              branch: 'development',
              baseUrl: 'https://alpha.space.shira.app'
            ]
          ]

          envs.each { envConfig ->
            if (env.BRANCH_NAME == envConfig.branch) {
              def baseUrl = envConfig.baseUrl
              def envName = envConfig.name

              echo "Running E2E for ${envName} at ${baseUrl}"

              // TODO: wait for service to be up - do we have /health endpoint?

              dir('e2e-tests') {
                // Pull test repo
                git branch: 'main',
                    url: 'git@github.com:Horizontal-org/Shira-Testing.git',
                    credentialsId: 'creds' //TODO add credentials

                // Run tests pointing to env
                sh "mvn test -DbaseUrl=${baseUrl}"
              }

              // Publish reports
              junit 'e2e-tests/reports/**/*.xml' //TODO define path

              mattermostSend(
                color: "good",
                message: "✅ E2E tests passed for ${envName}"
              )
            }
          }
        }
      }
      post {
        failure {
          mattermostSend(
            color: "danger",
            message: "❌ E2E tests failed for ${env.ENV_NAME ?: env.BRANCH_NAME}"
          )
        }
      }
    }

  }
}
