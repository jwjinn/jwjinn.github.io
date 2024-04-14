---
title: 카프카 설치와 메시지 보내기 - 2:2
description: 카프카를 설치하고 간단한 메시지를 보내고 읽어봅시다.
author: joo
date: 24-04-07
categories: [Kafka, Chapter2]
tags: [kafka, Data, Engineering]
pin: true
math: true
mermaid: true

---

## 카프카 다운
https://kafka.apache.org/downloads

![](https://jwjinn.github.io/assets/img/kafka/2024-04-12-11-30-23.png)

> - Binary downloads: 바로 설치, 실행 가능. 일반적인 선택
> - Source downloads: 소스 코드, 커스터마이징은 가능하지만, 컴파일 과정이 있다.
{: .prompt-tip }

## 카프카 설치과정

### JAAV_HOME 설정
![](https://jwjinn.github.io/assets/img/kafka/2024-04-12-15-49-24.png)
> 카프카에서 JAVA 경로에 대한 추가적인 설정을 가지지는 않습니다.
현재 로그인한 계정의 환경 변수가 있는 곳인 .bash_profile에서 `JAVA_HOME` 변수를 읽으면서 필요한 JDK를 이용하게 됩니다.

### 압축해제 경로와 로그 수집용 폴더 경로.

압축 해제 경로: `/home/jwjin/kafka/local`{: .filepath}.
![](https://jwjinn.github.io/assets/img/kafka/2024-04-12-14-28-37.png)

로그 수집용 경로: `/home/jwjin/kafka/tmp`{: .filepath}.
![](https://jwjinn.github.io/assets/img/kafka/2024-04-12-15-24-23.png)

### 설정을 하자.


카프카 설정 파일 위치: `/home/jwjin/kafka/local/kafka/config/server.properties`{: .filepath}.

해당 위치에 카프카의 기본적인 설정을 확인할 수 있습니다.

#### 1. kafka 리스너 포트 변경
![](https://jwjinn.github.io/assets/img/kafka/2024-04-12-15-36-09.png)
> 기본 포트: '9092'에서 '17631'로 변경했습니다.

#### 2. 로그 경로 변경
![](https://jwjinn.github.io/assets/img/kafka/2024-04-12-15-37-26.png)
> 카프카 로그 수집용으로 만들었던 디렉토리 경로를 입력합니다.

#### 3. 주키퍼 접속 포트 변경
![](https://jwjinn.github.io/assets/img/kafka/2024-04-12-15-38-45.png)
> 이전에 zookeeper에서 설정했던, zookeeper client port로 변경합니다.

## 실행

### 주키퍼 실행

```shell
# 주키퍼가 설치되어 있는 곳에서
./zkServer.sh

```

### 카프카 실행

```shell

./kafka-server-start.sh -daemon /home/jwjin/kafka/kafkaConfig/server.properties

```
> 'kafkaConfig' 라는 이름의 심볼릭 링크를 카프카 설정 파일이 있는 곳이랑 연결했습니다.
{: .prompt-info }

### 토픽의 생성과 확인

```shell

# 토픽 생성
[jwjin@dms156 kafkaBin]$ ./kafka-topics.sh --bootstrap-server localhost:17631 -create -replication-factor 1 -partitions 1 --topic test
Error while executing topic command : Topic 'test' already exists.
# 이전에 이미 만들었으므로 에러가 떠 있습니다. 문제될 것은 없습니다.

```

```shell
# 토픽 확인
[jwjin@dms156 kafkaBin]$ ./kafka-topics.sh --bootstrap-server localhost:17631 --describe --topic test
Topic: test     TopicId: Vp1yGiF1QA-LM_YsR7aVyA PartitionCount: 1       ReplicationFactor: 1    Configs:
        Topic: test     Partition: 0    Leader: 0       Replicas: 0     Isr: 0


```

### 토픽에 메시지를 쓰고 읽자.
```shell
# test 토픽에서 메시지를 쓰자.

[jwjin@dms156 kafkaBin]$ ./kafka-console-producer.sh --bootstrap-server localhost:17631 --topic test
>Test Message 1
>Test Message 2



```

```shell
# test 토픽에 메시지를 읽자.

[jwjin@dms156 kafkaBin]$ ./kafka-console-consumer.sh --bootstrap-server localhost:17631 --topic test --from-beginning
Test Message 1
Test Message 2

```