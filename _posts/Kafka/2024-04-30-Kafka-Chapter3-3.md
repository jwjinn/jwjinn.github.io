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

## 3.5.1 커스텀 시리얼라이저
단순한 문자열이나 정숫값이 아닐 경우에는 두 가지의 선택값이 존재합니다.

1. 범용 직렬화 라이브러리

2. 커스텀 직렬화 로직의 사용

> 범용 직렬화 라이브러리를 사용하는 것이 매우 추천되지만, 이유를 경험해보기 위해서 실제로 구현을 해봅니다.


### Customer 클래스
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

### CustomerSerializer
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

1. 