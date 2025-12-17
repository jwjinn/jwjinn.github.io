```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  annotations:
    pv.kubernetes.io/bind-completed: "yes"
    pv.kubernetes.io/bound-by-controller: "yes"
    volume.beta.kubernetes.io/storage-provisioner: csi.nutanix.com
    volume.kubernetes.io/storage-provisioner: csi.nutanix.com
  creationTimestamp: "2025-12-16T02:35:09Z"
  deletionGracePeriodSeconds: 0
  deletionTimestamp: "2025-12-16T05:16:02Z"
  finalizers:
  name: nai-298962c8-9456-4b2c-8dd1-3f-pvc-claim
  namespace: nai-admin
  ownerReferences:
  - apiVersion: iep.nai.nutanix.com/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: Model
    name: nai-298962c8-9456-4b2c-8dd1-3f
    uid: 8948a81e-7b0d-4283-b794-ac120c50b5c2
  resourceVersion: "13843820"
  uid: b83d2149-c406-4aea-89fa-d4a2cfe95776
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 276G
  storageClassName: nai-nfs-storage
  volumeMode: Filesystem
  volumeName: pvc-b83d2149-c406-4aea-89fa-d4a2cfe95776
status:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 258Gi
  phase: Bound
```
