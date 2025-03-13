# /bin/sh

mkcert garden.local '*.garden.local'

kubectl create ns $1 \
    --dry-run=client \
    -o yaml |
    kubectl apply -f -

kubectl create secret tls localcert-tls-secret \
    --key garden.local+1-key.pem \
    --cert garden.local+1.pem \
    --save-config \
    --dry-run=client \
    --namespace=$1 \
    -o yaml |
    kubectl apply -f -
