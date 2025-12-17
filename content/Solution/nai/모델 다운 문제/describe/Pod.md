```yaml

Name:             nai-298962c8-9456-4b2c-8dd1-3f-model-job-d7tcl
Namespace:        nai-admin
Priority:         0
Service Account:  nai-model-processor-sa
Node:             nai-gpu-worker-0-hkxm2-gwzhl-zsnvh-mp2gt/192.168.120.81
Start Time:       Tue, 16 Dec 2025 02:35:09 +0000
Labels:           batch.kubernetes.io/controller-uid=96ee491c-0631-4768-a3c8-a1f2ce8f0a7c
                  batch.kubernetes.io/job-name=nai-298962c8-9456-4b2c-8dd1-3f-model-job
                  controller-uid=96ee491c-0631-4768-a3c8-a1f2ce8f0a7c
                  job-name=nai-298962c8-9456-4b2c-8dd1-3f-model-job
Annotations:      <none>
Status:           Running
IP:               10.20.18.62
IPs:
  IP:           10.20.18.62
Controlled By:  Job/nai-298962c8-9456-4b2c-8dd1-3f-model-job
Containers:
  process-model-container:
    Container ID:   containerd://c19c4b3d3b4fb24c050e36f0c08ea4c722e3cfffc2acba72148cf04f5daa331c
    Image:          docker.io/nutanix/nai-model-processor:v2.5.0
    Image ID:       docker.io/nutanix/nai-model-processor@sha256:ee92606709c4dbcf73b18adfecb07daed2fb42c40cc2fef1d9435a8a13af4574
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Tue, 16 Dec 2025 02:35:19 +0000
    Ready:          True
    Restart Count:  0
    Environment:
      MODEL_NAME:                     nai-298962c8-9456-4b2c-8dd1-3f
      OUTPUT_MOUNT:                   /data
      OUTPUT_FORMAT:                  hf
      TERMINATION_MESSAGE_FILE_PATH:  /tmp/model-process-termination-message
      PROVIDER:                       hf
      REPO_ID:                        Qwen/Qwen3-VL-235B-A22B-Instruct-FP8
      REPO_VERSION:                   
      HF_TOKEN:                       <set to the key 'HF_TOKEN' in secret 'nai-1eafc79c-3d9d-4fcd-8832-db'>  Optional: true
    Mounts:
      /data from model-store-volume (rw)
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-24hlz (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True 
  Initialized                 True 
  Ready                       True 
  ContainersReady             True 
  PodScheduled                True 
Volumes:
  model-store-volume:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  nai-298962c8-9456-4b2c-8dd1-3f-pvc-claim
    ReadOnly:   false
  kube-api-access-24hlz:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    Optional:                false
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:                      <none>


```


