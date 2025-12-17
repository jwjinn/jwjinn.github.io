- 어떤 NAS 서버에 접속중인가
```shell

kubectl exec -it -n nai-admin debug-storage-check-new -- mount | grep /debug-data
nai-nfs.maymust.co.kr:/nai-test/pvc-1420e504-2176-4754-a532-468d34eed8c9 on /debug-data type nfs4 (rw,relatime,vers=4.0,rsize=1048576,wsize=1048576,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.120.81,local_lock=none,addr=192.168.120.52)

```

- 어떤 이름으로 저장중인가?
```shell

kubectl exec -it -n nai-admin debug-storage-check-new -- mount | grep /debug-data
nai-nfs.maymust.co.kr:/nai-test/pvc-1420e504-2176-4754-a532-468d34eed8c9 on /debug-data type nfs4 (rw,relatime,vers=4.0,rsize=1048576,wsize=1048576,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.120.81,local_lock=none,addr=192.168.120.52)


```

- 파일 다운로드 검색
```shell

# 파일 크기 변화 확인 (사람이 보기 편한 단위 h 사용)
kubectl exec -it -n nai-admin debug-storage-check-new -- ls -lh /debug-data/model-files/

```
