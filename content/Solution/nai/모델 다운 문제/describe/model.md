```yaml

Name:         nai-96141299-40ce-465d-bd4f-cd
Namespace:    nai-admin
Labels:       model.iep.nai.nutanix.com/import.method=manual.hf-hub-direct
              model.iep.nai.nutanix.com/name=Qwen3
              model.iep.nai.nutanix.com/owner=00000000-0000-0000-0000-000000000000
Annotations:  <none>
API Version:  iep.nai.nutanix.com/v1alpha1
Kind:         Model
Metadata:
  Creation Timestamp:  2025-12-16T06:24:26Z
  Generation:          1
  Resource Version:    13895497
  UID:                 95a1c02e-5853-47e4-81e1-d0ff2df0c041
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
    Last Transition Time:  2025-12-16T06:24:26Z
    Last Update Time:      2025-12-16T06:24:26Z
    Message:               Pre-checks successful
    Reason:                PvcBound
    Status:                False
    Type:                  Pending
    Last Transition Time:  2025-12-16T06:24:26Z
    Last Update Time:      2025-12-16T06:24:26Z
    Message:               Downloading model
    Reason:                ModelProcessorJobActive
    Status:                True
    Type:                  Processing
Events:
  Type     Reason                    Age                From              Message
  ----     ------                    ----               ----              -------
  Normal   PvcCreateSuccessful       19s                model-controller  pvc create successful
  Normal   ModelProcessorJobCreated  19s                model-controller  Model processor job created
  Warning  PvcNotBound               19s (x6 over 19s)  model-controller  Waiting for storage
  Normal   PvcBound                  19s                model-controller  PreChecksSuccessful
  Normal   ModelProcessorJobActive   19s                model-controller  Model processor job active


```