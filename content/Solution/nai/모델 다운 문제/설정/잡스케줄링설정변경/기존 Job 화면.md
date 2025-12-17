```yaml

apiVersion: batch/v1
kind: Job
metadata:
  creationTimestamp: "2025-12-16T06:05:22Z"
  generation: 1
  labels:
    batch.kubernetes.io/controller-uid: 844d477c-4428-41b3-b70e-fce8bb5b4cea
    batch.kubernetes.io/job-name: nai-f83a3d53-1ac8-402f-86af-0c-model-job
    controller-uid: 844d477c-4428-41b3-b70e-fce8bb5b4cea
    job-name: nai-f83a3d53-1ac8-402f-86af-0c-model-job
  name: nai-f83a3d53-1ac8-402f-86af-0c-model-job
  namespace: nai-admin
  ownerReferences:
  - apiVersion: iep.nai.nutanix.com/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: Model
    name: nai-f83a3d53-1ac8-402f-86af-0c
    uid: 217f421b-e579-4752-a1ad-02f60f52083c
  resourceVersion: "13881052"
  uid: 844d477c-4428-41b3-b70e-fce8bb5b4cea
spec:
  backoffLimit: 1
  completionMode: NonIndexed
  completions: 1
  manualSelector: false
  parallelism: 1
  podReplacementPolicy: TerminatingOrFailed
  selector:
    matchLabels:
      batch.kubernetes.io/controller-uid: 844d477c-4428-41b3-b70e-fce8bb5b4cea
  suspend: false
  template:
    metadata:
      creationTimestamp: null
      labels:
        batch.kubernetes.io/controller-uid: 844d477c-4428-41b3-b70e-fce8bb5b4cea
        batch.kubernetes.io/job-name: nai-f83a3d53-1ac8-402f-86af-0c-model-job
        controller-uid: 844d477c-4428-41b3-b70e-fce8bb5b4cea
        job-name: nai-f83a3d53-1ac8-402f-86af-0c-model-job
    spec:
      containers:
      - env:
        - name: MODEL_NAME
          value: nai-f83a3d53-1ac8-402f-86af-0c
        - name: OUTPUT_MOUNT
          value: /data
        - name: OUTPUT_FORMAT
          value: hf
        - name: TERMINATION_MESSAGE_FILE_PATH
          value: /tmp/model-process-termination-message
        - name: PROVIDER
          value: hf
        - name: REPO_ID
          value: Qwen/Qwen3-VL-235B-A22B-Instruct-FP8
        - name: REPO_VERSION
        - name: HF_TOKEN
          valueFrom:
            secretKeyRef:
              key: HF_TOKEN
              name: nai-1eafc79c-3d9d-4fcd-8832-db
              optional: true
        image: docker.io/nutanix/nai-model-processor:v2.5.0
        imagePullPolicy: IfNotPresent
        name: process-model-container
        resources: {}
        securityContext:
          runAsUser: 0
        terminationMessagePath: /tmp/model-process-termination-message
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /data
          name: model-store-volume
      dnsPolicy: ClusterFirst
      restartPolicy: Never
      schedulerName: default-scheduler
      securityContext: {}
      serviceAccount: nai-model-processor-sa
      serviceAccountName: nai-model-processor-sa
      terminationGracePeriodSeconds: 30
      volumes:
      - name: model-store-volume
        persistentVolumeClaim:
          claimName: nai-f83a3d53-1ac8-402f-86af-0c-pvc-claim
  ttlSecondsAfterFinished: 86400
status:
  active: 1
  ready: 1
  startTime: "2025-12-16T06:05:22Z"
  terminating: 0
  uncountedTerminatedPods: {}

```