```shell

─────────────────────────────────────────────────────────────────────────────────── persistentvolumeclaims(nai-admin)[1] ───────────────────────────────────────────────────────────────────────────────────┐
│ NAME↑                                             STATUS               VOLUME                                            CAPACITY         ACCESS MODES          STORAGECLASS              AGE              │
│ nai-298962c8-9456-4b2c-8dd1-3f-pvc-claim          Terminating          pvc-b83d2149-c406-4aea-89fa-d4a2cfe95776          258Gi            RWX                   nai-nfs-storage           3h24m            │

```

- describe
```yaml
Name:          nai-298962c8-9456-4b2c-8dd1-3f-pvc-claim
Namespace:     nai-admin
StorageClass:  nai-nfs-storage
Status:        Terminating (lasts 44m)
Volume:        pvc-b83d2149-c406-4aea-89fa-d4a2cfe95776
Labels:        <none>
Annotations:   pv.kubernetes.io/bind-completed: yes
               pv.kubernetes.io/bound-by-controller: yes
               volume.beta.kubernetes.io/storage-provisioner: csi.nutanix.com
               volume.kubernetes.io/storage-provisioner: csi.nutanix.com
Finalizers:    [kubernetes.io/pvc-protection]
Capacity:      258Gi
Access Modes:  RWX
VolumeMode:    Filesystem
Used By:       debug-storage-check
Events:        <none>

```
