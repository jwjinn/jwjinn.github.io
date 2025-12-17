
- 기존 성공한 VibeVoice-Realtime-0.5B 기존 파일 edit

```shell

apiVersion: iep.nai.nutanix.com/v1alpha1
kind: Model
metadata:
  creationTimestamp: "2025-12-16T08:32:42Z"
  generation: 1
  labels:
    model.iep.nai.nutanix.com/import.method: manual.hf-hub-direct
    model.iep.nai.nutanix.com/name: VibeVoice-Realtime-0.5B
    model.iep.nai.nutanix.com/owner: 00000000-0000-0000-0000-000000000000
  name: nai-568bb4f6-4fd7-470c-bf20-53
  namespace: nai-admin
  resourceVersion: "13993330"
  uid: c7ff8c97-501e-47e5-bce6-b7dcc7684206
spec:
  modelSize: 12G
  outputFormat: hf
  provider:
    hf:
      repoId: microsoft/VibeVoice-Realtime-0.5B
      repoVersion: ""
    secretName: nai-1eafc79c-3d9d-4fcd-8832-db
  storage:
    sc: nai-nfs-storage
status:
  conditions:
  - lastTransitionTime: "2025-12-16T08:32:43Z"
    lastUpdateTime: "2025-12-16T08:32:43Z"
    message: Pre-checks successful
    reason: PvcBound
    status: "False"
    type: Pending
  - lastTransitionTime: "2025-12-16T08:33:33Z"
    lastUpdateTime: "2025-12-16T08:33:33Z"
    message: Model download complete
    reason: ModelProcessorDone
    status: "False"
    type: Processing
  - lastTransitionTime: "2025-12-16T08:33:33Z"
    lastUpdateTime: "2025-12-16T08:33:33Z"
    message: Model download complete
    reason: ModelProcessorJobComplete
    status: "True"
    type: Active
  url: pvc://nai-568bb4f6-4fd7-470c-bf20-53-pvc-claim/model-files


```


- 실패한 Model
```shell

apiVersion: iep.nai.nutanix.com/v1alpha1
kind: Model
metadata:
  creationTimestamp: "2025-12-17T04:00:51Z"
  generation: 1
  labels:
    model.iep.nai.nutanix.com/import.method: manual.hf-hub-direct
    model.iep.nai.nutanix.com/name: Qwen3
    model.iep.nai.nutanix.com/owner: 00000000-0000-0000-0000-000000000000
  name: nai-a516a081-92bc-4328-bba0-38
  namespace: nai-admin
  resourceVersion: "14968503"
  uid: 600efee8-7a4d-4fa4-be81-dda0a8f466ac
spec:
  modelSize: 276G
  outputFormat: hf
  provider:
    hf:
      repoId: Qwen/Qwen3-VL-235B-A22B-Instruct-FP8
      repoVersion: ""
    secretName: nai-1eafc79c-3d9d-4fcd-8832-db
  storage:
    sc: nai-nfs-storage
status:
  conditions:
  - lastTransitionTime: "2025-12-17T04:00:52Z"
    lastUpdateTime: "2025-12-17T04:00:52Z"
    message: Pre-checks successful
    reason: PvcBound
    status: "False"
    type: Pending
  - lastTransitionTime: "2025-12-17T06:02:22Z"
    lastUpdateTime: "2025-12-17T06:02:22Z"
    message: Model download failed
    reason: ModelProcessorDone
    status: "False"
    type: Processing
  - lastTransitionTime: "2025-12-17T06:02:22Z"
    lastUpdateTime: "2025-12-17T06:02:22Z"
    message: Hugging Face Network connection Issue
    reason: ModelProcessorJobFailed
    status: "True"
    type: Failed


```


## 테스트:
- 기존 성공한 모델을 강제로 실패하게 만들 수 있나?
![[Pasted image 20251217152440.png]]

- 명령어:
	- 성공을 실패로
```shell

kubectl patch model nai-568bb4f6-4fd7-470c-bf20-53 \
  -n nai-admin \
  --type=merge \
  --subresource=status \
  --patch '{"status":{"url": null, "conditions":[{"type":"Pending","status":"False","reason":"PvcBound","message":"Pre-checks successful","lastTransitionTime":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},{"type":"Processing","status":"False","reason":"ModelProcessorDone","message":"Model download failed","lastTransitionTime":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},{"type":"Failed","status":"True","reason":"ModelProcessorJobFailed","message":"Hugging Face Network connection Issue","lastTransitionTime":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}]}}'

```

- 그랬을 경우 edit 상태

```yaml

apiVersion: iep.nai.nutanix.com/v1alpha1
kind: Model
metadata:
  creationTimestamp: "2025-12-16T08:32:42Z"
  generation: 1
  labels:
    model.iep.nai.nutanix.com/import.method: manual.hf-hub-direct
    model.iep.nai.nutanix.com/name: VibeVoice-Realtime-0.5B
    model.iep.nai.nutanix.com/owner: 00000000-0000-0000-0000-000000000000
  name: nai-568bb4f6-4fd7-470c-bf20-53
  namespace: nai-admin
  resourceVersion: "14990456"
  uid: c7ff8c97-501e-47e5-bce6-b7dcc7684206
spec:
  modelSize: 12G
  outputFormat: hf
  provider:
    hf:
      repoId: microsoft/VibeVoice-Realtime-0.5B
      repoVersion: ""
    secretName: nai-1eafc79c-3d9d-4fcd-8832-db
  storage:
    sc: nai-nfs-storage
status:
  conditions:
  - lastTransitionTime: "2025-12-17T06:31:20Z"
    message: Pre-checks successful
    reason: PvcBound
    status: "False"
    type: Pending
  - lastTransitionTime: "2025-12-17T06:31:20Z"
    message: Model download failed
    reason: ModelProcessorDone
    status: "False"
    type: Processing
  - lastTransitionTime: "2025-12-17T06:31:20Z"
    message: Hugging Face Network connection Issue
    reason: ModelProcessorJobFailed
    status: "True"
    type: Failed


```

- 실패를 성공으로 만들기
```yaml


kubectl patch model nai-568bb4f6-4fd7-470c-bf20-53 \
  -n nai-admin \
  --type=merge \
  --subresource=status \
  --patch '{"status":{
    "url": "pvc://nai-568bb4f6-4fd7-470c-bf20-53-pvc-claim/model-files",
    "conditions":[
      {"type":"Pending","status":"False","reason":"PvcBound","message":"Pre-checks successful","lastTransitionTime":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},
      {"type":"Processing","status":"False","reason":"ModelProcessorDone","message":"Model download complete","lastTransitionTime":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},
      {"type":"Failed","status":"False","reason":"Recovered","message":"Manually recovered","lastTransitionTime":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},
      {"type":"Active","status":"True","reason":"ModelProcessorJobComplete","message":"Model download complete","lastTransitionTime":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}
    ]
  }}'

```