- 마운트 되어 있는 위치의 파일 확인
```python

python3 -c "import os; print(os.listdir('/data/model-files'))"
['.gitattributes', 'preprocessor_config.json', '.cache', 'model-00022-of-00024.safetensors', 'model-00011-of-00024.safetensors', 'model-00006-of-00024.safetensors', 'model-00017-of-00024.safetensors', 'generation_config.json', 'model-00023-of-00024.safetensors', 'config.json', 'README.md', 'model-00001-of-00024.safetensors', 'tokenizer.json', 'video_preprocessor_config.json', 'model-00016-of-00024.safetensors', 'model-00007-of-00024.safetensors', 'model-00018-of-00024.safetensors', 'model-00002-of-00024.safetensors', 'model-00013-of-00024.safetensors', 'model-00020-of-00024.safetensors', 'model.safetensors.index.json', 'model-00015-of-00024.safetensors', 'model-00004-of-00024.safetensors', 'merges.txt', 'model-00012-of-00024.safetensors', 'chat_template.json', 'model-00003-of-00024.safetensors', 'model-00019-of-00024.safetensors', 'tokenizer_config.json', 'model-00021-of-00024.safetensors', 'vocab.json', 'model-00005-of-00024.safetensors', 'model-00014-of-00024.safetensors']

```

- 해당 경로의 재귀적 용량 확인
```python

python3 -c "import os; root='/data/model-files'; print(f'{sum(os.path.getsize(os.path.join(r,f)) for r,d,fl in os.walk(root) for f in fl) / (1024**3):.2f} GB')"
200.35 GB


```
> 해당 명령어를 통해서 확인할 수 있음.

