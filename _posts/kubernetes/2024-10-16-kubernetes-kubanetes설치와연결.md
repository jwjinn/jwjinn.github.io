---
title: 3. 쿠버네티스 설치를 위한 기본 커널 설정
description: 
date: 24-10-16
categories: [kubernetes, 1.VM 설치와 설정]
tags: [kubernetes]
pin: true
math: true
mermaid: true

---

> 아래의 설정은 대부분 커널 설정이니, root 계정에서 진행을 했습니다.
{: .prompt-info }

# 목표:

1. 각각의 VM에 쿠버네티스 설치

2. 각각의 쿠버네티스를 네트워크를 통해서 연결하자.

***

## 전에 해야 할 일, 계정을 만들자.

기본적으로 root 계정으로 작업을 할 일은 없기에, 신규 계정을 생성을 하고

가능하면, sudo 명령을 사용하지 않고 진행을 해보고자 합니다.

```shell
[root@localhost ~]# useradd nethru
[root@localhost ~]# passwd nethru
Changing password for user nethru.
New password:
BAD PASSWORD: The password contains the user name in some form
Retype new password:
passwd: all authentication tokens updated successfully.
```

***

# 쿠버네티스의 설치와 Linux 설정

## 방화벽 프로그램을 설정하자.

실제 프로젝트 서버에서는 방화벽을 자유롭게 설정을 할 일은 없을 거다.

따라서, 내 컴퓨터에 있는 VM 이여도, 방화벽을 설정해서 최대한 실무 환경과 비슷하게 한다.

### 설치부터 기본 방화벽 설정까지.

>우선, 호스트 컴퓨터에서 22번으로 ssh를 접속해야 하므로 그 설정이 되도록 한다.

- firewalld 설치
```shell
[root@localhost ~]# dnf install firewalld -y
```

- 항상 재실행되도록 등록, 실행, 상태 확인
```shell
[root@localhost ~]# systemctl enable firewalld
[root@localhost ~]# systemctl start firewalld
[root@localhost ~]# systemctl status firewalld
● firewalld.service - firewalld - dynamic firewall daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2024-10-15 21:40:08 EDT; 53s ago
     Docs: man:firewalld(1)
 Main PID: 2079 (firewalld)
    Tasks: 2 (limit: 11137)
   Memory: 35.4M
   CGroup: /system.slice/firewalld.service
           └─2079 /usr/libexec/platform-python -s /usr/sbin/firewalld --nofork --nopid

Oct 15 21:40:06 localhost.localdomain systemd[1]: Starting firewalld - dynamic firewall daemon...
Oct 15 21:40:08 localhost.localdomain systemd[1]: Started firewalld - dynamic firewall daemon.
Oct 15 21:40:08 localhost.localdomain firewalld[2079]: WARNING: AllowZoneDrifting is enabled. This is considered an insecure configuration option>
```

- 22번 포트 방화벽 허용 추가, 등록, 추가 확인

