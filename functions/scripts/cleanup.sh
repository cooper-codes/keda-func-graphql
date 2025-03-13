#! /bin/bash

echo Removing function from image: $1

func kubernetes delete \
    --name functions \
    --namespace ingress-nginx \
    --service-type ClusterIP \
    --image-name $1 \
    --ignore-errors
