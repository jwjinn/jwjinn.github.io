---
title: 카프카 프로듀서 만들어보기
description: Spring boot를 활용해서 카프카의 프로듀서를 만들어보겠습니다.
author: joo
date: 24-04-18

categories: [Kafka, Chapter3]
tags: [kafka, Data, Engineering]
pin: true
math: true
mermaid: true

---

## 카프카 프로듀서 생성하기

> 앞으로 책에 있는 내용인 Producer, Consumer를 따라 하기 위해서는 미리 한번 만들어 보는 것이 좋다고 생각했습니다.

- 간단하게 따라한: https://webfirewood.tistory.com/153
- 공식 Docs: https://docs.spring.io/spring-kafka/reference/quick-tour.html
https://webfirewood.tistory.com/153

### 이클립스 스프링 부트에서 카프카 프로듀서를 생성하기

![](https://jwjinn.github.io/assets/img/kafka/2024-04-23-17-21-56.png)
- Type: grade로 Spring boot를 만들었습니다.

### 의존성 추가
![](https://jwjinn.github.io/assets/img/kafka/2024-04-18-15-03-48.png)

`build.gradle`파일에 `dependencies`에 `implementation 'org.springframework.kafka:spring-kafka'`를 추가합니다.

### Refresh Gradle project를 하지 않으면 error가 나옵니다.
![](https://jwjinn.github.io/assets/img/kafka/2024-04-18-15-22-03.png)
> 의존성을 추가 했지만, Spring boot에 적용되지 않아 Error가 발생하고 있습니다.

### Refresh하는 법
`패키지이름` -> `우클릭` -> `gradle` -> `Refresh Gradle project`

![](https://jwjinn.github.io/assets/img/kafka/2024-04-18-15-29-43.png)

### Producer 생성
> 지금 이 과정은 에러를 찾고 수정하는 과정입니다. 결론을 알고 싶다면 밑으로 내려주세요.
{: .prompt-danger }

![](https://jwjinn.github.io/assets/img/kafka/2024-04-23-14-53-51.png)

```java

package kafka;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Collections;
import java.util.Properties;

public class producer2 {

	public static void main(String[] args) {
		 // Kafka 브로커에 연결할 설정 추가
        Properties configs = new Properties();
        configs.put("bootstrap.servers", "{외부IP}:17633"); // Kafka host 및 server 설정
        configs.put("acks", "all");                         // 자신이 보낸 메시지에 대해 카프카로부터 확인을 기다리지 않습니다.
        configs.put("block.on.buffer.full", "true");        // 서버로 보낼 레코드를 버퍼링 할 때 사용할 수 있는 전체 메모리의 바이트수
        configs.put("spring.kafka.producer.properties.security.protocol", "PLAINTEXT"); 
        configs.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");   // serialize 설정
        configs.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer"); // serialize 설정


        // producer 생성
        KafkaProducer<String, String> producer = new KafkaProducer<String, String>(configs);

                
        
        // 토픽 생성 요청
        AdminClient adminClient = AdminClient.create(configs);
        NewTopic newTopic = new NewTopic("test5555", 1, (short) 1); // 이름, 파티션 수, 복제 팩터
        adminClient.createTopics(Collections.singletonList(newTopic));

        // message 전달
        for (int i = 0; i < 5; i++) {
            String v = "hello"+i;
            producer.send(new ProducerRecord<String, String>("test5555", v));
        }

        // 종료
        producer.flush();
        producer.close();

	}

}

```
> topic = test5555로 message를 전달하고 있습니다.

#### 에러 발생

```text
16:33:11.182 [kafka-producer-network-thread | producer-1] WARN org.apache.kafka.clients.NetworkClient -- [Producer clientId=producer-1] Error connecting to node nethru.xyz:17631 (id: 0 rack: null)
java.net.UnknownHostException: nethru.xyz

```
> Spring Boot에서 실행을 할 때, 위와 같은 에러가 Console 창에서 뜨고 있습니다. 
> UnknownHost 오류가 발생하고 있습니다. 처음에 드는 생각은 kafka의 `server.propereties`의 설정이 제일 의심됩니다.

#### server.properties 수정
![](https://jwjinn.github.io/assets/img/kafka/2024-04-18-16-47-38.png)

#### Kafka가 실행이 안된다.

![](https://jwjinn.github.io/assets/img/kafka/2024-04-18-16-49-31.png)

```shell
[2024-04-18 16:47:51,556] ERROR Exiting Kafka due to fatal exception (kafka.Kafka$)
java.lang.IllegalArgumentException: Error creating broker listeners from 'PLAINTEXT://:17631,EXTERNAL://61.33.35.131:17631': No security protocol defined for listener EXTERNAL
        at kafka.utils.CoreUtils$.listenerListToEndPoints(CoreUtils.scala:243)
        at kafka.server.KafkaConfig.listeners(KafkaConfig.scala:2177)
        at kafka.server.KafkaConfig.<init>(KafkaConfig.scala:1845)
        at kafka.server.KafkaConfig.<init>(KafkaConfig.scala:1639)
        at kafka.Kafka$.buildServer(Kafka.scala:71)
        at kafka.Kafka$.main(Kafka.scala:90)
        at kafka.Kafka.main(Kafka.scala)
Caused by: java.lang.IllegalArgumentException: No security protocol defined for listener EXTERNAL
        at kafka.cluster.EndPoint$.$anonfun$createEndPoint$2(EndPoint.scala:49)
        at scala.collection.immutable.Map$Map4.getOrElse(Map.scala:548)
        at kafka.cluster.EndPoint$.securityProtocol$1(EndPoint.scala:49)
        at kafka.cluster.EndPoint$.createEndPoint(EndPoint.scala:57)
        at kafka.utils.CoreUtils$.$anonfun$listenerListToEndPoints$10(CoreUtils.scala:240)
        at scala.collection.StrictOptimizedIterableOps.map(StrictOptimizedIterableOps.scala:100)
        at scala.collection.StrictOptimizedIterableOps.map$(StrictOptimizedIterableOps.scala:87)
        at scala.collection.mutable.ArraySeq.map(ArraySeq.scala:35)
        at kafka.utils.CoreUtils$.listenerListToEndPoints(CoreUtils.scala:240)

```
> `No security protocol defined for listener EXTERNAL`의 원인으로 실행이 안되고 있습니다.

#### Kafka가 실행이 안되는 원인
- port는 중복이 되면 안된다.
- 외부 접속을 할 경우, `security.protocol.map` 설정을 해야 합니다.

```shell

listeners=PLAINTEXT://:17631,EXTERNAL://0.0.0.0:17633
listener.security.protocol.map=PLAINTEXT:PLAINTEXT,EXTERNAL:PLAINTEXT

```
> 다행이도 카프카는 실행이 됩니다.

> 실행은 되지만, 방법이 틀렸습니다. 정확한 방법은 `LISTENERS VS ADVERTISED_LISTENERS` 글을 참고해야 합니다. https://jwjinn.github.io/posts/Kafka-Info-1/
> 기본적으로 client와 통신이 되지 않는 것은 client에 broker에 대한 메타데이터가 제대로 전달되지 않았기 때문입니다. 메타데이터 제공 위치에 대한 설정이 `ADVERTISED_LISTENERS`입니다. 
{: .prompt-info }


#### advertised.listerner 수정해볼까?

```shell
# 추가
advertised.listeners=PLAINTEXT://{외부IP}:17633

```
##### 결과

```shell

[2024-04-19 09:29:23,112] INFO [Controller id=0, targetBrokerId=0] Node 0 disconnected. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 09:29:23,112] WARN [Controller id=0, targetBrokerId=0] Connection to node 0 (/{외부IP}:17633) could not be established. Node may not be available. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 09:29:23,113] INFO [Controller id=0, targetBrokerId=0] Client requested connection close from node 0 (org.apache.kafka.clients.NetworkClient)
^C[2024-04-19 09:29:23,123] INFO Terminating process due to signal SIGINT (org.apache.kafka.common.utils.LoggingSignalHandler)

```
> 위 로그가 많이 뜹니다. `advertised.listeners` 만 쓰는 것은 아닌 듯 합니다.

#### advertised.listener 수정2

```shell
listeners=PLAINTEXT://0.0.0.0:17633
advertised.listeners=PLAINTEXT://{외부IP}:17633

```

```shell
[2024-04-19 14:46:48,977] WARN [Controller id=0, targetBrokerId=0] Connection to node 0 (/{외부IP}:17633) could not be established. Node may not be available. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:48,977] INFO [Controller id=0, targetBrokerId=0] Client requested connection close from node 0 (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,078] INFO [Controller id=0, targetBrokerId=0] Node 0 disconnected. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,078] WARN [Controller id=0, targetBrokerId=0] Connection to node 0 (/{외부IP}:17633) could not be established. Node may not be available. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,078] INFO [Controller id=0, targetBrokerId=0] Client requested connection close from node 0 (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,179] INFO [Controller id=0, targetBrokerId=0] Node 0 disconnected. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,179] WARN [Controller id=0, targetBrokerId=0] Connection to node 0 (/{외부IP}:17633) could not be established. Node may not be available. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,180] INFO [Controller id=0, targetBrokerId=0] Client requested connection close from node 0 (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,269] INFO [Admin Manager on Broker 0]: Error processing create topic request CreatableTopic(name='quickstart-events', numPartitions=1, replicationFactor=1, assignments=[], configs=[]) (kafka.server.ZkAdminManager)
org.apache.kafka.common.errors.InvalidReplicationFactorException: Replication factor: 1 larger than available brokers: 0.
[2024-04-19 14:46:49,281] INFO [Controller id=0, targetBrokerId=0] Node 0 disconnected. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,281] WARN [Controller id=0, targetBrokerId=0] Connection to node 0 (/{외부IP}:17633) could not be established. Node may not be available. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,281] INFO [Controller id=0, targetBrokerId=0] Client requested connection close from node 0 (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,382] INFO [Controller id=0, targetBrokerId=0] Node 0 disconnected. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,382] WARN [Controller id=0, targetBrokerId=0] Connection to node 0 (/{외부IP}:17633) could not be established. Node may not be available. (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,383] INFO [Controller id=0, targetBrokerId=0] Client requested connection close from node 0 (org.apache.kafka.clients.NetworkClient)
[2024-04-19 14:46:49,412] INFO [Admin Manager on Broker 0]: Error processing create topic request CreatableTopic(name='quickstart-events', numPartitions=1, replicationFactor=1, assignments=[], configs=[]) (kafka.server.ZkAdminManager)
org.apache.kafka.common.errors.In


```
> 이 방향성은 맞는 듯하다.
> 그러나, 브로커 에러가 발생함. 새로운 브로커가 없다고 한다.

> 해당 오류가 발생했던 이유는 내가 서버의 외부 IP를 잘못 입력했기 때문입니다.
> 아마 자체적으로 advertised.listeners 값을 검증을 하는 과정을 거치는 듯 합니다. 자체적으로 MetaData를 통해서 node를 찾지 못해서 생긴 오류입니다.
> 해당 오류는 정확한 외부IP 입력을 통해서 해결했습니다.
{: .prompt-info }


### Producer 실행 결과

#### Spring

```java

package kafka;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Collections;
import java.util.Properties;

public class producer2 {

	public static void main(String[] args) {
		 // Kafka 브로커에 연결할 설정 추가
        Properties configs = new Properties();
        configs.put("bootstrap.servers", "{외부IP}:17633"); // Kafka host 및 server 설정
        configs.put("acks", "all");                         // 자신이 보낸 메시지에 대해 카프카로부터 확인을 기다리지 않습니다.
        configs.put("block.on.buffer.full", "true");        // 서버로 보낼 레코드를 버퍼링 할 때 사용할 수 있는 전체 메모리의 바이트수
        configs.put("spring.kafka.producer.properties.security.protocol", "PLAINTEXT"); 
        configs.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");   // serialize 설정
        configs.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer"); // serialize 설정

        
        // producer 생성
        KafkaProducer<String, String> producer = new KafkaProducer<String, String>(configs);             
        
        // 토픽 생성 요청
        AdminClient adminClient = AdminClient.create(configs);
        NewTopic newTopic = new NewTopic("producerTest1", 1, (short) 1); // 이름, 파티션 수, 복제 팩터
        adminClient.createTopics(Collections.singletonList(newTopic));

        // message 전달
        for (int i = 0; i < 5; i++) {
            String v = "hello"+i;
            producer.send(new ProducerRecord<String, String>("producerTest1", v));
        }

        // 종료
        producer.flush();
        producer.close();

	}

}


```

##### Ecplise 콘솔창 화면

```shell
16:31:26.594 [main] INFO org.apache.kafka.clients.admin.AdminClientConfig -- These configurations '[block.on.buffer.full, value.serializer, acks, spring.kafka.producer.properties.security.protocol, key.serializer]' were supplied but are not used yet.
16:31:26.595 [main] INFO org.apache.kafka.common.utils.AppInfoParser -- Kafka version: 3.6.1
16:31:26.595 [main] INFO org.apache.kafka.common.utils.AppInfoParser -- Kafka commitId: 5e3c2b738d253ff5
16:31:26.595 [main] INFO org.apache.kafka.common.utils.AppInfoParser -- Kafka startTimeMs: 1713857486595
16:31:26.899 [kafka-producer-network-thread | producer-1] WARN org.apache.kafka.clients.NetworkClient -- [Producer clientId=producer-1] Error while fetching metadata with correlation id 1 : {producerTest1=UNKNOWN_TOPIC_OR_PARTITION}
16:31:26.901 [kafka-producer-network-thread | producer-1] INFO org.apache.kafka.clients.Metadata -- [Producer clientId=producer-1] Cluster ID: x1VBUZHzQf-B48WtMcq_Qw
16:31:27.021 [kafka-producer-network-thread | producer-1] INFO org.apache.kafka.clients.producer.internals.TransactionManager -- [Producer clientId=producer-1] ProducerId set to 11000 with epoch 0
16:31:27.122 [main] INFO org.apache.kafka.clients.producer.KafkaProducer -- [Producer clientId=producer-1] Closing the Kafka producer with timeoutMillis = 9223372036854775807 ms.
16:31:27.133 [main] INFO org.apache.kafka.common.metrics.Metrics -- Metrics scheduler closed
16:31:27.134 [main] INFO org.apache.kafka.common.metrics.Metrics -- Closing reporter org.apache.kafka.common.metrics.JmxReporter
16:31:27.134 [main] INFO org.apache.kafka.common.metrics.Metrics -- Metrics reporters closed
16:31:27.135 [main] INFO org.apache.kafka.common.utils.AppInfoParser -- App info kafka.producer for producer-1 unregistered

```

#### 서버에서 컨슈머를 통한 확인

```shell

[jwjin@dms156 kafkaBin]$ ./kafka-console-consumer.sh --bootstrap-server {외부IP}:17633 --topic producerTest1 --from-beginning
hello0
hello1
hello2
hello3
hello4


```

> 정상적으로 Producer를 통해서 데이터가 적재된 것을 확인할 수 있습니다.