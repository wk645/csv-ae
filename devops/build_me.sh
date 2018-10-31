#!/bin/bash

IMG=`pwd`
TAG=$1
if [ -z ${TAG} ]; then
    read -p "tag: (latest) " response
    TAG=${response:-latest}
fi

docker build -t convenedev/${IMG##*/}:${TAG} .
