```shell

Name:         nai-a516a081-92bc-4328-bba0-38
Namespace:    nai-admin
Labels:       model.iep.nai.nutanix.com/import.method=manual.hf-hub-direct
              model.iep.nai.nutanix.com/name=Qwen3
              model.iep.nai.nutanix.com/owner=00000000-0000-0000-0000-000000000000
Annotations:  <none>
API Version:  iep.nai.nutanix.com/v1alpha1
Kind:         Model
Metadata:
  Creation Timestamp:  2025-12-17T04:00:51Z
  Generation:          1
  Resource Version:    14968503
  UID:                 600efee8-7a4d-4fa4-be81-dda0a8f466ac
Spec:
  Model Size:     276G
  Output Format:  hf
  Provider:
    Hf:
      Repo Id:       Qwen/Qwen3-VL-235B-A22B-Instruct-FP8
      Repo Version:  
    Secret Name:     nai-1eafc79c-3d9d-4fcd-8832-db
  Storage:
    Sc:  nai-nfs-storage
Status:
  Conditions:
    Last Transition Time:  2025-12-17T04:00:52Z
    Last Update Time:      2025-12-17T04:00:52Z
    Message:               Pre-checks successful
    Reason:                PvcBound
    Status:                False
    Type:                  Pending
    Last Transition Time:  2025-12-17T06:02:22Z
    Last Update Time:      2025-12-17T06:02:22Z
    Message:               Model download failed
    Reason:                ModelProcessorDone
    Status:                False
    Type:                  Processing
    Last Transition Time:  2025-12-17T06:02:22Z
    Last Update Time:      2025-12-17T06:02:22Z
    Message:               Hugging Face Network connection Issue
    Reason:                ModelProcessorJobFailed
    Status:                True
    Type:                  Failed
Events:
  Type    Reason                   Age   From              Message
  ----    ------                   ----  ----              -------
  Normal  ModelProcessorJobFailed  4m    model-controller  Hugging Face Network connection Issue


```