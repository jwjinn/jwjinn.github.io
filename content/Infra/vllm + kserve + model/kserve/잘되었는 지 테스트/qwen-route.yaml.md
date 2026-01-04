```yaml

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
