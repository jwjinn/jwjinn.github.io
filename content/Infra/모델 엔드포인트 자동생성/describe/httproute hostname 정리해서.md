```shell

kubectl get httproute -A -o custom-columns='NAMESPACE:.metadata.namespace,NAME:.metadata.name,GATEWAY:.spec.parentRefs[0].name,HOST:.spec.hostnames[0]'
NAMESPACE    NAME                         GATEWAY               HOST
nai-admin    mineru-route                 nai-ingress-gateway   mineru-nai-admin.example.com
nai-admin    qwen-custom-route            nai-ingress-gateway   qwen-custom-nai-admin.example.com
nai-admin    qwen-instruct-route          nai-ingress-gateway   qwen-instruct-nai-admin.example.com
nai-system   nai-dataplane-httproute      nai-ingress-gateway   nai.maymust.co.kr
nai-system   nai-iam-protected-routes     nai-ingress-gateway   nai.maymust.co.kr
nai-system   nai-iam-unprotected-routes   nai-ingress-gateway   nai.maymust.co.kr
nai-system   nai-labs-httproute           nai-ingress-gateway   nai.maymust.co.kr
nai-system   nai-ui-dataplane-httproute   nai-ingress-gateway   nai.maymust.co.kr
nai-system   nai-ui-httproute             nai-ingress-gateway   nai.maymust.co.kr
nai-system   nai-v1-mgmt-httproute        nai-ingress-gateway   nai.maymust.co.kr
nai-system   nai-v4-httproute             nai-ingress-gateway   nai.maymust.co.kr
nai-system   oauth2-proxy-routes          nai-ingress-gateway   nai.maymust.co.kr

```
