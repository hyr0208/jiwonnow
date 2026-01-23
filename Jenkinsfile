pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'jiwonnow'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:latest .'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Stop existing container
                    sh 'docker stop jiwonnow || true'
                    sh 'docker rm jiwonnow || true'
                    
                    // Run new container
                    sh '''
                        docker run -d \
                            --name jiwonnow \
                            --restart unless-stopped \
                            -p 3003:80 \
                            ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                script {
                    // Remove dangling images
                    sh 'docker image prune -f'
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ 지원나우 배포 성공! https://jiwonnow.yyyerin.co.kr'
        }
        failure {
            echo '❌ 배포 실패'
        }
    }
}
