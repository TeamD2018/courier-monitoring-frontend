#!/usr/bin/env bash
SWARM_MANAGER_IP=$1
DEPLOY_USER=travis
echo "Deploying to $SERVER_IP"

echo "Setting up ssh..."
eval "$(ssh-agent -s)"
ssh-keyscan -p 228 -H $SWARM_MANAGER_IP >> ~/.ssh/known_hosts
chmod 600 travis_key
ssh-add travis_key

echo "Uploading..."
scp -P 228 -r docker-compose.yml $DEPLOY_USER@$SWARM_MANAGER_IP:/tmp/

echo "Pushing stack to swarm..."
ssh -p 228 $DEPLOY_USER@$SWARM_MANAGER_IP "docker stack deploy --compose-file /tmp/docker-compose.yml geo-rest-stuff"
