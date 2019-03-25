#!groovy

pipeline {
    agent { label 'slave-dirbook' }
    environment {
        NODE_ENV = "development"
    }
    stages {
        stage('Notify') {
            steps {
                slackSend color: "warning", channel: "#ci-builds", message: "Build STARTED: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}"
                bitbucketStatusNotify(buildState: "INPROGRESS")
            }
        }
        stage('Setup') {
            steps {
                sh 'echo *** Initial Setup ***'
                sh 'sudo yum -y install curl'
                sh 'echo *** Curl version ***'
                sh 'curl --version'
                sh 'echo *** Installing Nodejs ***'
                sh 'curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -'
                sh 'sudo yum -y install nodejs'
                sh 'npm --version'
                sh 'node --version'
                sh 'echo *** Installing Centos Dev Tools ***'
                sh 'sudo yum -y install gcc gcc-c++ make'
                sh 'echo *** Installing JS Dependencies ***'
                sh 'sudo npm install --quiet --no-progress'
                sh 'sudo npm install eslint -g'
                sh 'ls'
                sh 'echo *** Removing Node Modules ***'
                sh 'sudo rm -rf node_modules'
                sh 'echo *** Removing Npm lock files ***'
                sh 'sudo rm -rf package-lock.json'
                sh 'echo *** Additional Setup ***'
                sh 'sudo npm install -g npm'
            }
        }
        stage('Build feature/*') {
            when {
                branch 'feature/*'
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build hotfix/*') {
            when {
                branch 'hotfix/*'
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build bugfix/*') {
            when {
                branch 'bugfix/*'
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build develop') {
            when {
                branch 'develop'
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build release/*') {
            when {
                branch 'release/*'
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build master') {
            when {
                branch 'master'
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Code Analysis') {
            steps {
               sh 'npm run lint'
               echo 'Skip for now'
            }
        }
        stage('Tests and Coverage') {
            steps {
                sh 'npm run test'
                echo 'Skip for now'
            }

        }
        stage('Create :latest Docker') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    withCredentials([ [ $class: 'UsernamePasswordMultiBinding',
                                     credentialsId: 'directbookJenkinsDeployment',
                                     usernameVariable: 'USERNAME',
                                     passwordVariable: 'PASSWORD']] ) {

                       docker.withRegistry('https://registry-1.docker.io/v2/', 'directbookJenkinsDeployment') {

                       sh 'docker login -u ${USERNAME} -p ${PASSWORD}'

                       sh 'docker build -t convenedev/boilerplate_back_end_web:latest .'
                       sh 'docker push convenedev/boilerplate_back_end_web:latest'
                       }
                    }
                }
            }
        }
        stage('Create :staging Docker') {
            when {
                branch 'release/*'
            }
            steps {
                script {
                    withCredentials([ [ $class: 'UsernamePasswordMultiBinding',
                                     credentialsId: 'directbookJenkinsDeployment',
                                     usernameVariable: 'USERNAME',
                                     passwordVariable: 'PASSWORD']] ) {

                       docker.withRegistry('https://registry-1.docker.io/v2/', 'directbookJenkinsDeployment') {
                       
                       sh 'docker login -u ${USERNAME} -p ${PASSWORD}'

                       sh 'docker build -t convenedev/boilerplate_back_end_web:release_staging .'
                       sh 'docker push convenedev/boilerplate_back_end_web:release_staging'
                       }
                    }
                }
            }
        }
        stage('Create :hotfix Docker') {
            when {
                branch 'hotfix/*'
            }
            steps {
                script {
                    withCredentials([ [ $class: 'UsernamePasswordMultiBinding',
                                     credentialsId: 'directbookJenkinsDeployment',
                                     usernameVariable: 'USERNAME',
                                     passwordVariable: 'PASSWORD']] ) {

                       docker.withRegistry('https://registry-1.docker.io/v2/', 'directbookJenkinsDeployment') {
                       
                       sh 'docker login -u ${USERNAME} -p ${PASSWORD}'

                       sh 'docker build -t convenedev/boilerplate_back_end_web:hotfix_${env.JOB_NAME}_${env.BUILD_NUMBER} -f ./server/Dockerfile .'
                       sh 'docker push convenedev/boilerplate_back_end_web:hotfix_${env.JOB_NAME}_${env.BUILD_NUMBER}'
                       }
                    }
                }
            }
        }
        stage('Deploy develop :latest to AWS Dev') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    withCredentials([ [ $class: 'AmazonWebServicesCredentialsBinding',
                                     credentialsId: 'jenkins-ecs-user']] ) {
                       
                       sh 'aws ecs update-service --cluster "nodejs-back-end-apis" --service "boilerplate-nodejs-api" --force-new-deployment'
                    }
                }
            }
        }
    }
    post {
        success {
            slackSend color: '#00FF00', channel: "#ci-builds", message: "Build SUCCESSFUL: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}"
            bitbucketStatusNotify buildState: "SUCCESSFUL"
            emailext (
                attachLog: true,
                mimeType: 'text/html',
                replyTo: '${DEFAULT_REPLYTO}',
                subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
        failure {
            slackSend color: "#FF0000", channel: "#ci-builds", message: "Build FAILED: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}"
            bitbucketStatusNotify buildState: "FAILED"
            emailext (
                attachLog: true, 
                mimeType: 'text/html', 
                replyTo: '${DEFAULT_REPLYTO}',
                subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                recipientProviders: [[$class: 'CulpritsRecipientProvider']]
            )
            script {
                mail to: 'ci-builds@convene.com',
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
            }
        }
        unstable {
            slackSend color: "#FF0000", channel: "#ci-builds", message: "Build UNSTABLE: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}"
            bitbucketStatusNotify buildState: "FAILED"
            emailext (
                attachLog: true, 
                mimeType: 'text/html', 
                replyTo: '${DEFAULT_REPLYTO}',
                subject: "UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                recipientProviders: [[$class: 'CulpritsRecipientProvider']]
            )
        }
    }
}