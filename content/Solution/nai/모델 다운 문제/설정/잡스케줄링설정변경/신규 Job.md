```yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: nai-96141299-40ce-465d-bd4f-cd-model-job
  namespace: nai-admin
  ownerReferences:
  - apiVersion: iep.nai.nutanix.com/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: Model
    name: nai-96141299-40ce-465d-bd4f-cd
    uid: 95a1c02e-5853-47e4-81e1-d0ff2df0c041
spec:
  backoffLimit: 1
  completionMode: NonIndexed
  completions: 1
  manualSelector: false
  parallelism: 1
  podReplacementPolicy: TerminatingOrFailed
  suspend: false
  template:
    metadata:
      labels:
        # 중요: controller-uid 등 시스템 라벨은 모두 제거하고 순수 식별자만 남김
        job-name: nai-96141299-40ce-465d-bd4f-cd-model-job
    spec:
      containers:
      - env:
        - name: HF_HOME       # ✅ 우리가 원했던 수정 사항
          value: "/data"
        - name: MODEL_NAME
          value: nai-96141299-40ce-465d-bd4f-cd
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
          claimName: nai-96141299-40ce-465d-bd4f-cd-pvc-claim
  ttlSecondsAfterFinished: 86400

```

nai-96141299-40ce-465d-bd4f-cd
이름 변경은 하면 안됨
