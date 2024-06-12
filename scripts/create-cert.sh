# /bin/sh

mkcert local.garden '*.local.garden'

kubectl create ns $1 \
    --dry-run=client \
    -o yaml |
    kubectl apply -f -

kubectl create secret tls localcert-tls-secret \
    --key local.garden+1-key.pem \
    --cert local.garden+1.pem \
    --save-config \
    --dry-run=client \
    --namespace=$1 \
    -o yaml |
    kubectl apply -f -
