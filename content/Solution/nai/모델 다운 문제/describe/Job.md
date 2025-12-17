```yaml

Name:                        nai-298962c8-9456-4b2c-8dd1-3f-model-job
Namespace:                   nai-admin
Selector:                    batch.kubernetes.io/controller-uid=96ee491c-0631-4768-a3c8-a1f2ce8f0a7c
Labels:                      batch.kubernetes.io/controller-uid=96ee491c-0631-4768-a3c8-a1f2ce8f0a7c
                             batch.kubernetes.io/job-name=nai-298962c8-9456-4b2c-8dd1-3f-model-job
                             controller-uid=96ee491c-0631-4768-a3c8-a1f2ce8f0a7c
                             job-name=nai-298962c8-9456-4b2c-8dd1-3f-model-job
Annotations:                 <none>
Controlled By:               Model/nai-298962c8-9456-4b2c-8dd1-3f
Parallelism:                 1
Completions:                 1
Completion Mode:             NonIndexed
Suspend:                     false
Backoff Limit:               1
TTL Seconds After Finished:  86400
Start Time:                  Tue, 16 Dec 2025 02:35:09 +0000
Pods Statuses:               1 Active (1 Ready) / 0 Succeeded / 0 Failed
Pod Template:
  Labels:           batch.kubernetes.io/controller-uid=96ee491c-0631-4768-a3c8-a1f2ce8f0a7c
                    batch.kubernetes.io/job-name=nai-298962c8-9456-4b2c-8dd1-3f-model-job
                    controller-uid=96ee491c-0631-4768-a3c8-a1f2ce8f0a7c
                    job-name=nai-298962c8-9456-4b2c-8dd1-3f-model-job
  Service Account:  nai-model-processor-sa
  Containers:
   process-model-container:
    Image:      docker.io/nutanix/nai-model-processor:v2.5.0
    Port:       <none>
    Host Port:  <none>
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
  Volumes:
   model-store-volume:
    Type:          PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:     nai-298962c8-9456-4b2c-8dd1-3f-pvc-claim
    ReadOnly:      false
  Node-Selectors:  <none>
  Tolerations:     <none>
Events:            <none>
```
