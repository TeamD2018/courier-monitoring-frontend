#!/usr/bin/env bash
VERSION=$1

echo "Installing kubectl..."
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

export KUBECONFIG=./kubernetes/config

echo "Deploying..."
kubectl set image deployment frontend frontend=teamd2018/courier-monitoring-frontend:$VERSION
