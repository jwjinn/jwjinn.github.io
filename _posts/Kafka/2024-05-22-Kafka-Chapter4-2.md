---
title: 카프카 컨슈머의 생성하기
description: 카프카를 컨슈머를 생성하는 방법을 알아보자.
author: joo
date: 24-05-30
categories: [Kafka, Chapter4]
tags: [kafka, Data, Engineering]
pin: true
math: true
mermaid: true

---

## 첫 단계는 KafkaConsumer 인스턴스의 생성

- Java Properties 객체 생성 후 -> kafkaConsumer 객체에 전달하는 방식입니다.

### 반드시 지정해야 하는 설정

- bootstrap.servers

- key.deserializer, value.deserializer
> 바이트 배열을 자바 객체로 변경합니다.

- 반드시는 아니지만 group.id

> KafkaConsumer 인스턴스가 속하는 컨슈머 그룹을 지정합니다.

### 카프카 컨슈머를 생성하는 가장 간단한 방법

```java

        Properties configs = new Properties();
        configs.put("bootstrap.servers", "{외부IP}:17633"); // Kafka host 및 server 설정
        configs.put("group.id", "NewCountryCounter"); // 새로운 컨슈머 그룹 사용
        configs.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        configs.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        configs.put("auto.offset.reset", "earliest"); // Earliest offset부터 읽기
        configs.put("enable.auto.commit", "true"); // 자동 오프셋 커밋

        // Consumer 생성
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(configs);

```
- 이렇게 필요한 설정을 넣고 객체를 생성하면 됩니다.

## 토픽 구독하기

### 하나의 토픽을 구독하는 예시

```java

consumer.subscribe(Collections.singletonList("producerTest2"));

```

### 정규식으로 구독하는 예시

```java
consumer.subscribe(Pattern.compile("test.*"));

```
## 폴링 루프

```java

Duration timeout = Duration.ofMillis(100);
        
        HashMap<String, Integer> custCountryMap = new HashMap<>();
        
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(timeout);
            
            if (records.isEmpty()) {
                System.out.println("No records found");
                continue;
            }
            
            for (ConsumerRecord<String, String> record : records) {
                System.out.printf("topic = %s, partition = %d, offset = %d, customer = %s, country = %s%n",
                        record.topic(), record.partition(), record.offset(), record.key(), record.value());
                
                int updatedCount = 1;
                
                if (custCountryMap.containsKey(record.value())) {
                    updatedCount = custCountryMap.get(record.value()) + 1;
                }
                custCountryMap.put(record.value(), updatedCount);
                
                JSONObject json = new JSONObject(custCountryMap);
                System.out.println(json.toString());
            }

```

### 1. 무한 루프
- 기본적으로 무한루프이기에 종료가 되지 않습니다.

### 2. cosumer.poll(timeout)
```java

ConsumerRecords<String, String> records = consumer.poll(timeout);

```
- 컨슈머가 계속 polling 하지 않으면 죽은 것으로 간주되어 이 컨슈머가 읽어오고 있던 파티션들은 그룹 내의 다른 컨슈머에게 넘어가게 됩니다.

- 이때, poll()에 전달되는 매개변수는 컨슈머 버퍼에 데이터가 없을 경우 poll()이 블록될 수 있는 최대 시간을 결정합니다.

1. 만약 이 값이 0으로 지정되거나

2. 버퍼 안에 이 레코드가 준비되어 있을 경우 poll()은 즉시 리턴됩니다.

#### 2번 이유:

- 버퍼에 데이터가 없다.

- while문으로 계속 루프를 돌리고 있는 데, 버퍼에 데이터가 없다는 것은 이미 Partition에 있는 데이터를
- 다 뽑아왔다고 이해할 수 있습니다.
- 따라서 해당 매개변수 시간만큼 poll을 블록합니다.


## 전체 코드 설명

```java

package Chapter4;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.json.JSONObject;

import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.Properties;

public class consumer2 {

    public static void main(String[] args) {
        // Kafka 브로커에 연결할 설정 추가
        Properties configs = new Properties();
        configs.put("bootstrap.servers", "{외부IP}:17633"); // Kafka host 및 server 설정
        configs.put("group.id", "NewCountryCounter"); // 새로운 컨슈머 그룹 사용
        configs.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        configs.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        configs.put("auto.offset.reset", "earliest"); // Earliest offset부터 읽기
        configs.put("enable.auto.commit", "true"); // 자동 오프셋 커밋

        // Consumer 생성
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(configs);
        
        consumer.subscribe(Collections.singletonList("producerTest2"));
       
        Duration timeout = Duration.ofMillis(100);
        
        HashMap<String, Integer> custCountryMap = new HashMap<>();
        
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(timeout);
            
            if (records.isEmpty()) {
                System.out.println("No records found");
                continue;
            }
            
            for (ConsumerRecord<String, String> record : records) {
                System.out.printf("topic = %s, partition = %d, offset = %d, customer = %s, country = %s%n",
                        record.topic(), record.partition(), record.offset(), record.key(), record.value());
                
                int updatedCount = 1;
                
                if (custCountryMap.containsKey(record.value())) {
                    updatedCount = custCountryMap.get(record.value()) + 1;
                }
                custCountryMap.put(record.value(), updatedCount);
                
                JSONObject json = new JSONObject(custCountryMap);
                System.out.println(json.toString());
            }
        }
    }
}



```

### 컨슈머 그룹과 오프셋 확인
- 컨슈머 그룹이 처음 실행되는 경우, 기본 오프셋 설정부터 확인합니다.
- 즉, 기존에 실행되는 컨슈머 그룹이 있다면, 기존 토픽의 마지막 메시지부터 읽게 됩니다.

### 테스트 용으로 적합하게 수정할려면

```java

configs.put("group.id", "NewCountryCounter-" + UUID.randomUUID().toString()); // 새로운 임시 컨슈머 그룹 사용

```
- 이런 식으로 매 컨슈머 그룹명을 바꾸던가

```shell

kafka-consumer-groups.sh --bootstrap-server {외부IP}:17633 --group NewCountryCounter3 --topic producerTest2 --reset-offsets --to-earliest --execute


```
- shell에서 직접 offset을 초기화하는 식으로 해야. 일일이 컨슈머 그룹 명을 바꾸는 수고로움을 덜 듯합니다.