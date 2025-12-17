# 마운트하는 법 참고
[[showmount -e 를 통해서 나온 디렉토리 실제로 확인하는 법]]

***

## PVC 확인

- POD에서
```yaml

Volumes:                                                                                                                                                                                                   │
│   model-store-volume:                                                                                                                                                                                      │
│     Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)                                                                                                       │
│     ClaimName:  nai-a516a081-92bc-4328-bba0-38-pvc-claim                                                                                                                                                   │
│     ReadOnly:   false                  

```

> nai-a516a081-92bc-4328-bba0-38-pvc-claim 

- PVC에서 직접 경로 확인
```yaml

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  annotations:
    pv.kubernetes.io/bind-completed: "yes"
    pv.kubernetes.io/bound-by-controller: "yes"
    volume.beta.kubernetes.io/storage-provisioner: csi.nutanix.com
    volume.kubernetes.io/storage-provisioner: csi.nutanix.com
  creationTimestamp: "2025-12-17T04:00:51Z"
  finalizers:
  - kubernetes.io/pvc-protection
  name: nai-a516a081-92bc-4328-bba0-38-pvc-claim
  namespace: nai-admin
  ownerReferences:
  - apiVersion: iep.nai.nutanix.com/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: Model
    name: nai-a516a081-92bc-4328-bba0-38
    uid: 600efee8-7a4d-4fa4-be81-dda0a8f466ac
  resourceVersion: "14876566"
  uid: d4eec2d4-8c06-4a3b-b1b1-5d73a90ae19a
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 276G
  storageClassName: nai-nfs-storage
  volumeMode: Filesystem
  volumeName: pvc-d4eec2d4-8c06-4a3b-b1b1-5d73a90ae19a
status:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 258Gi
  phase: Bound

```

> volumeName: pvc-d4eec2d4-8c06-4a3b-b1b1-5d73a90ae19a


***
## NFS 접속

- ls 명령보다는 df 명령이 더 잘 먹힘. 캐싱
```shell

df -h /tmp/nfs_check/nai-test/pvc-d4eec2d4-8c06-4a3b-b1b1-5d73a90ae19a
Filesystem                 Size  Used Avail Use% Mounted on
192.168.120.52:/#nai-test  2.0T  177G  1.8T   9% /tmp/nfs_check/nai-test


```

