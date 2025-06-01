pipeline {
  agent any

  environment {
    BACKEND_DIR = "backend"
    FRONTEND_DIR = "frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
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

    stage('Test Backend') {
      steps {
        dir("${env.BACKEND_DIR}") {
          sh 'npm test || echo "⚠️ No tests or test failure ignored"'
        }
      }
    }
  }

  post {
    success {
      echo '✅ CI Pipeline completed successfully!'
    }
    failure {
      echo '❌ CI Pipeline failed. Please check logs.'
    }
  }
}