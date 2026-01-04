```yaml

apiVersion: v1
kind: Service
metadata:
  name: gpu-jupyter-lb
spec:
  type: LoadBalancer    # 핵심: MetalLB에게 IP를 달라고 요청함
  selector:
    app: gpu-jupyter    # 아까 띄운 파드를 가리킴
  ports:
    - protocol: TCP
      port: 3000        # [외부] 브라우저에 입력할 포트
      targetPort: 8888  # [내부] Jupyter 원래 포트

```

