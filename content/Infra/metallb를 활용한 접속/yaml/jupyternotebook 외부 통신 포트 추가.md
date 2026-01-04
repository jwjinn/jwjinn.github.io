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
      # [1] sudo 권한을 활성화하기 위해 root 유저로 시작 설정
      securityContext:
        runAsUser: 0

      nodeSelector:
        nvidia.com/gpu.present: "true"

      containers:
      - name: jupyter
        image: quay.io/jupyter/pytorch-notebook:cuda12-python-3.11

        # [1] GRANT_SUDO 환경 변수를 'yes'로 설정하여 jovyan에게 sudo 권한 부여
        env:
        - name: GRANT_SUDO
          value: "yes"
        # 필요 시 노트북 시작 옵션 추가 (예: 토큰 비활성화)
        # args: ["start-notebook.py", "--IdentityProvider.token=''"]

        ports:
        - containerPort: 8888
          name: jupyter
        # [2] 컨테이너 내부에서 개방할 추가 포트 정의
        - containerPort: 8185
          name: port-8185
        - containerPort: 8186
          name: port-8186
        - containerPort: 8187
          name: port-8187

        resources:
          limits:
            nvidia.com/gpu: 1
          requests:
            cpu: "5"
            memory: "30Gi"


```


