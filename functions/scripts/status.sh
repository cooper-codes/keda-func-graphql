#! /bin/bash

RESP=$(curl -s https://local.garden/functions/api/graphql\?query\=%7B__typename%7D -H "apollo-require-preflight:true" -m 5)

echo Response: $RESP

if [ -z $RESP ]; then
    echo "Failed to get response"
    exit 1
elif [ $RESP = '{"data":{"__typename":"Query"}}' ]; then
    echo "Returned correct response"
    exit 0
else
    echo "Failed to get correct response"
    exit 1
fi
