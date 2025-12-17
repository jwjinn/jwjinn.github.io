```yaml

Name:          nai-9a3f62cf-6858-4432-b183-54-pvc-claim
Namespace:     nai-admin
StorageClass:  nai-nfs-storage
Status:        Bound
Volume:        pvc-ea039a68-99e3-4239-ac80-c50ddb73c892
Labels:        <none>
Annotations:   pv.kubernetes.io/bind-completed: yes
               pv.kubernetes.io/bound-by-controller: yes
               volume.beta.kubernetes.io/storage-provisioner: csi.nutanix.com
               volume.kubernetes.io/storage-provisioner: csi.nutanix.com
Finalizers:    [kubernetes.io/pvc-protection]
Capacity:      12Gi
Access Modes:  RWX
VolumeMode:    Filesystem
Used By:       <none>
Events:
  Type    Reason                 Age    From                                                                                 Message
  ----    ------                 ----   ----                                                                                 -------
  Normal  Provisioning           8m52s  csi.nutanix.com_nai-gpu-md-0-vcl6p-c9cd7-8rvzn_724d8f61-b341-43aa-80dd-4a2a1768963d  External provisioner is provisioning volume for claim "nai-admin/nai-9a3f62cf-6858-4432-b183-54-pvc-claim"
  Normal  ExternalProvisioning   8m52s  persistentvolume-controller                                                          Waiting for a volume to be created either by the external provisioner 'csi.nutanix.com' or manually by the system administrator. If volume creation is delayed, please verify that the provisioner is running and correctly registered.
  Normal  ProvisioningSucceeded  8m52s  csi.nutanix.com_nai-gpu-md-0-vcl6p-c9cd7-8rvzn_724d8f61-b341-43aa-80dd-4a2a1768963d  Successfully provisioned volume pvc-ea039a68-99e3-4239-ac80-c50ddb73c892


```

