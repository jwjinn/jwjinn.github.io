- **`service.name`**: 서비스 이름 (설정했던 `OTEL_SERVICE_NAME`, 예: `my-python-service`)
    
- **`service.version`**: 애플리케이션 버전 (설정 시)
    
- **`host.name`**: 파이썬이 실행 중인 호스트(Pod) 이름
    
- **`telemetry.sdk.language`**: `python`
    
- **`telemetry.sdk.version`**: 사용 중인 OTel SDK 버전
    
- **K8s Attributes** (Downward API 설정 시 자동 추가 가능):
    
    - `k8s.pod.name`, `k8s.namespace.name`, `k8s.node.name`