```shell
[root@localhost ~]# firewall-cmd --zone=public --add-port=22/tcp --permanent
success
[root@localhost ~]# firewall-cmd --reload
success
[root@localhost ~]# firewall-cmd --list-ports
22/tcp
[root@localhost ~]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: enp0s3
  sources:
  services: cockpit dhcpv6-client ssh
  ports: 22/tcp
  protocols:
  forward: no
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

***

## 방화벽 설정

- [방화벽 공식문서](https://kubernetes.io/ko/docs/reference/networking/ports-and-protocols/)를 살펴보면 더 자세한 설명을 볼 수 있다.

- [참고 많이한 velog](https://velog.io/@intellik/%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4-%EC%84%A4%EC%B9%98%EB%B6%80%ED%84%B0-%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C-%EC%A0%91%EC%86%8D%EA%B9%8C%EC%A7%80)

| 포트 범위        | 구성 요소                | 설명                                                                                   | 노드 유형            |
|------------------|--------------------------|----------------------------------------------------------------------------------------|----------------------|
| `6443`           | API 서버                 | 클러스터의 중앙 통신 허브로, 외부 요청(`kubectl`) 및 다른 쿠버네티스 컴포넌트의 요청을 처리 | **Control Plane**    |
| `2379-2380`      | etcd 서버                | `2379`: 클라이언트가 데이터 조회/업데이트 <br>`2380`: etcd 클러스터 간 데이터 동기화    | **Control Plane**    |
| `10250`          | kubelet API              | Control Plane의 구성 요소가 각 노드의 상태를 체크하고 명령 전달을 위해 사용               | **Control Plane, Worker** |
| `10257`          | kube-controller-manager  | Controller Manager의 내부 통신을 위해 사용                                              | **Control Plane**    |
| `10259`          | kube-scheduler           | Scheduler의 내부 통신을 위해 사용                                                       | **Control Plane**    |
| `30000-32767`    | NodePort 서비스          | 클러스터 외부에서 서비스 접근을 위해 사용되는 포트 범위                                 | **Worker**           |

### 방화벽 설정이 필요한 이유:

쿠버네티스라고 해서 하나의 쿠버네티스 프로그램이 실행이 되는 형식이 아닙니다.

쿠버네티스라는 하나의 집단에 여러개의 모듈들이 있고, 그 모듈들은 특정 포트를 통해서 통신을 하고 있습니다.

그래서, 다른 프로그램들 보다 더 많은 방화벽이 요구됩니다.

### 시나리오로 설명하는 포트 흐름.

#### 1. 애플리케이션 배포 요청
- 관리자가 **kubectl**을 사용해서 새로운 애플리케이션 배포 요청을 보낸다. 이 요청은 API 서버(Control Plane의 핵심 컴포넌트)로 전달돼.
- **API 서버**는 `6443` 포트를 통해 요청을 받는다. 이 요청에는 파드를 생성할 스펙 정보가 포함돼 있어.

#### 2. 스케줄러가 적절한 노드 선택
- **API 서버**는 받은 요청을 **etcd**에 저장하여 현재 클러스터 상태를 업데이트한다. **etcd**는 쿠버네티스 클러스터의 상태 저장소로, `2379` 포트를 통해 API 서버와 통신하며 데이터를 저장한다.
- **스케줄러(kube-scheduler)**는 API 서버로부터 클러스터 상태와 배포 요청을 받아 새 파드를 배치할 적절한 **Worker 노드**를 선택한다. 이 통신은 **API 서버**와 **스케줄러** 간에 이루어지며, 스케줄러는 `10259` 포트를 사용해 요청을 처리한다.


#### 3. 파드 생성 명령 전달
- **스케줄러**가 적절한 **Worker 노드**를 선택한 후, **API 서버**는 선택된 **Worker 노드**에 **파드를 생성하라는 명령을 전달**한다.
  - 이때 **API 서버**는 해당 **Worker 노드**의 **kubelet**에 `10250` 포트를 통해 명령을 전달한다. **kubelet**은 해당 노드에서 파드를 관리하는 역할을 한다.
  
#### 4. 파드 상태 보고
- **Worker 노드의 kubelet**은 파드를 생성하고 그 상태를 **Control Plane**으로 보고한다.
  - **kubelet**은 파드 생성이 완료되면, `10250` 포트를 통해 **API 서버**로 파드의 상태 정보를 전달한다. 이를 통해 Control Plane은 클러스터의 전체 상태를 유지할 수 있다.
  
#### 5. 서비스 접근 설정
- 배포된 애플리케이션에 사용자가 접근할 수 있도록 **NodePort** 서비스를 사용해 노출한다면, **API 서버**는 각 Worker 노드에 **NodePort 서비스 설정**을 적용한다.
  - 이 과정에서 **NodePort**는 `30000-32767` 범위의 포트를 사용해 외부 사용자들이 해당 애플리케이션에 접근할 수 있게 한다.
  - 외부 사용자가 **NodePort**를 통해 서비스에 접근하면, 요청은 해당 포트를 통해 **Worker 노드**로 전달되고, **kubelet**은 파드로 요청을 라우팅한다.

#### 요약: 통신 흐름
1. **kubectl 배포 요청** → **API 서버(`6443` 포트)**.
2. **API 서버가 etcd에 상태 업데이트** (`2379` 포트).
3. **스케줄러(kube-scheduler)**가 적절한 **Worker 노드**를 선택 (`10259` 포트).
4. **API 서버가 선택된 Worker 노드의 kubelet에 파드 생성 명령** (`10250` 포트).
5. **Worker 노드의 kubelet**이 **파드 상태를 API 서버로 보고** (`10250` 포트).
6. **NodePort 서비스**를 통해 외부 사용자가 **Worker 노드**의 애플리케이션에 접근 (`30000-32767` 포트).

> 흐름을 생각해서, 방화벽 In, Out을 고려해야 한다.

### 컨트롤 플레인 서버(Master 서버)에 방화벽 추가
> 로컬 호스트 통신에 컨트롤 플레인 내부에서 다 방화벽을 오픈할 필요는 없지만, 편의를 위해서 다 오픈합니다.

```shell
[root@localhost ~]# firewall-cmd --permanent --add-port={6443,2379,2380,10250,10259,10257}/tcp
success
[root@localhost ~]# firewall-cmd --reload
success
[root@localhost ~]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: enp0s3
  sources:
  services: cockpit dhcpv6-client ssh
  ports: 22/tcp 6443/tcp 2379/tcp 2380/tcp 10250/tcp 10259/tcp 10257/tcp
  protocols:
  forward: no
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

