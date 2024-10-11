---
title: 1. 베이그런트의 설치와 실행 확인 
description: 
date: 24-10-11
categories: [kubernetes, 2장.테스트 환경 구성하기]
tags: [kubernetes, vagrant]
pin: true
math: true
mermaid: true

---

## 윈도우 베이그런트 설치:

- [베이그런트 설치 페이지](https://developer.hashicorp.com/vagrant/install?product_intent=vagrant)

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-11-09-31-51.png)
> 링크를 들어가게 되면, 윈도우로 설치하는 링크가 나옵니다.


![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-11-09-32-47.png)
> 윈도우는 설치 마법사를 통해서 진행이 됩니다.

## 베이그런트 구성 및 테스트

### 1. vagrant init

#### 폴더 생성
![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-11-09-47-03.png)
> 우선, C 드라이브에 `HashiCorp`라는 폴더 명을 만들어 둡니다.

#### 베이그런트 기초 파일 생성
![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-11-09-49-07.png)

```cmd

C:\Users\jwjin>cd c:\HashiCorp

c:\HashiCorp>vagrant init
A `Vagrantfile` has been placed in this directory. You are now
ready to `vagrant up` your first virtual environment! Please read
the comments in the Vagrantfile as well as documentation on
`vagrantup.com` for more information on using Vagrant.

```

> `vagrant init` 명령을 통해서 베이그런트 활용을 위한 기초 파일을 생성합니다.


### 2. 코드 에디터로 파일 확인

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-11-09-52-41.png)
> VS Code를 통해서 `HashiCorp` 디렉토리 폴더를 열면, ruby 언어로 작성된 파일을 볼 수 있습니다.

열고 나서 `config.vm.box = "base"` 라는 내용을 확인합니다.

### 3. 프로비저닝 실행.

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-11-10-00-18.png)
> `vagrant up`을 하게 되면, 프로바이징을 진행을 하게 됩니다. 앞서 확인을 해보았던 `base`이미지를 기준으로 진행을 하게 됩니다.<br>
> 위 에러는 시스템 상에서 `base` 이미지를 찾지 못해 생기는 에러 입니다.

### 4. 이미지 다운

> 해당 내용은 "컨테이너 인프라 환경 구축을 위한 쿠버네티스/도커" 책의 내용을 정리하고 있습니다. 그래서 저자의 vagrant 클라우드를 통해서 다운을 받습니다.
{: .prompt-info }

`config.vm.box = "sysnet4admin/CentOS-k8s"`으로 수정을 하고 `vagrant up` 명령을 하게 되면, Oracle Virtual Box에 해당 내용이 나오게 됩니다.


![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-11-10-22-19.png)

### 5. 베이그란트 실행 확인 및 머신 삭제

- 실행 확인
```cmd
c:\HashiCorp>vagrant ssh
[vagrant@k8s ~]$ uptime
 10:23:04 up 7 min,  1 user,  load average: 0.00, 0.12, 0.10
[vagrant@k8s ~]$ cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
[vagrant@k8s ~]$ exit
logout

```

- 머신 삭제
```cmd

vagrant destroy -f

```

***

이렇게 해서, VM과 Vagrant의 정상적으로 설치 된 것을 확인할 수 있습니다.