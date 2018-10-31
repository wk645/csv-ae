#!groovy

pipeline {
    agent any
    environment {
        NODE_ENV = "dev"
        OAUTH_CLIENTID = "wave2dashboard"
        OAUTH_CLIENTSECRET = "y5uvBfCSgxL4jk48cDycnYbKUfX7H5DatVjkTAGgstEuPsSwpEPD47DLu6GLBZVj"
    }
    stages {
        stage('Notify') {
            steps {
                slackSend channel: "#builds", message: "Build STARTED: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}", color: "warning"
                bitbucketStatusNotify(buildState: "INPROGRESS")
            }
        }
        stage('Setup') {
            steps {
                echo '*** Installing NodeJS ***'
                sh 'apt-get -y update'
                sh 'apt-get -y install curl'
                sh 'curl -sL https://deb.nodesource.com/setup_6.x | bash -'
                sh 'apt-get -y update'
                sh 'apt-get -y install build-essential nodejs'
                sh 'npm --version'
                echo '*** Installing JS Dependencies ***'
                sh 'npm install --quiet --no-progress'
                sh 'npm install eslint -g'
            }
        }
        stage('Build feature/*') {
            when {
                branch 'feature/*'
            }
            environment {
                API_HOST = "https://www.b5e.biz"
            }
            steps {
                sh 'node --version'
                sh 'npm run build'
            }
        }
        stage('Build hotfix/*') {
            when {
                branch 'hotfix/*'
            }
            environment {
                API_HOST = "https://www.b5e.biz"
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Build develop') {
            when {
                branch 'develop'
            }
            environment {
                API_HOST = "https://www.b5e.biz"
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Build release/*') {
            when {
                branch 'release/*'
            }
            environment {
                API_HOST = "https://www.b5a.biz"
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Build master') {
            when {
                branch 'master'
            }
            environment {
                API_HOST = "https://api.beco.io"
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Code Analysis') {
            steps {
                sh 'npm run lint:build'
                sh 'ls -l ./reports/lint'
            }
        }
        stage('Tests and Coverage') {
            steps {
                sh 'npm run test:build'
                sh 'ls -l ./reports'
            }

        }
        stage('Create :latest Docker') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    withCredentials([ [ $class: 'UsernamePasswordMultiBinding',
                                     credentialsId: 'becojenkinsdeployment',
                                     usernameVariable: 'USERNAME',
                                     passwordVariable: 'PASSWORD']] ) {
                       sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                       sh 'docker build -t becoinc/location_registry:latest .'
                       sh 'docker push becoinc/location_registry:latest'
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
                                     credentialsId: 'becojenkinsdeployment',
                                     usernameVariable: 'USERNAME',
                                     passwordVariable: 'PASSWORD']] ) {
                       sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                       sh 'docker build -t becoinc/location_registry:staging .'
                       sh 'docker push becoinc/location_registry:staging'
                    }
                }
            }
        }
    }
    post {
        success {
            slackSend channel: "#builds", message: "Build SUCCESSFUL: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}", color: "good"
            bitbucketStatusNotify buildState: "SUCCESSFUL"
        }
        failure {
            slackSend channel: "#builds", message: "Build FAILED: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}", color: "danger"
            bitbucketStatusNotify buildState: "FAILED"
            emailext attachLog: true, body: '${DEFAULT_CONTENT}', mimeType: '\'text/html\'', recipientProviders: [[$class: 'CulpritsRecipientProvider']], replyTo: '${DEFAULT_REPLYTO}', subject: '${DEFAULT_SUBJECT}'
        }
        unstable {
            slackSend channel: "#builds", message: "Build UNSTABLE: ${env.JOB_NAME}  Build #: ${env.BUILD_NUMBER}", color: "warning"
            bitbucketStatusNotify buildState: "FAILED"
            emailext attachLog: true, body: '${DEFAULT_CONTENT}', mimeType: '\'text/html\'', recipientProviders: [[$class: 'CulpritsRecipientProvider']], replyTo: '${DEFAULT_REPLYTO}', subject: '${DEFAULT_SUBJECT}'
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
            //sh 'zip -r location-registry-${BUILD_NUMBER}.zip dist'
            //archiveArtifacts artifacts: '${BRANCH_NAME}-${BUILD_NUMBER}.zip', fingerprint: true
        }

    }
}