### 워커 서버에 방화벽 추가

```shell
firewall-cmd --permanent --add-port=10250/tcp
firewall-cmd --add-port=30000-32767/tcp --permanent
firewall-cmd --reload

[root@localhost ~]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: enp0s3
  sources:
  services: cockpit dhcpv6-client ssh
  ports: 22/tcp 10250/tcp 30000-32767/tcp
  protocols:
  forward: no
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

***

## 스왑 비활성화:

스왑을 하게 될 경우에는 안정적인 동작을 보장하지 않는다고 합니다.(논쟁적, 공식문서보다는 Discussion에 있는듯.)

- 일시적으로 스왑 비활성화

```shell
swapoff -a
```

- 영구적으로 비활성화
> 일시적 다음에, 영구적으로 설정을 하면 될 듯.

```shell
# 열기
vi /etc/fstab

#
# /etc/fstab
# Created by anaconda on Mon Oct 14 02:07:12 2024
#
# Accessible filesystems, by reference, are maintained under '/dev/disk/'.
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info.
#
# After editing this file, run 'systemctl daemon-reload' to update systemd
# units generated from this file.
#
/dev/mapper/rl-root     /                       xfs     defaults        0 0
UUID=bdd69149-c218-46ff-a880-5e4aabc970d6 /boot                   xfs     defaults        0 0
# /dev/mapper/rl-swap     none                    swap    defaults        0 0


# 시스템 설정 반영
systemctl daemon-reload
```
> `/dev/mapper/r1-swap` 파트를 주석처리를 진행한다.

***

## 커널 설정:

### 커널 매개변수 설정

- [공식문서 - 'Enable IPv4 packet forwarding'](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)

```shell
cat <<EOF | tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
```
> `sysctl.d` 경로는 커널 매개변수를 설정하고 시스템에 적용하는 설정을 하는 곳이다.<br>
> 쿠버네티스를 사용하는데, 참고해야 할 매개 변수들을 위와 같이 설정한다. 

- 설정 적용

```shell
# reboot 없이 적용
sysctl --system

# 값 확인
sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 1
```

### 커널 모듈 등록

```shell

tee /etc/modules-load.d/containerd.conf <<EOF
overlay
br_netfilter
EOF
overlay
br_netfilter

# 모듈 즉시 로드
modprobe overlay
modprobe br_netfilter

# 동작 확인

lsmod | grep overlay
lsmod | grep br_netfilter


```
> `overlay, br_netfilter` 모듈은 리눅스 기본 배포판에서 내장되어 있는 모듈입니다. 해당 명령어를 통해 실행만 시켜줍니다.

***

## SELinux 설정

쿠버네티스와 컨테이너 런타임이 잘 통신되기 위해서

```shell
setenforce 0
sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
```
