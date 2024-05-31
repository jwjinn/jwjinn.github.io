---
title: 카프카 컨슈머 설정 파악하기
description: 카프카를 컨슈머들의 설정들을 파악합니다.
author: joo
date: 24-05-31
categories: [Kafka, Chapter4]
tags: [kafka, Data, Engineering]
pin: true
math: true
mermaid: true

---
카프카 컨슈머를 설정하는 대표적인 설정값 몇개만 파악을 해보고자 합니다.

## fetch.min.bytes

브로커가 컨슈머로부터 레코드 요청을 받았는데 새로 보낼 레코드의 양이 `fetch.min.bytes`보다 작을 경우, 브로커는 충분한 메시지를 보낼 수 있을 때까지 기다린 뒤 컨슈머에게 레코드를 보내줍니다.

### 예를 들면
- 당장 broker가 보낼 수 있는 메시지가 8이고, 해당 설정값이 10이라면
- 브로커는 10까지 기다리고 메시지를 전송합니다.

부하를 낮추기 위해서 설정하지만, 만약 처리량 자체가 적은 상태에서

해당 값이 클 경우에는 지연 또한 증가한다는 점을 알아두셔야 합니다.

## fetch.max.wait.ms
- 카프카가 컨슈머에게 응답하기 전, 충분한 데이터가 모일 때까지 기다리도록 하는 시간 설정 값.

- fetch.max.wait.ms 만큼은 기다려라.

### 위 두 조건이 둘 다 설정되어 있을 경우

- fetch.max.wait.ms, fetch.min.bytes 위 두 값 중에 하나가 만족되면, 바로 메시지를 전송합니다.

## fetch.max.bytes
- 컨슈머가 브로커를 폴링할 때, 카프카가 리턴하는 최대 바이트 수
- fetch.min.bytes는 메시지의 크기에 대한 설정
- fetch.max.bytes는 polling 그 자체의 바이트 수에 관심을 갖는다.

- polling 그 자체의 크기를 보기 때문에, 컨슈머가 서버로부터받은 데이터를 저장하기 위해 사용하는 메모리의 양을 제한하기 위해 사용합니다.

- fetch.max.bytes라는 설정이 broker에 이미 들어가 있어서 참고해서 레코드 배치를 보내줍니다.

## max.poll.records
- poll()을 호출할때의 리턴 되는 최대 레코드 수

## max.partition.fetch.bytes
- 파티션별로 리턴하는 최대 바이트를 설정하고 싶을 경우 설정합니다.
- 그러나 권장되지는 않으며 `fetch.max.bytes` 설정을 하는 것을 추천합니다.

## session.timeout.ms / heartbeat.interval.ms 

### session.timeout.ms
- 그룹 코디네이터가 하트비트를 기다릴 최대시간

### heartbeat.interval.ms
- 컨슈머가 얼마나 자주 heartbeat 센서를 보내는가

### 보통 1/3

- session.timeout.ms: 3초
- heartbeat.interval.ms: 1초

> "리밸런스 때문에"

## max.poll.interval.ms

- 폴링을 하지 않고도 죽은 것으로 판정되지 않을 최대 시간

### heartbeat 설정이 있는 데도 하는 이유

- heartbeat: 백그라운드 스레드를 통해서 하트비트를 전송을 하는 죽은 컨슈머를 찾기 위한 주된 메커니즘

- poll(): 메인스레드에서 동작중.

### 만약에
메인 스레드만 LOCK 걸리고 백그라운드 스레드는 문제가 없다면 HEARTBEAT는 제대로 동작 중이기에 파티션이 리밸런싱이 되지 않을 겁니다.

그래서, 해당 설정을 혹시 모를 상황을 위해서 하게 됩니다.

### 설정 조언
- 크게: 정상 동작 중인 컨슈머가 도달되지 않을 정도로

- 작게: 정지된 컨슈머의 영향이 크기 않도록

- 기본값: 5분

