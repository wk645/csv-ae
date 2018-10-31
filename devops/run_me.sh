#!/bin/bash

# Assumes that you have successfully used 'docker login' with our
# Docker Hub account for 'convenedev'

IMG=`pwd`
TAG=$1
if [ -z ${TAG} ]; then
    read -p "tag: (latest) " response
    TAG=${response:-latest}
fi

docker run --rm \
   -p 8081:8081 \
   -it convenedev/${IMG##*/}:${TAG}
