#!/bin/bash

# ----- CONFIG -----
AWS_REGION="us-east-1"
ECR_REPO="my-angular-app"
ACCOUNT_ID="061897120512"
DEPLOYMENT_NAME="angular-deployment"
CLUSTER_NAME="your-cluster-name"  # Optional if already configured with kubectl
# ------------------

# Full image URL
IMAGE="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:latest"

echo "🔐 Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

echo "🏗️ Building Docker image for linux/amd64..."
docker buildx build --platform linux/amd64 -t $IMAGE --push .

echo "🚀 Restarting deployment $DEPLOYMENT_NAME..."
kubectl rollout restart deployment $DEPLOYMENT_NAME
kubectl describe deployment $DEPLOYMENT_NAME

echo "✅ Done! Check pod status:"
kubectl get pods -l app=angular-app -o wide
