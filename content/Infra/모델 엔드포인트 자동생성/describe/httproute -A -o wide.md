```shell
kubectl get httproute -A -o wide
NAMESPACE    NAME                         HOSTNAMES                                 AGE
nai-admin    mineru-route                 ["mineru-nai-admin.example.com"]          4d18h
nai-admin    qwen-custom-route            ["qwen-custom-nai-admin.example.com"]     11d
nai-admin    qwen-instruct-route          ["qwen-instruct-nai-admin.example.com"]   4d18h
nai-system   nai-dataplane-httproute      ["nai.maymust.co.kr"]                     22d
nai-system   nai-iam-protected-routes     ["nai.maymust.co.kr"]                     22d
nai-system   nai-iam-unprotected-routes   ["nai.maymust.co.kr"]                     22d
nai-system   nai-labs-httproute           ["nai.maymust.co.kr"]                     22d
nai-system   nai-ui-dataplane-httproute   ["nai.maymust.co.kr"]                     22d
nai-system   nai-ui-httproute             ["nai.maymust.co.kr"]                     22d
nai-system   nai-v1-mgmt-httproute        ["nai.maymust.co.kr"]                     22d
nai-system   nai-v4-httproute             ["nai.maymust.co.kr"]                     22d
nai-system   oauth2-proxy-routes          ["nai.maymust.co.kr"]                     22d
```

