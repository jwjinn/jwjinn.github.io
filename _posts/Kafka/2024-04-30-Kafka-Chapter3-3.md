---
title: 시리얼라이저
description: 시리얼라이저의 설정과 종류들을 살펴보자.
author: joo
date: 24-04-30
categories: [Kafka, Chapter3]
tags: [kafka, Data, Engineering]
pin: true
math: true
mermaid: true

---

기존에 Producer에서 사용한 시리얼라이저는 String 타입 시리얼라이저입니다.<br>
또한 카프카는 정숫값을 직렬화하는 데 사용하는 시리얼라이저, ByteArray에 사용되는 시리얼라이저 등을 포함하고 있습니다.

보시다시피, 이것만을 가지고는 모든 데이터를 직렬화하기에는 부족해보입니다.

# 3.5.1 커스텀 시리얼라이저
단순한 문자열이나 정숫값이 아닐 경우에는 두 가지의 선택값이 존재합니다.

1. 범용 직렬화 라이브러리

2. 커스텀 직렬화 로직의 사용

> 범용 직렬화 라이브러리를 사용하는 것이 매우 추천되지만, 이유를 경험해보기 위해서 실제로 구현을 해봅니다.


## Customer 클래스
```java

	public class Customer {
	private int customerID;
	private String customerName;
	
	public Customer(int ID, String name) {
		this.customerID = ID;
		this.customerName = name;
	}
	
	public int getID() {
		return customerID;
	}
	
	public String getName() {
		return customerName;
	}

}

```
>  간단하게 고객의 정보와 아이디, 이름을 리턴할 수 있는 클래스.


## CustomerSerializer
```java

package new_book;

import java.nio.ByteBuffer;

import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Serializer;


public class CustomerSerializer implements Serializer<Customer>{

	@Override
	public byte[] serialize(String topic, Customer data) {
		
		try {
			byte[] serializedName;
			int stringSize;
			if (data == null) {
				return null;
			}
			else {
				if (data.getName() != null) {
					serializedName = data.getName().getBytes("UTF-8");
					stringSize = serializedName.length;
				}
				else {
					serializedName = new byte[0];
					stringSize = 0;
				}
			}
			
			ByteBuffer buffer = ByteBuffer.allocate(4 + 4 + stringSize);
			buffer.putInt(data.getID());
			buffer.putInt(stringSize);
			buffer.put(serializedName);
			
			return buffer.array();
		}
		catch (Exception e) {
			throw new SerializationException(
					"Error when serializing Customer to byte[] " + e);
		}
	}

}

```

> 호환성, 타입, 여러 팀에서 Customer 클래스를 사용하고 있다면...<br>
> Customer 클래스의 코드를 동시에 변경해야 하는 상황이 발생합니다.

# 3.5.2. 아파치 에이브로를 사용해서 직렬화하기

- 언어 중립적인 데이터 직렬화 형식입니다.
- 보통 JSON 형식으로 정의, 주어진 데이터를 스키마에 따라 직렬화하면 이진 파일 형태로 결과물이 나옵니다.

> 메시지를 쓰는 애플리케이션이 새로운 스키마로 전환하더라도 <strong>기존 스키마와 호환성을 유지하는 한</storng><br>
> 데이터를 읽는 애플리케이션은 일체의 변경이나 업데이트 없이 계속해서 메시지를 처리할 수 있습니다.
{: .prompt-tip }

## Avro의 장점 호환성

### 기존 스키마
https://avro.apache.org/docs/1.11.1/specification/_print/

```json

{
	"namespace": "customerManagement.avro",
	"type":"record",
	"name":"Customer",
	"fields":[
		{"name": "id", "type": "int"},
		{"name": "name", "type": "string"},
		// faxNumber 필드는 optional이고 기본값은 null 입니다.
		{"name": "faxNumber", "type": ["null", "string"], "default": "null"}			
	]
}

```

- namespace: namespace, a JSON string that qualifies the name (optional);
> 서로 간을 구별짓기 위한 이름

- type: 

