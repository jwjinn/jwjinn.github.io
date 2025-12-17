```yaml

Name:            nai-nfs-storage
IsDefaultClass:  No
Annotations:     kubectl.kubernetes.io/last-applied-configuration={"apiVersion":"storage.k8s.io/v1","kind":"StorageClass","metadata":{"annotations":{},"name":"nai-nfs-storage"},"mountOptions":["vers=4.0"],"parameters":{"nfsPath":"/nai-test","nfsServer":"nai-nfs.maymust.co.kr","storageType":"NutanixFiles"},"provisioner":"csi.nutanix.com","reclaimPolicy":"Delete","volumeBindingMode":"Immediate"}

Provisioner:           csi.nutanix.com
Parameters:            nfsPath=/nai-test,nfsServer=nai-nfs.maymust.co.kr,storageType=NutanixFiles
AllowVolumeExpansion:  <unset>
MountOptions:
  vers=4.0
ReclaimPolicy:      Delete
VolumeBindingMode:  Immediate
Events:             <none>


```
