
***
- 참고 링크: [https://opentelemetry.io/docs/platforms/kubernetes/getting-started/](https://opentelemetry.io/docs/platforms/kubernetes/getting-started/)

## Overview
To collect all the data, we’ll need two installations of the collector, one as a [Daemonset](https://opentelemetry.io/docs/collector/deployment/agent/) and one as a [Deployment](https://opentelemetry.io/docs/collector/deployment/gateway/). The Daemonset installation of the collector will be used to collect telemetry emitted by services, logs, and metrics for nodes, pods, and containers. The deployment installation of the collector will be used to collect metrics for the cluster and events.


## Preparation:

- 보통: Helm 차트를 활용한다.

```bash
helm repo add open-telemetry <https://open-telemetry.github.io/opentelemetry-helm-charts>
```

## Daemonset Collector:

Each instance of the collector in the daemonset will collect data only from the node on which it is running..

### 실제로 배포를 하게 되면,

```bash
$ kubectl get pods -n opentelemetry
NAME                                READY   STATUS    RESTARTS   AGE
otel-collector-agent-worker01       1/1     Running   0          5m
otel-collector-agent-worker02       1/1     Running   0          5m
```

> Collector가 가지고 있는 부품들. 코드 단위 설정들에 대해서 알게 되는 시간들이다.

- 수집하는 컴포넌트들
    - [OTLP Receiver](https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/otlpreceiver): to collect application traces, metrics and logs.
    - [Kubernetes Attributes Processor](https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#kubernetes-attributes-processor): to add Kubernetes metadata to incoming application telemetry.
    - [Kubeletstats Receiver](https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#kubeletstats-receiver): to pull node, pod, and container metrics from the API server on a kubelet.
    - [Filelog Receiver](https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#filelog-receiver): to collect Kubernetes logs and application logs written to stdout/stderr.

---

## OTLP Receiver:

The [OTLP Receiver](https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/otlpreceiver) is the best solution for collecting traces, metrics, and logs in the [OTLP format](https://opentelemetry.io/docs/specs/otel/protocol/).

> OTLP 형태로 보내는 데이터들을 수집을 하는 전용 리시버이다.

- OLTP Receiver: [https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/otlpreceiver](https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/otlpreceiver)
- OTLP format으로 전송을 하면, 전달을 받는 Receiver를 의미한다.

그래서 보통 application에서 작성을 하고, Receiver로 전송을 하는 형태로 활용이 된다.

<aside> 💡

개발자가 코드에 시간이라든가 디버깅 요소들을 OTLP SDK 형식으로 전송을 하면, 해당 정보를 수정 없이 최종 Victorial까지 가게 된다.

</aside>

This keeps network interactions simple and allows easy correlation of Kubernetes metadata using the `k8sattributes` processor.

- Daemonset 형태로 떠 있기 때문에, POD는 그냥 호스트 IP로 네트워크를 던지면 된다.
- allows easy correlation of Kubernetes metadata using the k8sattributes processor

![https://opentelemetry.io/docs/collector/architecture/](attachment:e472d6ff-410e-4181-a218-2e727f801b88:image.png)

[https://opentelemetry.io/docs/collector/architecture/](https://opentelemetry.io/docs/collector/architecture/)

보통은 어플리케이션에서 매트릭을 보낼 때는 어디에서 보내는 지에 대한 정보 없이 그냥 보내게 된다.  
해당 `k8sattributes` 가

- `k8s.pod.name`: web-server-pod
- `k8s.namespace.name`: frontend
- `k8s.node.name`: worker-node-1

위 내용을 붙이게 된다.

<aside> 💡

개발자든, Operator든 어느 파드, 어느 위치의 노드에 있는 지에 대한 걱정을 할 필요가 없다. 알아서 k8sattributes processor가 kubelet과 통신을 하여 metadata를 붙이게 된다.

</aside>

### 설정 예시:

```yaml
receivers:
  otlp:
    protocols:
      # [1] gRPC 설정 (서버 간 통신용, 기본 포트 4317)
      grpc:
        endpoint: "0.0.0.0:4317" 

      # [2] HTTP 설정 (웹/기타 통신용, 기본 포트 4318)
      http:
        endpoint: "0.0.0.0:4318"
        cors:
          allowed_origins:
            - "<http://test.com>"
```

---

## **Kubernetes Attributes Processor**

This processor automatically discovers Kubernetes pods, extracts their metadata such as pod name or node name, and adds the extracted metadata to spans, metrics, and logs as resource attributes.

> 해당 Processor가 어디에서 온 데이터 인지 metaData를 더해주게 된다.

- [https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#kubernetes-attributes-processor](https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#kubernetes-attributes-processor)

**The Kubernetes Attributes Processor is one of the most important components for a collector running in Kubernetes. Any collector receiving application data should use it.**

The Kubernetes Attributes Processor uses the Kubernetes API to discover all pods running in a cluster and keeps a record of their IP addresses, pod UIDs, and interesting metadata.

> API와 직접 통신을 해서 POD에 대한 데이터를 뽑아온다고 생각하면 된다.

### 필요 요구 사항:

1. Cluster Role을 통한 Permission

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: collector
  namespace: <OTEL_COL_NAMESPACE>
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otel-collector
rules:
  - apiGroups:
      - ''
    resources:
      - 'pods'
      - 'namespaces'
    verbs:
      - 'get'
      - 'watch'
      - 'list'
  - apiGroups:
      - 'apps'
    resources:
      - 'replicasets'
    verbs:
      - 'get'
      - 'list'
      - 'watch'
  - apiGroups:
      - 'extensions'
    resources:
      - 'replicasets'
    verbs:
      - 'get'
      - 'list'
      - 'watch'
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: otel-collector
subjects:
  - kind: ServiceAccount
    name: collector
    namespace: <OTEL_COL_NAMESPACE>
roleRef:
  kind: ClusterRole
  name: otel-collector
  apiGroup: rbac.authorization.k8s.io

```

1. 커스텀 리소스 양식(수정하기 위한)

```yaml
k8sattributes:
  auth_type: 'serviceAccount'
  extract:
    metadata: # extracted from the pod
      - k8s.namespace.name
      - k8s.pod.name
      - k8s.pod.start_time
      - k8s.pod.uid
      - k8s.deployment.name
      - k8s.node.name
    annotations:
      # Extracts the value of a pod annotation with key `annotation-one` and inserts it as a resource attribute with key `a1`
      - tag_name: a1
        key: annotation-one
        from: pod
      # Extracts the value of a namespaces annotation with key `annotation-two` with regexp and inserts it as a resource  with key `a2`
      - tag_name: a2
        key: annotation-two
        regex: field=(?P<value>.+)
        from: namespace
    labels:
      # Extracts the value of a namespaces label with key `label1` and inserts it as a resource attribute with key `l1`
      - tag_name: l1
        key: label1
        from: namespace
      # Extracts the value of a pod label with key `label2` with regexp and inserts it as a resource attribute with key `l2`
      - tag_name: l2
        key: label2
        regex: field=(?P<value>.+)
        from: pod
  pod_association: # How to associate the data to a pod (order matters)
    - sources: # First try to use the value of the resource attribute k8s.pod.ip
        - from: resource_attribute
          name: k8s.pod.ip
    - sources: # Then try to use the value of the resource attribute k8s.pod.uid
        - from: resource_attribute
          name: k8s.pod.uid
    - sources: # If neither of those work, use the request's connection to get the pod IP.
        - from: connection

```

> 매트릭을 어떻게 가공할 지에 대한 설명이다.

### 예시:

- 쿠버네티스 실제 POD 정보

```yaml
metadata:
  annotations:
    annotation-one: "beta"  # <--- 그냥 읽기만 함
```

- 보내지는 매트릭:

```yaml
{
  "trace_id": "abc12345",
  "attributes": {
    "k8s.pod.name": "my-pod",
    "a1": "beta"            # <--- 원래 없던 게 새로 생김!
  }
}
```

이런식으로 가공을 해서 전달을 하게 된다.

### 실제 예시를 들어서:

1. 기본 메타데이터들을 전송을 할거다.

```yaml
metadata:
  - k8s.namespace.name
  - k8s.pod.name
  # ... (생략)
  - k8s.node.name
```

1. 1:1 매핑을 통해서 바꾸고 싶을때

```yaml
- tag_name: a1          # 1. 텔레메트리 데이터에는 'a1'이라는 이름으로 붙여라.
  key: annotation-one   # 2. 쿠버네티스 파드에 있는 'annotation-one'이라는 주석 값을 가져와서.
  from: pod             # 3. '파드'에 붙은 주석에서 찾아라.
```

pod의 메타데이터 안에서 annotation-one 이라는 이름을 a1으로 치환해!

---

## **Kubeletstats Receiver**

The [Kubeletstats Receiver](https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#kubeletstats-receiver) is the receiver that gathers metrics about the node. It will gather metrics like container memory usage, pod cpu usage, and node network errors. we’ll be able to correlate our application traces, metrics, and logs with the metrics produced by the Kubeletstats Receiver.

> 각 노드에 있는 kubelet과 통신을 하게 된다.

- [https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#kubeletstats-receiver](https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#kubeletstats-receiver)

### 설정 방식:

1. 권한 설정

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: otel-collector
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otel-collector
rules:
  - apiGroups: ['']
    resources: ['nodes/stats']
    verbs: ['get', 'watch', 'list']
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: otel-collector
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: otel-collector
subjects:
  - kind: ServiceAccount
    name: otel-collector
    namespace: default

```

1. 통신 설정

```yaml
receivers:
  kubeletstats:
    collection_interval: 10s      # (1) 얼마나 자주 긁어올까?
    auth_type: 'serviceAccount'   # (2) 인증은 어떻게?
    endpoint: '${env:K8S_NODE_NAME}:10250' # (3) Kubelet 주소는?
    insecure_skip_verify: true    # (4) 보안 인증서 검사는?
    metric_groups:                # (5) 무엇을 가져올까?
      - node
      - pod
      - container
```

> volume 도 추가할 수 있다. 기본적으로 kubelet과 통신을 하는 것이기 때문에, daemonset을 통한 배포가 권장된다.

---

## Filelog Receiver

The [Filelog Receiver](https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#filelog-receiver) will collect logs written to stdout/stderr by tailing the logs Kubernetes writes to `/var/log/pods/*/*/*.log`.

> 기본적으로 쿠버네티스는 아래 경로들에 로그 파일을 만들고 있다.

In addition, it will extract useful Kubernetes metadata based on the file name.

- 설명:

```bash
/var/log/pods/<namespace><pod_name><pod_uid>/<container_name>/0.log
```

아래와 같은 형식으로 로그 파일을 저장을 하게 되는데, `/` 값을 기준으로 자동으로 분류해서 데이터를 전송을 합니다.

- [https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#filelog-receiver](https://opentelemetry.io/docs/platforms/kubernetes/collector/components/#filelog-receiver)

### 설정:

- Collector 설정

```yaml
filelog:
  include:
    # [핵심] 쿠버네티스 표준 로그 경로 (네임스페이스/파드/컨테이너/*.log)
    - /var/log/pods/*/*/*.log
  exclude:
    # [중요] '무한 루프 방지'
    # Collector 자기 자신이 뱉는 로그는 수집하지 않겠다는 뜻입니다.
    # 이걸 안 하면 "로그 수집했다"는 로그를 또 수집하고... 무한 반복되어 폭발합니다.
    - /var/log/pods/*/otel-collector/*.log
  
  start_at: end  # Collector가 재시작됐을 때, '파일의 끝'부터 읽겠다. (과거 로그 중복 수집 방지)
  include_file_path: true  # [필수] 파일 경로를 데이터에 포함시킴 (이게 있어야 나중에 경로를 분석해서 파드명을 알아냄)
  include_file_name: false # 파일 이름 자체는 경로에 포함되니 굳이 중복으로 안 가져옴
  
  operators:
    # [마법의 설정] 복잡한 파싱 규칙을 한 방에 해결하는 전용 연산자
    - type: container
      id: container-parser
```

> 더 자세한 설정: [https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver)

- Daemonset 설정

```yaml
apiVersion: apps/v1
kind: DaemonSet
spec:
  template:
    spec:
      containers:
        - name: opentelemetry-collector
          # ...
          volumeMounts:
            # [내부 연결] 컨테이너 안의 '/var/log/pods' 경로에 연결해라
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true   # (Collector가 로그를 지우면 안 되니까 읽기 전용으로)
            
            # [추가 연결] 도커 엔진을 쓰는 경우 필요할 수 있음
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      
      volumes:
        # [외부 원천] 실제 노드(Host)의 어디를 가져올 거니?
        - name: varlogpods
          hostPath:
            path: /var/log/pods  # 노드의 실제 로그 저장소
        
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

---

## 자동화 Receiver 설정

```yaml
mode: deployment

image:
  repository: otel/opentelemetry-collector-k8s

# We only want one of these collectors - any more and we'd produce duplicate data
replicaCount: 1

presets:
  # enables the k8sclusterreceiver and adds it to the metrics pipelines
  clusterMetrics:
    enabled: true
  # enables the k8sobjectsreceiver to collect events only and adds it to the logs pipelines
  kubernetesEvents:
    enabled: true
## The chart only includes the debugexporter by default
## If you want to send your data somewhere you need to
## configure an exporter, such as the otlp exporter
# config:
# exporters:
#   otlp:
#     endpoint: "<SOME BACKEND>"
# service:
#   pipelines:
#     traces:
#       exporters: [ otlp ]
#     metrics:
#       exporters: [ otlp ]
#     logs:
#       exporters: [ otlp ]

```

> 위에 있는 내용들을 자동화해서 배포를 해주게 된다. OTLP Receiver는 기본적으로 default로 배포가 되게 된다.

### OTLP 예시:

### 1단계: Collector가 문 열기 (수신 측)

Helm 차트로 DaemonSet을 배포하면, Collector는 **`hostPort`** 모드로 동작합니다.

- **의미:** Collector 파드는 자기만의 IP뿐만 아니라, 자기가 속한 **노드(Host)의 4317 포트**도 점유하고 귀를 기울입니다.
- **상태:** 노드의 IP가 `10.10.10.5`라면, `10.10.10.5:4317`로 들어오는 요청을 받을 준비가 된 것입니다.

### 2단계: 애플리케이션이 주소 알아내기 (송신 측)

애플리케이션 파드가 뜰 때, 쿠버네티스에게 물어봅니다.

- "나 지금 어느 노드에 떠 있어? 그 노드 IP 좀 알려줘."
- 이때 사용하는 기능이 **Downward API (`status.hostIP`)** 입니다.

### 3단계: 데이터 전송

애플리케이션은 알아낸 IP(`10.10.10.5`)의 `4317` 포트로 데이터를 쏩니다. 그러면 같은 노드에 있는 Collector가 낚아챕니다.