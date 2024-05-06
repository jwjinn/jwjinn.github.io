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

물론, 키 값이 없는 레코드도 생성 가능합니다.

```java

ProducerRecord<String, String> record = new ProducerRecord<>("Customer3", "USA");

```

## 키 값이 null일 경우

현재 사용 가능한 토픽의 파티션 중 하나에 랜덤하게 저장됩니다.

각 파티션별로 자장되는 메시지 개수의 균형을 맞추기 위해 그리고 접착성 처리를 하기 위해, 라운드 로빈 알고리즘이 사용됩니다.

## 접착성 처리란?
상황을 상상하면 접착성 처리의 필요성을 알게 될 수 있습니다.

0, 3 레코드는 키 값이 있다고 가정 합니다.

나머지 1,2,4,5,6,7,8,9 레코드는 키가 없다고 한다면

- 접착성이 없는 경우:
> 모든 파티션에 골고루 레코드가 들어가게 됩니다.

- 접착성이 있는 경우:
> 우선 키 값이 있는 메시지가 우선적으로 파티션에 들어가게 되고,<br>
> 키 값이 없는 메시지가 따라서 붙게 됩니다.<br>

> 그렇게 된다면, 키가 있는 메시지는 특정된 파티션에 배치가 되고, 키가 없는 메시지는 특정된 파티션에 우선적으로 배치되게 됩니다.
{: .prompt-tip }

### 장점:
데이터를 요청을 하는 단위는 파티션입니다.

최대한 적은 파티션을 사용하므로, 요청수가 적게 되고

브로커로 보낼 수 있는 메시지의 한도를 최대한 활용해서 보내게 됩니다.

## 키 값 기준으로 파티션을 하게 되면 발생할 수 있는 문제점

키 값이 있으면, 동일 파티션에 메시지가 배치되게 됩니다.

따라서, 파티션을 선택을 할 때는 토픽의 모든 파티션을 대상으로 선택하게 됩니다.

> 보통은 가용 가능한 파티션을 선택하게 되지만, 특정 파티션에 메시지가 들어가야 하므로...

그래서, 발생할 수 있는 문제점은 특정한 파티션에 장애가 발생한다면, 데이터를 보내고 읽을 수 없는 에러가 발생할 수 있습니다.

## 카프카 클라이언트 파티셔너의 활용
> 카프카 클라이언트 파티셔너는<br>
> - RoundRobinPartitioner<br>
> - UniformStickyPartitoner

기본적으로 해당 파티셔너들은 컨슈머쪽 애플리케이션에서 키 값이 중요한 경우 활용이 됩니다.

예를 들면,

> 관계형 DB로 보낼때, 카프카의 레코드의 키 값을 기본키로 사용하는 ETL Application.

단점 또한 존재합니다.

key 분포가 불균형해서, 특정한 키 값을 가진 레코드가 많으면 작업 부하가 올라가게 됩니다.

> UniformStickyPartitioner를 사용하면, 해당 경우에도 전체 파티션에 대한 균등한 분포가 되도록 합니다.

## 키 값을 가지고 있는 메시지와 파티셔너 지정 관계

기본적으로 'A' 키 값을 가지고 있는 메시지는 파티션 'a'에 대응하게 됩니다.

그러나, 파티션이 추가될 경우 'A' 메시지는 다른 파티션에 메시지가 입력되게 됩니다.

> 파티션을 추가할 경우, 위치가 바뀔 수 있다는 것을 지각해야 합니다.
{: .prompt-info }



### 에러 모음

