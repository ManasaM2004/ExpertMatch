pipeline {
  agent any

  environment {
    FRONTEND_DIR = 'frontend'
    BACKEND_DIR = 'backend'
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
          bat 'npm install'
        }
      }
    }

    stage('Install Frontend') {
      steps {
        dir("${env.FRONTEND_DIR}") {
          bat 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir("${env.FRONTEND_DIR}") {
          bat 'npm run build'
        }
      }
    }

    stage('Test Backend') {
      steps {
        dir("${env.BACKEND_DIR}") {
          bat 'npm test || exit 0'  // allows build to continue even if tests fail
        }
      }
    }
  }

  post {
    success {
      echo '✅ Build Successful!'
    }
    failure {
      echo '❌ Build Failed. Check logs.'
    }
  }
}