```yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: gpu-jupyter
  labels:
    app: gpu-jupyter
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gpu-jupyter
  template:
    metadata:
      labels:
        app: gpu-jupyter
    spec:
      # [중요] GPU가 있는 노드('gpu-worker' 계열)에만 뜨도록 설정
      # 제공해주신 노드 정보에 있는 라벨(nvidia.com/gpu.present=true)을 활용합니다.
      nodeSelector:
        nvidia.com/gpu.present: "true"
      
      containers:
      - name: jupyter
        # PyTorch와 CUDA 12가 포함된 이미지 사용 (호환성이 좋습니다)
        image: quay.io/jupyter/pytorch-notebook:cuda12-python-3.11
        
        # 보안 토큰 없이 접속하려면 아래 주석을 해제하세요 (테스트 용도)
        # args: ["start-notebook.py", "--IdentityProvider.token=''"]
        
        ports:
        - containerPort: 8888
        
        resources:
          limits:
            # [핵심] 여기서 GPU 1개를 요청해야 Kubernetes가 GPU를 컨테이너에 연결해줍니다.
            nvidia.com/gpu: 1 
          requests:
            cpu: "2"
            memory: "4Gi"

```

