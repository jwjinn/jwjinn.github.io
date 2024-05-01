---
title: 파티션
description: 
author: joo
date: 24-05-01
categories: [Kafka, Chapter3]
tags: [kafka, Data, Engineering]
pin: true
math: true
mermaid: true

---
키의 역할은 크게 

1. 그 자체로 메시지에 저장되는 추가적인 정보입니다.

2. 토픽에 속한 여러 개의 파티션 중 해당 메시지가 저장될 파티션을 결정짓는 기준점입니다.

> 그래서, 같은 키값을 가진 메시지는 같은 파티션에 저장이 됩니다.

지금까지 우리가 'ProducerRecord' 객체를 생성할 때를 봅시다.

```java

ProducerRecord<String, String> record = new ProducerRecord<>("Customer3", "Biomeidcal Materials", "USA");
```
> 토픽, 키, 밸류의 값을 포함합니다.

물론, 키 값이 없는 레코드도 생성가능합니다.

```java

ProducerRecord<String, String> record = new ProducerRecord<>("Customer3", "USA");

```

## 키 값이 null일 경우

현재 사용 가능한 토픽의 파티션 중 하나에 랜덤하게 저장됩니다.

각 파티션별로 자장되는 메시지 개수의 균형을 맞추기 위해, 접착성 처리를 하기 위해, 라운드 로빈 알고리즘이 사용됩니다.

## 접착성 처리란?