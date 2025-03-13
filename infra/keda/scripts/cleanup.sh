# /bin/sh

RESOURCES= $(kubectl get scaledobjects.keda.sh,httpscaledobjects.http.keda.sh -A \
    -o jsonpath='{range .items[*]} {.kind}{"/"}{.metadata.name}{"\n"}{end}')

if [ ! -z $RESOURCES]; then
    echo $RESOURCES
    kubectl delete $RESOURCES
fi

for i in $(kubectl get scaledobjects -A \
    -o jsonpath='{range .items[*]} {.kind}{"/"}{.metadata.name}{"\n"}{end}'); do
    kubectl patch $i -p '{"metadata":{"finalizers":null}}' --type=merge
done

for i in $(kubectl get httpscaledobjects -A \
    -o jsonpath='{range .items[*]} {.kind}{"/"}{.metadata.name}{"\n"}{end}'); do
    kubectl patch $i -p '{"metadata":{"finalizers":null}}' --type=merge
done