#### Producer 콘솔에서 확인
```shell

1
For Selling Apple Device partition chosen: 0
1
For Selling Apple Device partition chosen: 0
1
For Selling Apple Device partition chosen: 0
1
For Selling Apple Device partition chosen: 0
1
java.lang.ArithmeticException: / by zero
	at DzonPartitionerExample.BrandPartitioner.partition(BrandPartitioner.java:33)
	at org.apache.kafka.clients.producer.KafkaProducer.partition(KafkaProducer.java:1376)
	at org.apache.kafka.clients.producer.KafkaProducer.doSend(KafkaProducer.java:1010)
	at org.apache.kafka.clients.producer.KafkaProducer.send(KafkaProducer.java:947)
	at org.apache.kafka.clients.producer.KafkaProducer.send(KafkaProducer.java:832)
	at DzonPartitionerExample.KafkaExampleApplication.main(KafkaExampleApplication.java:46)

```
> 파티션 수가 여전히 1인 것으로 뜬다.

#### 서버에서 직접 확인

```shell

[jwjin@dms156 kafkaBin]$ ./kafka-topics.sh --bootstrap-server {외부IP} --describe --topic topic-1
Topic: topic-1  TopicId: UbcUcLcGSB-dbZ9jeqQqpQ PartitionCount: 1       ReplicationFactor: 1    Configs: segment.bytes=1073741824
        Topic: topic-1  Partition: 0    Leader: 0       Replicas: 0     Isr: 0

```
> 서버 상에서도 여전히 Partiton이 0인 것을 확인할 수 있습니다.


#### 그렇다면 콘솔 상에서 파티션을 5로 해서 할 경우에는?

```shell

[jwjin@dms156 kafkaBin]$ ./kafka-topics.sh --bootstrap-server {외부IP} -create -replication-factor 1 -partitions 5 --topic partitonTest
Created topic partitonTest.

```

```shell


[jwjin@dms156 kafkaBin]$ ./kafka-topics.sh --bootstrap-server {외부IP} --describe --topic partitonTest
Topic: partitonTest     TopicId: P6pwGRWISICWLm07xlEGSQ PartitionCount: 5       ReplicationFactor: 1    Configs: segment.bytes=1073741824
        Topic: partitonTest     Partition: 0    Leader: 0       Replicas: 0     Isr: 0
        Topic: partitonTest     Partition: 1    Leader: 0       Replicas: 0     Isr: 0
        Topic: partitonTest     Partition: 2    Leader: 0       Replicas: 0     Isr: 0
        Topic: partitonTest     Partition: 3    Leader: 0       Replicas: 0     Isr: 0
        Topic: partitonTest     Partition: 4    Leader: 0       Replicas: 0     Isr: 0


```
> 문제 없음. Producer 단의 설정 문제


#### server.propeties의 num.partition 수를 설정해보자.

```shell
# num.partitions=1
num.partitons = 5

```

#### Eclipse

```shell

For Selling Apple Device partition chosen: 0
5
For Selling Apple Device partition chosen: 0
5
For Selling Apple Device partition chosen: 0
5
For Selling Apple Device partition chosen: 0
5
For Selling Other Device partition chosen: 2
5
For Selling Other Device partition chosen: 2
5
For Selling Other Device partition chosen: 1
5
For Selling Other Device partition chosen: 1
5
For Selling Other Device partition chosen: 4
5
For Selling Other Device partition chosen: 4
5


```

> 동작은 하지만 일괄적으로 모든 토픽의 파티션이 5로 통일 됩니다.<br>
> 이것은 의도한 바가 아닙니다. 아래에서 Partitioner의 동작 원리와 파티셔너가 생성되지 않는 이유를 알아보겠습니다.
{: .prompt-warning }


## 파티셔너의 원리와 배경

- Partitioner 참고 사이트 : https://dzone.com/articles/kafkas-custom-partitioning-in-action

