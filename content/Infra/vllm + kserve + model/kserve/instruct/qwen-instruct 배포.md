```shell

apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: qwen-instruct
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

      # [긴급 수정] 자원 할당량을 늘려줍니다
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
          claimName: nai-71b62a83-f915-44e8-9b35-56-pvc-claim



```
