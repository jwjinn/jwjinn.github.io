```yaml

Name:         nai-9a3f62cf-6858-4432-b183-54
Namespace:    nai-admin
Labels:       model.iep.nai.nutanix.com/import.method=manual.hf-hub-direct
              model.iep.nai.nutanix.com/name=VibeVoice-Realtime-0.5B
              model.iep.nai.nutanix.com/owner=00000000-0000-0000-0000-000000000000
Annotations:  <none>
API Version:  iep.nai.nutanix.com/v1alpha1
Kind:         Model
Metadata:
  Creation Timestamp:  2025-12-16T08:22:35Z
  Generation:          1
  Resource Version:    13985569
  UID:                 8e6922ae-200d-45b3-9ecf-831bfa34de7c
Spec:
  Model Size:     12G
  Output Format:  hf
  Provider:
    Hf:
      Repo Id:       microsoft/VibeVoice-Realtime-0.5B
      Repo Version:  
    Secret Name:     nai-1eafc79c-3d9d-4fcd-8832-db
  Storage:
    Sc:  nai-nfs-storage
Status:
  Conditions:
    Last Transition Time:  2025-12-16T08:22:35Z
    Last Update Time:      2025-12-16T08:22:35Z
    Message:               Pre-checks successful
    Reason:                PvcBound
    Status:                False
    Type:                  Pending
    Last Transition Time:  2025-12-16T08:23:21Z
    Last Update Time:      2025-12-16T08:23:21Z
    Message:               Model download complete
    Reason:                ModelProcessorDone
    Status:                False
    Type:                  Processing
    Last Transition Time:  2025-12-16T08:23:21Z
    Last Update Time:      2025-12-16T08:23:21Z
    Message:               Model download complete
    Reason:                ModelProcessorJobComplete
    Status:                True
    Type:                  Active
  URL:                     pvc://nai-9a3f62cf-6858-4432-b183-54-pvc-claim/model-files
Events:
  Type     Reason                     Age                    From              Message
  ----     ------                     ----                   ----              -------
  Normal   PvcCreateSuccessful        6m53s                  model-controller  pvc create successful
  Normal   ModelProcessorJobCreated   6m53s                  model-controller  Model processor job created
  Warning  PvcNotBound                6m53s (x5 over 6m53s)  model-controller  Waiting for storage
  Normal   PvcBound                   6m53s                  model-controller  PreChecksSuccessful
  Normal   ModelProcessorJobActive    6m53s                  model-controller  Model processor job active
  Normal   ModelProcessorJobComplete  6m7s                   model-controller  Model processor job complete


```