![](https://jwjinn.github.io/assets/img/kafka/2024-05-05-21-35-21.png)

> 현재 상황은 APPLE 제품에 대한 매출 증가(=트래픽의 증가)가 예측되므로<br>
> APPLE 제품을 통으로 하나의 파티션에 할당, 나머지는 2개의 파티션에 할당하도록 합니다.

### Package의 구조

![](https://jwjinn.github.io/assets/img/kafka/2024-05-05-21-50-12.png)

### Creating a Custom Partitioner Class
- Partitioner interface를 통해서, 커스텀 파티셔너를 만들 수 있습니다.

```java

package DzonPartitionerExample;

import java.util.List;
import java.util.Map;

import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;
import org.apache.kafka.common.InvalidRecordException;
import org.apache.kafka.common.PartitionInfo;
import org.apache.kafka.common.utils.Utils;

public class BrandPartitioner implements Partitioner{

	 private String brand;

	    @Override
	    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
	        int chosenPartition;

	        List<PartitionInfo> partitions = cluster.partitionsForTopic(topic);
	        int numPartitions = partitions.size();
	        
	        System.out.println(numPartitions);

	        if ((keyBytes == null) || (!(key instanceof String))) {
	            throw new InvalidRecordException("All messages should have a valid key");
	        }

	        if (((String) key).equalsIgnoreCase(brand)) {
	            chosenPartition = 0;
	        } else {
	        	chosenPartition = Utils.toPositive(Utils.murmur2(keyBytes)) % (numPartitions - 1) + 1;
	        }
	        System.out.println("For " + value + " partition chosen: " + chosenPartition);
	        return chosenPartition;
	    }

	    @Override
	    public void close() {

	    }

	    @Override
	    public void configure(Map<String, ?> map) {
	        brand = (String) map.get("partition.brand");
	    }

}

```

- partition(): actual partitioning logic을 쓰는 곳.

#### partition()

The Kafka Producer calls this method for every record with input parameters such as topic name, key, cluster objects.

The method returns the partition number as an integer value.

> topic, key, cluster object 와 같은 파라미터를 받아서, 파티션 번호를 리턴을 해주는 역할로 이해를 하면 됩니다.


1.  extract the information about the partitions of the topic using the `cluster` instance.

```java

List<PartitionInfo> partitions = cluster.partitionsForTopic(topic);
int numPartitions = partitions.size();

```

- cluster: Kafka 클러스터의 메타데이터를 포함하고 있는 객체입니다.

- cluster.partitionsForTopic(topic): 주어진 토픽에 대한 모든 파티션 정보를 반환합니다.
각 파티션의 ID, 리더 브로커, 복제된 브로커 등이 포함됩니다.

- `List<PartitionInfo>` partitions: 각 파티션에 대한 정보를 가지고 있습니다.


2. Next, we throw an exception if the key value is null. also check the type of key

```java

	        if ((keyBytes == null) || (!(key instanceof String))) {
	            throw new InvalidRecordException("All messages should have a valid key");
	        }

```

> 키 값이 있는지, 있다면 유효한지 확인하는 조건입니다.<br>
> 기본적으로 producer에서 broker로 메시지를 보낼 때는 byte 형태로 보내게 됩니다.

> 따라서, `keyBytes == null` 인지로 key의 유무를 파악하고 key가 String 객체인지 조건을 한번 더 걸어 확인합니다.

3. Moving on, we check if the key of the current record is 'apple'. If yes, we set the value of chosenPartition to 0. Basically, we are saying that for brand value 'apple', always use partition 0.

```java

	        if (((String) key).equalsIgnoreCase(brand)) {
	            chosenPartition = 0;
	        } else {
	        	chosenPartition = Utils.toPositive(Utils.murmur2(keyBytes)) % (numPartitions - 1) + 1;
	        }
	        System.out.println("For " + value + " partition chosen: " + chosenPartition);
	        return chosenPartition;

```

- `((String) key).equalsIgnoreCase(brand)` key 값이 대소문자를 구별하지 않고 brand와 동일하면 chosenPartition=0

- `Utils.murmur2(keyBytes)`: 임의의 바이트 배열을 32비트 정수 값으로 해싱을 합니다.

- `Utils.toPositive(Utils.murmur2(keyBytes))`: 해싱된 값이 음수일 수도 있으므로 해당 함수를 사용해서 양수 범위로 되도록 합니다.

-  `% (numPartitions - 1) + 1;`: 나머지는 전형적인 범위 설정하고 리턴하는 방식.

이처럼, 파티션 번호를 리턴할 수 있도록 하면 됩니다.

### Configuring the Kafka Producer

```java

public class KafkaExampleApplication {
	public static void main(String[] args) throws java.util.concurrent.TimeoutException {
		 // Kafka 브로커에 연결할 설정 추가
       Properties configs = new Properties();
       configs.put("bootstrap.servers", "{외부IP}"); // Kafka host 및 server 설정
       configs.put("acks", "all");                         // 자신이 보낸 메시지에 대해 카프카로부터 확인을 기다리지 않습니다.
       configs.put("block.on.buffer.full", "true");        // 서버로 보낼 레코드를 버퍼링 할 때 사용할 수 있는 전체 메모리의 바이트수
       configs.put("spring.kafka.producer.properties.security.protocol", "PLAINTEXT"); 
       configs.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");   // serialize 설정
       configs.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer"); // serialize 설정
       configs.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, BrandPartitioner.class);
       configs.put("partition.brand", "apple");
       
       
       // producer 생성
       KafkaProducer<String, String> producer = new KafkaProducer<String, String>(configs);

               
       
       // 토픽 생성 요청
       AdminClient adminClient = AdminClient.create(configs);
       
       String topicName = "topicTest7";
       
       try {
           NewTopic newTopic = new NewTopic(topicName, 3, (short) 1); // 이름, 파티션 수, 복제 팩터
           final CreateTopicsResult result = adminClient.createTopics(Collections.singletonList(newTopic));
           result.values().get(topicName).get(5, TimeUnit.SECONDS);
//         adminClient.createTopics(Collections.singletonList(newTopic));
    	   
       } catch (InterruptedException | ExecutionException | TimeoutException e) {
    	   e.printStackTrace();
       }
       
       
       
       try {
    	   for (int i = 0; i <= 20; i++) {
    		   if(i < 3) {
    			   ProducerRecord<String, String> apple = new ProducerRecord<String, String>(topicName, "apple", "Selling Apple Device");
    			   producer.send(apple);
    		   }
    		   else{
    			   ProducerRecord<String, String> samsung = new ProducerRecord<String, String>(topicName, "others_" + i, "Selling Other Device");
    			   producer.send(samsung);
    		   }
    	   }
       }catch(Exception e) {
    	   e.printStackTrace();
       }
       

       

       // 종료
       producer.flush();
       producer.close();

	}
}

```

#### 커스텀 파티셔너와 brand 값 등록.

```java

kafkaProps.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, BrandPartitioner.class);
kafkaProps.put("partition.brand", "apple");

```
> record를 보낼 때마다, 호출하는 것이므로 설정값에 등록을 해야 합니다.
> 어떤 키값을 기준으로 파티셔닝을 할 것 인지, 위처럼 직접 인자를 전달합니다.


#### 카프카 토픽 생성을 위한 트릭

```java

       try {
           NewTopic newTopic = new NewTopic(topicName, 3, (short) 1); // 이름, 파티션 수, 복제 팩터
           final CreateTopicsResult result = adminClient.createTopics(Collections.singletonList(newTopic));
           result.values().get(topicName).get(5, TimeUnit.SECONDS);
		   //         adminClient.createTopics(Collections.singletonList(newTopic));
    	   
       } catch (InterruptedException | ExecutionException | TimeoutException e) {
    	   e.printStackTrace();
       }

```

> 정확한 이유는 모르겠지만, 바로 토픽을 생성을 해버리면, 신규 토픽에 대한 설정값이 들어가지 못합니다.<br>
> 그리하여, `result.values().get(topicName).get(5, TimeUnit.SECONDS);` 해야 합니다.

> 예상 하기로는 기존의 `adminClient.createTopics(Collections.singletonList(newTopic));`으로 토픽생성은<br>
> 브로커에게 '토픽을 생성해라' -> '해당 토픽의 설정은' 이렇게 되니, 이미 생성된 토픽에 설정을 해서 의도 대로 파티션의 설정이 되지 않는 듯 합니다.
{: .prompt-info }