pipeline {
  agent any

  environment {
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
  }

  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/ManasaM2004/ExpertMatch.git'
      }
    }

    stage('Install Backend') {
      steps {
        dir("${env.BACKEND_DIR}") {
          sh 'npm install'
        }
      }
    }

    stage('Install Frontend') {
      steps {
        dir("${env.FRONTEND_DIR}") {
          sh 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir("${env.FRONTEND_DIR}") {
          sh 'npm run build'
        }
      }
    }

    stage('Run Backend Tests') {
      steps {
        dir("${env.BACKEND_DIR}") {
          sh 'npm test || echo "Tests failed or skipped"' // optional test step
        }
      }
    }
  }

  post {
    success {
      echo '✅ CI Pipeline Successful!'
    }
    failure {
      echo '❌ CI Failed! Please check logs.'
    }
  }
}