![](https://jwjinn.github.io/assets/img/kafka/2024-05-01-12-20-14.png)

- name: a JSON string providing the name of the record (required).

> record를 구별하기 위한 이름

### 새로운 스키마

```json

{
	"namespace": "customerManagement.avro",
	"type":"record",
	"name":"Customer",
	"fields":[
		{"name": "id", "type": "int"},
		{"name": "name", "type": "string"},
		// email로 필드명 변경
		{"name": "email", "type": ["null", "string"], "default": "null"}			
	]
}

```

### 현재 상황

- 예전 레코드는 'faxNumber'를 가지고 있지만, 새로운 레코드는 'email'을 가지고 있습니다.
- 해당 레코드를 가지고 있는 서로 다른 애플리케이션이 카프카에 저장된 모든 이벤트를 처리할 수 있도록 해줘야 합니다.

### 예외나 에러 처리를 발생하지 않는다.
> 읽는 쪽 애플리케이션 상황으로 가정합니다.

- 구버전 스키마(faxNumber)로 메시지를 받을 경우, 애플리케이션은 getEmail()을 null로 리턴하게 됩니다.


### 주의

- 데이터를 쓸 때 사용하는 스키마와 읽을 때 기대하는 스키마가 호환되어야 합니다.
> Avro 호환성 규칙을 참조, 당연하게도 기본적으로 호환조차 안되게 사용할 수는 없다.

- 역직렬화를 할 때는 데이터를 쓸 때 사용했던 스키마에 접근이 가능해야 합니다.

# 3.5.3 카프카에서 에이브로 레코드를 사용하기

에이브로는 레코드를 읽을 때, 스키마 전체를 필요로 하기에 어딘가 스키마를 저장해 두기는 해야 합니다.

그래서 이 문제를 해결하기 위해서 `스키마 레지스트리` 라고 부르는 아키텍쳐 구조를 사용합니다.

컨플루언트 스키마 레지스트리를 참고로 진행한다면

1. 프로듀서는 카프카 브로커에 `스키마 ID`를 갖는 메시지를 저장합니다.

2. 그와 동시에 프로듀서는 `스키마 레지스트리`에 현재 버전의 스키마를 저장합니다.

3. 컨슈머는 디시리얼라이징을 할 때, 브로커에 있는 `스키마 ID`를 이용해서 `스키마 레지스트리`에서 스키마를 가져옵니다.

## Producer 코드
> 현재, 레지스트리 저장소가 없기에 참고용으로만 살펴보면 좋을 듯하다.

```java

public class producer2 {

	public static void main(String[] args) {
		 // Kafka 브로커에 연결할 설정 추가
        Properties configs = new Properties();
        configs.put("bootstrap.servers", "{외부IP}:17633"); // Kafka host 및 server 설정
        configs.put("acks", "all");                         // 자신이 보낸 메시지에 대해 카프카로부터 확인을 기다리지 않습니다.
        configs.put("block.on.buffer.full", "true");        // 서버로 보낼 레코드를 버퍼링 할 때 사용할 수 있는 전체 메모리의 바이트수
        configs.put("spring.kafka.producer.properties.security.protocol", "PLAINTEXT");

		// 변경점
		// 객체와 기본형 모두를 직렬화할 수 있다.
		configs.put("value.serializers.KAfkaAvroSerializer"); 

		// 프로듀서가 시리얼라이저에 넘기는 값, 스키마를 저장한 위치를 알려준다.
		configs.put("schema.registry.url", schemaUrl);

        
        // producer 생성
		// 프로듀서에 record의 value 타입을 Customer라고 선언합니다.
        KafkaProducer<String, Customer> producer = new KafkaProducer<String, Customer>(configs);

		String topic = "customerContacts";

		while(true){
			// 일반 자바 객체가 아닌 에이브로의 코드 생성 기능을 사용해서 스키마로부터 생성된 에이브로 특화 객체.
			// avro 객체만을 직렬화할 수 있기 때문에.
			Customer customer = CustomerGenerator.getNext();
			System.out.println("Generated customer " + customer.toString());

			ProducerRecord<String, Customer> record = new ProducerRecord<>(topic, customer.getName(), customer);
			producer.send(record);

			
		}             
        


        // 종료
        producer.flush();
        producer.close();

	}

}

```

> 제네릭 에이브로 객체는 책 내용을 확인하자. 내가 손으로 String타입의 스키마를 작성한다.

