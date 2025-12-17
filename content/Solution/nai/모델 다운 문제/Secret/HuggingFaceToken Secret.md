```shell
kubectl get secret -n nai-admin
NAME                             TYPE                             DATA   AGE
nai-1eafc79c-3d9d-4fcd-8832-db   Opaque                           1      20h
nai-db-creds                     Opaque                           6      21h
nai-iep-secret                   kubernetes.io/dockerconfigjson   1      21h
ubuntu@ubuntu-jumphost:~$ kubectl describe secret nai-1eafc79c-3d9d-4fcd-8832-db -n nai-admin
Name:         nai-1eafc79c-3d9d-4fcd-8832-db
Namespace:    nai-admin
Labels:       credential.iep.nai.nutanix.com/name=jwj
              credential.iep.nai.nutanix.com/owner=00000000-0000-0000-0000-000000000000
              credential.iep.nai.nutanix.com/secretType=hf
Annotations:  <none>

Type:  Opaque

Data
====
HF_TOKEN:  37 bytes

```
