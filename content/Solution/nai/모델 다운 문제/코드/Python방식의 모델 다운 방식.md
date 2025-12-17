

```python

from huggingface_hub import snapshot_download

model_path = snapshot_download(
    repo_id="Qwen/Qwen3-VL-235B-A22B-Instruct-FP8",
    local_dir="/data/model-files",
    local_dir_use_symlinks=False,  # 실제 파일을 해당 폴더에 저장
    token="자신의_HF_토큰"
)

print(f"다운로드 완료 경로: {model_path}")

```

