```yaml

apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: qwen-custom
  namespace: nai-admin
spec:
  predictor:
    containers:
    - name: kserve-container
      image: docker.io/vllm/vllm-openai:latest
      command: ["python3", "-m", "vllm.entrypoints.openai.api_server"]
      args:
        - "--model=/mnt/models/model-files"
        - "--served-model-name=qwen-custom"
        - "--trust-remote-code"
        - "--dtype=bfloat16"
        - "--gpu-memory-utilization=0.9"
        - "--max-model-len=8192"
        - "--port=8080"

      resources:
        limits:
          nvidia.com/gpu: 1
          memory: "32Gi"
          cpu: "8"
        requests:
          nvidia.com/gpu: 1
          memory: "16Gi"
          cpu: "4"

      volumeMounts:
        - name: model-volume
          mountPath: /mnt/models
          readOnly: true
    volumes:
      - name: model-volume
        persistentVolumeClaim:
          claimName: nai-de85c8d8-2656-4676-bebe-b6-pvc-claim


```


***
## 중요:
/mnt/models/model-files/config.json

모델의 config.json 파일의 위치를 미리 파악해야 한다.


## 라우팅

```shell
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: qwen-custom-route
  namespace: nai-admin
spec:
  parentRefs:
  - name: nai-ingress-gateway
    namespace: nai-system
  hostnames:
  - "qwen-custom-nai-admin.example.com"
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: qwen-custom-predictor
      port: 80

```

