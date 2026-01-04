
## 1. MetalLB 파드 상태 확인
```shell

kubectl get pods -n metallb-system
NAME                                  READY   STATUS    RESTARTS       AGE
metallb-controller-657db84bfc-kzn9c   1/1     Running   3 (27h ago)    23d
metallb-speaker-2msmv                 4/4     Running   8 (27h ago)    14d
metallb-speaker-bzmjp                 4/4     Running   13 (27h ago)   23d
metallb-speaker-fwgbc                 4/4     Running   8 (27h ago)    14d
metallb-speaker-mbsqd                 4/4     Running   8 (27h ago)    13d
metallb-speaker-msw7q                 4/4     Running   13 (27h ago)   23d
metallb-speaker-s4p9g                 4/4     Running   8 (27h ago)    14d
metallb-speaker-stt97                 4/4     Running   15 (27h ago)   23d
metallb-speaker-tdp2c                 4/4     Running   8 (27h ago)    13d
metallb-speaker-vwlmp                 4/4     Running   8 (27h ago)    10d
metallb-speaker-zwlqz                 4/4     Running   11 (27h ago)   14d


```

## 2. IP 할당 풀 설정 확인

```shell

kubectl get ipaddresspools -n metallb-system
NAME      AUTO ASSIGN   AVOID BUGGY IPS   ADDRESSES
metallb   true          false             ["192.168.120.156-192.168.120.159"]

```

## 3. 현재 서비스 확인
```shell

kubectl get svc -A | grep LoadBalancer
default                 gpu-jupyter-lb                                   LoadBalancer   10.101.95.37     192.168.120.158   3000:31530/TCP                                             15m
envoy-gateway-system    envoy-nai-system-nai-ingress-gateway-ff52ba1f    LoadBalancer   10.99.170.161    192.168.120.157   80:30107/TCP,443:31983/TCP                                 9d
mmnkp-gpu-nplz2-r8ddd   kommander-traefik                                LoadBalancer   10.102.103.100   192.168.120.156   8085:30280/TCP,5000:30587/TCP,80:32640/TCP,443:31258/TCP   22d


```

### 4. 서비스 생성 확인
```shell
kubectl get svc gpu-jupyter-lb
NAME             TYPE           CLUSTER-IP     EXTERNAL-IP       PORT(S)          AGE
gpu-jupyter-lb   LoadBalancer   10.101.95.37   192.168.120.158   3000:31530/TCP   16m

```