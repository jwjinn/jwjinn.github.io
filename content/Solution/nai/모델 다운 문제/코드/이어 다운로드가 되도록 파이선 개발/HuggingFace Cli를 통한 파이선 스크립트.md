- Job 생성
	- 컨테이너는 Python:3.10
``
```yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: smart-resume-downloader
  namespace: nai-admin
spec:
  backoffLimit: 10
  template:
    metadata:
      labels:
        app: resume-downloader
    spec:
      restartPolicy: OnFailure
      containers:
      - name: downloader
        image: python:3.10
        command: ["/bin/bash", "-c"]
        args:
        - |
          echo "📥 Installing libraries..."
          # 최신 버전을 강제로 설치하도록 --upgrade 옵션 추가
          pip install --upgrade huggingface_hub[cli] --quiet

          echo "🚀 Starting Smart Resume Downloader (Compatibility Mode)..."
          
          python3 -u -c "
          import os
          import time
          import sys
          # [수정] 호환성을 위해 configure_http_backend 제거
          from huggingface_hub import snapshot_download

          REPO_ID = os.environ.get('REPO_ID')
          LOCAL_DIR = os.environ.get('LOCAL_DIR')
          TOKEN = os.environ.get('HF_TOKEN')

          print(f'TARGET: {REPO_ID}')
          print(f'SAVE TO: {LOCAL_DIR}')
          print('⏳ Initializing connection... (Logs might be slow at first)')

          while True:
              try:
                  snapshot_download(
                      repo_id=REPO_ID,
                      local_dir=LOCAL_DIR,
                      local_dir_use_symlinks=False,
                      resume_download=True,
                      token=TOKEN,
                      max_workers=8
                  )
                  print('\n✅ Download Completed Successfully!')
                  sys.exit(0)
              except Exception as e:
                  print(f'\n⚠️ Network Error: {e}')
                  print('⏳ Waiting 15 seconds before resuming...')
                  time.sleep(15)
          "
        
        env:
        - name: PYTHONUNBUFFERED
          value: "1"
        - name: REPO_ID
          value: "Qwen/Qwen3-VL-235B-A22B-Instruct-FP8"
        - name: LOCAL_DIR
          value: "/data/model-files"
        - name: HF_HOME
          value: "/data/hf_cache"
        - name: HF_TOKEN
          valueFrom:
            secretKeyRef:
              key: HF_TOKEN
              name: nai-1eafc79c-3d9d-4fcd-8832-db
              optional: true

        resources:
          limits:
            memory: "16Gi"
            cpu: "4"
        
        volumeMounts:
        - mountPath: /data
          name: model-store-volume

      volumes:
      - name: model-store-volume
        persistentVolumeClaim:
          claimName: nai-96141299-40ce-465d-bd4f-cd-pvc-claim

```

## 간단 설명
- `resume_download = True` 옵션을 통해서, 이어받기가 가능하도록 로직을 추가
- Job을 통한 POD 재시작 횟수 관리.
- 기존 POD를 수동으로 삭제를 하고 남아있는 PVC를 대상으로 데이터를 넣도록 진행.
- OOM을 대비하기 위한 충분한 Memory.
- env 형식으로 범용성을 높임.
