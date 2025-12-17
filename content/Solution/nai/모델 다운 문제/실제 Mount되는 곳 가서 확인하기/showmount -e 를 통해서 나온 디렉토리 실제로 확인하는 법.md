- **임시 마운트 포인트 생성**

    ```
    mkdir -p /tmp/nfs_check
    ```
    
- **마운트 연결** (예: `/smartops` 확인 시)
    ```
    # mount -t nfs [서버주소]:[서버경로] [내컴퓨터경로]
    sudo mount -t nfs nai-nfs.maymust.co.kr:/smartops /tmp/nfs_check
    ```
    
- **파일 확인** 이제 `/tmp/nfs_check`로 들어가면 서버의 파일들이 보입니다.

    ```
    ls -al /tmp/nfs_check
    # 또는
    cd /tmp/nfs_check
    ```
    
- **확인 후 연결 해제** (다 보고 나면 끊어줍니다)

    ```
    sudo umount /tmp/nfs_check
    ```

***

## 용량 확인

```

# 현재 폴더(.)의 총 용량 확인
du -sh .

# 특정 폴더(./model-files/)의 용량 확인
du -sh ./model-files/

```