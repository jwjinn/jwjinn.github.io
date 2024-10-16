---
title: 1. VM 설치
description: 
date: 24-10-15
categories: [kubernetes, 1.VM과 쿠버네티스 설치와 설정]
tags: [kubernetes]
pin: true
math: true
mermaid: true

---

## 환경 구축

쿠버네티스를 내부에서 테스트를 할려면 설치와 함께 클러스터링이 되어야 합니다.

### 환경 구축의 목표
![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-13-53-50.png)

1. VM 3대 설치, 3대의 OS는 지금 서버 환경에서 사용하고 있는 'Rocky8'로 진행한다.

2. 각각의 VM들은 네트워크를 통해, 각각 통신이 되어야 한다.

3. 각각의 VM들은 편의를 위해 외부 인터넷이 되어야 한다.

4. 쿠버네티스를 각각 설치를 하고, 그 중 하나의 VM을 'mastr'로 설정한다.


***

## rocky8 다운하기

Rocky8 리눅스를 [공식 다운 홈페이지](https://rockylinux.org/ko/download)에서 다운을 할 경우에는 매우 속도가 느립니다.

따라서, [Mirror 서버](https://mirrors.rockylinux.org/mirrormanager/mirrors/Rocky)를 통해서 다운합니다.

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-14-06-48.png)
> 윈도우에서는 옆에 있는 'http', 'https'를 클릭하면 됩니다.


![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-14-09-54.png)
>`mirror.siwoo.org` 링크 기준으로 `https://mirror.siwoo.org/rocky/8.10/isos/x86_64/Rocky-8-latest-x86_64-minimal.iso` 파일을 다운로드 했습니다.

## VM 실행

- Oracle VM VirtualBox를 사용했습니다.
- VM을 설정을 할 때는 CPU 코어 2, RAM은 2048을 사용했습니다.
- 필요시, VM 사양은 높일 예정입니다.

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-14-15-28.png)
> 현재 화면에서는 이미지를 설정하고 가지 않을 겁니다.<br>
> 추후에 리눅스 커널 오류가 나는 것을 막기 위해서, 버전을 `Red Hat 8.x(64-bit)`로 설정합니다.


> 기본적으로 RAM과 코어를 설정해서 진행을 하면 되지만, 이상하게도 해당 화면에서 `Rocky`이미지를 설정을 하고 넘어가면 구동시에 `checksum`에러가 많이 났습니다. 
{: .prompt-warning }

## 설치 완료 화면

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-14-17-20.png)
> 제대로 실행이 되고, 해당 화면에서 `Root Password`, `Installation Destination`을 설정을 하면 재부팅이 되면서 실행이 됩니다.

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-14-20-45.png)