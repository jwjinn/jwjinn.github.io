### 3. 왜 KServe는 Traefik 대신 무거운 Istio를 쓸까?

질문하신 것처럼 라우팅만 할 거면 Traefik으로도 충분합니다. 그런데 왜 KServe 튜토리얼들은 대부분 Istio를 깔라고 할까요?

1. **Knative의 단짝:** KServe는 내부적으로 'Knative'라는 기술을 쓰는데, Knative가 처음 만들어질 때 Istio랑 가장 궁합이 잘 맞게 설계되었습니다.
    
2. **고급 기능 필요:**
    
    - **암호화:** 파드랑 파드 사이에도 암호화(mTLS)를 걸고 싶을 때.
        
    - **정밀한 제어:** "요청이 너무 많으면 5초간 차단해" 같은 서킷 브레이커 기능 등.
        

### 4. 요약

> **"지금 단계에서 `Host` 헤더를 보고 길을 찾아주는 역할만 생각하신다면, Traefik과 Istio를 같다고 생각하셔도 전혀 문제없습니다."**

- 만약 기존에 Traefik을 잘 쓰고 계셨다면, **"Istio Ingress Gateway는 Traefik이랑 똑같은 앤데, Istio라는 거대한 시스템의 일부로서 동작하는구나"**라고 이해하시면 정확합니다.
    
- 심지어 KServe를 설정할 때 Istio 대신 Traefik이나 Contour를 쓰도록 바꿀 수도 있습니다. (하지만 정신 건강을 위해 처음엔 기본값인 Istio를 추천합니다.)

***
## 사이드카

- 아래 라벨이 있는 네임스페이스에서만 동작한다.
```shell

# 이 명령어가 바로 "자동 주입 활성화 스티커"를 붙이는 작업입니다. kubectl label namespace nai-admin istio-injection=enabled
```

### 결과 확인: 1개의 파드, N개의 컨테이너

이제 `kubectl get pods` 명령어를 쳤을 때 **`READY`** 컬럼을 유심히 보셔야 합니다.

- **일반 파드:** `1/1` (내꺼 1개)
    
- **Istio 적용 파드:** `2/2` (내꺼 1개 + Istio 1개)
    
- **KServe 적용 파드:** `3/3` (내꺼 1개 + KServe 1개 + Istio 1개)
    

> **KServe를 쓰시는 님께서는 아마 `3/3`을 보게 되실 겁니다.**
> 
> 1. `vLLM` (주인공)
>     
> 2. `queue-proxy` (KServe가 넣은 지배인)
>     
> 3. `istio-proxy` (Istio가 넣은 보안요원)


***

### Traefik으로 "안 간" 이유: KServe의 기본 설정 (Cluster Default)

이 부분이 더 결정적인데, **KServe 시스템 자체가 설치될 때 "기본 네트워크 관문(Ingress Gateway)"을 Istio로 쓰도록 설정**되어 있기 때문입니다.

KServe 컨트롤러는 `InferenceService`를 배포할 때 다음 과정을 거칩니다.

1. 사용자가 YAML 배포.
    
2. KServe 컨트롤러가 **"우리 클러스터의 기본 네트워크 설정이 뭐지?"** 하고 설정맵(ConfigMap)을 확인합니다.
    
3. 보통 KServe 설치 시 기본값이 **Istio**로 되어 있습니다.
    
4. 그래서 KServe는 **Istio 전용 지도(VirtualService)**를 자동으로 생성합니다.
    
5. **Traefik은 이 '지도'를 모릅니다.** Traefik용 `IngressRoute`나 `Ingress` 리소스가 생성되지 않았기 때문에, Traefik은 이 파드에 어떻게 갈지 모르는 상태입니다.