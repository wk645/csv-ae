#!groovy

pipeline {
    agent { label '///???///' }
    environment {
        NODE_ENV = "development"
    }
    stages {
        stage('Notify') {
            steps {
                slackSend color: "warning", channel: "#backend-boilerplate-builds", message: "Build STARTED: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}"
                bitbucketStatusNotify(buildState: "INPROGRESS")
            }
        }
        stage('Setup') {
            steps {
                sh 'echo *** Initial Setup ***'
                sh 'sudo yum -y install curl'
                sh 'echo *** Curl Version ***'
                sh 'curl --version'
                sh 'echo *** Installing NodeJS ***'
                sh 'curl -sL https://deb.nodesource.com/setup_11.x | sudo bash -'
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
                sh 'echo *** Additional Setup/Installation ***'
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
            }
        }
        stage('Tests and Coverage') {
            steps {
                sh 'npm run test'
            }

        }
        stage('Create :latest Docker') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    withCredentials([ [ $class: 'UsernamePasswordMultiBinding',
                                     credentialsId: '',
                                     usernameVariable: 'USERNAME',
                                     passwordVariable: 'PASSWORD']] ) {

                       docker.withRegistry('', '') {

                       sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                       sh 'docker build -t convenedev/boilerplate_back_end_web:latest -f ./Dockerfile .'
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
                                     credentialsId: '',
                                     usernameVariable: 'USERNAME',
                                     passwordVariable: 'PASSWORD']] ) {

                       docker.withRegistry('', '') {
                       
                       sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                       sh 'docker build -t convenedev/boilerplate_back_end_web:staging -f ./Dockerfile .'
                       sh 'docker push convenedev/boilerplate_back_end_web:staging'
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
                                     credentialsId: '',
                                     usernameVariable: 'USERNAME',
                                     passwordVariable: 'PASSWORD']] ) {

                       docker.withRegistry('', '') {
                       
                       sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                       sh 'docker build -t convenedev/boilerplate_back_end_web:hotfix_${env.JOB_NAME}_${env.BUILD_NUMBER} -f ./Dockerfile .'
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
                                     credentialsId: '']] ) {

                       docker.withRegistry('', '') {
                       
                       sh 'aws ecs update-service --cluster "nodejs-back-end-apis" --service "" --force-new-deployment'
                       }
                    }
                }
            }
        }
    }
    post {
        success {
            slackSend color: '#00FF00', channel: "#backend-boilerplate-builds", message: "Build SUCCESSFUL: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}"
            bitbucketStatusNotify buildState: "SUCCESSFUL"
            emailText (
                attachLog: true,
                mimeType: 'text/html',
                replyTo: '${DEFAULT_REPLYTO}',
                subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                recipientProviders: [[$class: '']]
            )
        }
        failure {
            slackSend color: "#FF0000", channel: "#backend-boilerplate-builds", message: "Build FAILED: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}"
            bitbucketStatusNotify buildState: "FAILED"
            emailext (
                attachLog: true, 
                mimeType: 'text/html', 
                replyTo: '${DEFAULT_REPLYTO}',
                subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                recipientProviders: [[$class: '']]
            )
            script {
                mail to: '',
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
            }
        }
        unstable {
            slackSend color: "#FF0000", channel: "#backend-boilerplate-builds", message: "Build UNSTABLE: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}"
            bitbucketStatusNotify buildState: "FAILED"
            emailext (
                attachLog: true, 
                mimeType: 'text/html', 
                replyTo: '${DEFAULT_REPLYTO}',
                subject: "UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                recipientProviders: [[$class: '']]
            )
        }
        always {
            //Unit Test
            junit allowEmptyResults: true, testResults: 'reports/**/jest*.xml'
            step([
                $class: 'CloverPublisher',
                cloverReportDir: 'reports/coverage',
                cloverReportFileName: 'clover.xml',
                healthyTarget: [methodCoverage: 70, conditionalCoverage: 70, statementCoverage: 70],
                unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
                failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
            ])
            step([
                $class: 'CheckStylePublisher',
                canComputeNew: true,
                canRunOnFailed: false,
                useStableBuildAsReference: true,
                defaultEncoding: '',
                pattern: 'reports/lint/checkstyle-results.xml',
                unstableTotalAll:'0'
            ])
        }

    }
}