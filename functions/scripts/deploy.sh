#! /bin/bash

# echo image: $1

func kubernetes deploy \
    --name functions \
    --service-type ClusterIP \
    --namespace ingress-nginx \
    --image-name $1

# --registry "$S4_REGISTRY_URL"
