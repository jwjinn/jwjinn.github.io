---
title: 2. VM 복제와 네트워크 설정
description: 
date: 24-10-15
categories: [kubernetes, 1.VM 설치와 설정]
tags: [kubernetes]
pin: true
math: true
mermaid: true

---

# 목표
1. VM 복사해서 VM이 3개가 되도록 한다.
2. VM 간의 통신이 되는 네트워크 설정, 각각의 VM들이 인터넷이 되도록 설정한다.

## VM 복제
미리 설치한 VM의 이름을 `rocky8-master`로 변경했습니다.

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-14-28-00.png)
> 정상적으로 동작중인 vm에 오른쪽 클릭을 해서 `복제`를 클릭한다.

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-14-29-26.png)
> 이름을 `rocky8-node1`로 입력하고 다음을 클릭합니다.<br>
> 복제 옵션은 최대한 실 서버와 동일하게 하기 위해서 `완전한 복제`를 선택했습니다.

위와 같은 방법으로 `rocky8-node2` VM도 추가 생성합니다.

### 최종 결과 화면

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-14-34-39.png)

***

## 어뎁터에 브리지를 통한 외부 인터넷 설정:

현재 Host 네트워크가 사용하고 있는 네트워크 인터페이스에 붙어서 사용하겠다는 것을 의미합니다.
> 사용하게 된 이유는 'NAT'를 시도해보다가, VM에 IP 할당이 잘 안되었습니다.


![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-15-38-37.png)
> 설정 -> 네트워크 -> '어뎁터에 브리지'를 설정을 하고 VM을 실행합니다.

> 고급을 클릭후, MAC 주소 옆에 있는 버튼을 클릭해서 VM 마다 새로운 MAC 주소를 받을 수 있도록 해야 합니다.<br>
> VM에 할당되는 IPv6 ip는 MAC 주소를 기반으로 만들어서 VM에 할당합니다.<br>
> 동일한 VM을 복사해서 사용했으므로, MAC 주소가 같으면, `동일한 IP가 생성`되었다는 에러가 VM에 뜨게 됩니다.
{: .prompt-warning }

### IP 할당을 위한 설정

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-15-42-42.png)
> 기본적으로 VM은 DHCP 서버로부터 IP를 할당 받아야 합니다.<br>
> 완전히, 호스트 컴퓨터의 IPv4 주소와 동일하지는 않지만, `enp0s3`에서 inet은 호스트 컴퓨터의 IPv4 앞자리와 유사해야 합니다.

그러나, 현재 ether를 살펴보면, 전혀 IP가 발당되어 있지 않습니다.

### VM의 OS가 네트워크 인터페이스가 자동으로 설정되도록 수정한다.

#### 1. 네트워크 설정 파일 편집:

```shell
vi /etc/sysconfig/network-scripts/ifcfg-enp0s3
```

#### 2. `ONBOOT=yes`로 수정한다.

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-15-54-10.png)
> 그러고 나서, VM을 재기동합니다.

#### 3. 네트워크 확인:

inet 옆에 ip가 변경된 것을 확인할 수 있습니다.


#### 4. VM 끼리 통신 확인

어뎁터엔 브리지를 활용을 하면, Oracle Virtual Machine이 제공하는 `DHCP`를 통해서 각각 IP를 할당을 받게 된다.

호스트의 네트워크 인터페이스에 모든 VM이 연결되어 있으므로 각자의 IP로 통신이 가능하다.

`ifconfig`로 inet 옆에 있는 ip를 날려서 ping으로 통신을 확인하면 된다.

#### 5. 호스트(윈도우 컴퓨터)에서 VM ssh 접속

- 모든 VM에 ssh 설치

```shell

yum install -y openssh-server

systemctl start sshd
systemctl enable sshd

```

![](https://jwjinn.github.io/assets/img/kubernetes/2024-10-15-16-41-39.png)
> vm에서 ifconfig로 확인한 ip를 통해서 접속을 하면 됩니다.

