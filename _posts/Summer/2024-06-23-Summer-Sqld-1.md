---
title: 썸머야 이게 DB야. 그리고 이게 설치방법이야.
description: 썸머야 이게 DB야.
author: joo
date: 24-06-23
categories: [Summer, Sqld]
tags: [Summer, Sqld]
pin: true
math: true
mermaid: true

---
## 관계형 데이터베이스가 뭐에요?
- 구글 클라우드에선: 관계형 데이터베이스는 데이터가 하나 이상의 열과 행의 테이블(또는 '관계')에 저장되어 서로 다른 데이터 구조가 어떻게 관련되어 있는지 쉽게 파악하고 이해할 수 있도록 사전 정의된 관계로 데이터를 구성하는 정보 모음입니다.
- https://cloud.google.com/learn/what-is-a-relational-database?hl=ko

> 알아. 너가 이해 못할 것이라는 것을 나중에 공부를 앞에서 부터 천천히 진행을 하면 알 수 있을 거라. 충분히 생각하고 있어.<br>
> 근데, 이 `관계`라는 개념이 매우 중요해. 아래는 데이터베이스의 구조 인터넷 예시야.
{: .prompt-info }

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-19-34-54.png)

### 썸머는 엑셀이 익숙하니까, 엑셀을 예시로 들어보자.
- 오늘 정산 관련해서 연락을 했으니까, 그걸 들어볼까. 

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-19-55-05.png)

- 참고로 만약 오늘의 지출을 내가 DB에 하나의 단일 테이블에 올린다면 이렇게 올렸을 거 같아.

- '1'의 의미는 해당한다. '0'의 의미는 해당하지 않는다. 라는 단순히 '예, 아니요'의 의미를 가지고 있어.

- 그러면 나중에 조건을 걸면, 알콜 제품만 뽑아주세요. 식사는 무엇을 먹었을 까요? 를 쿼리를 통해서 뽑을 수가 있겠지?

> 알아. 이해 못하고 있는 것을 근데.... 그런 느낌이 들고 있다고 생각하자.
{: .prompt-info }

아이스망고의 제품별 총가격은 어떻게 계산을 하겠어?

= 개당 가격 * 수량, 뭐 이런식으로 함수를 작성하겠지.

DB에서는 그리고 데이터를 분석을 할때에는 위에 있는 식사부터 제품별 총가격까지의 범주들을 `컬럼(column)`이라고 표현을 해.

아 통계 데이터 분석할때에도....

함수이다보니, 수량이 바뀌거나, 제품별 가격이 바뀌게 되면 제품별 총가격의 숫자가 자연스럽게 바뀌겠지..

내가 엑셀을 고도화해서 사용한 적은 없지만, 엑셀은 기본적으로 컬럼과 컬럼간의 관계만 나타냈었던 것 같아.

근데 DB는 테이블이라고 부르는 아래와 같은 것들끼리의 관계를 만들고, 그 관계를 조회하고 검색하지.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-02-33.png)

> 이해 못해도 끄덕끄덕하자. 

## 설치를 해보자.
이러한 관계형데이터베이스의 대표 주자(회사)들은
1. oracle
- 이 회사는 유료이고 비싸. 그러나 빠르고 보안성이 좋아서, 대기업들은 해당 회사의 제품을 활용해서 데이터를 저장하고 운영해. 
2. mysql
- 이 회사 제품은 상업적인 활용은 유료야. 0
3. mariadb
- 완전 무료이고 open source야. 그래서 보안적으로 취약해

썸머가 자격증을 딸때에는 솔직히 무엇을 설치를 하는 지는 중요하지 않지만, 가장 흔하게 인터넷에서 검색할 수 있는 'mysql'로 설치하는 방법을 찾아볼까 해.


 ## mysql 설치

 ### 1. MySQL installer 다운로드

- 사이트: https://dev.mysql.com/downloads/installer/

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-08-30.png)
- 이 화면에서

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-09-31.png)
- 저 아래에 있는 용량 296.1M 짜리를 다운로드 버튼을 클릭해

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-10-10.png)
- 그러면, 이 화면이 뜨는데 아래에 있는 `No thanks, just start my download`를 클릭하자.

### 2. 다운로드 화면을 클릭하자.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-12-23.png)

- 다른 옵션은 딱히 필요없을 듯해서, `Server only`를 클릭한 채로 Next

#### 그렇게 확인 확인을 누르면

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-13-31.png)

- 이 상태로 하고 넘어가자. 다 Next, Next

#### Accounts and Role 설정

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-14-28.png)

- 비번을 입력해야해. 뭐.. 예시를 들어서 하면, 간단하게 `summer@#`으로 비번을 설정할게.

- 그러고, 다 Next, Next, Execute.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-15-54.png)

- 이 화면이 나오면 설치 끝!, 그러고 Next 계속 눌러서

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-16-32.png)

- 진짜... 끝!

## 설치를 확인해보자.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-20-39.png)

- 자 아래처럼 mysql이라고 검색을 하면, `MySQL 8.0 Command Line Client`라는 프로그램이 있을 거야.

- 클릭하자.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-23-51.png)

- 이 화면에서 아까 입력했던 'summer@#'을 입력을 해서 아래 화면이 뜨면 설치 확인 끝

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-24-46.png)

## Client를 설치하자.
- 이곳에서 쿼리를 돌리는 것은 솔직히 난이도가 너무 높아. 초심자에게 그래서 Client를 설치를 해서 접속을 할거야.

### Dbeaver 검색과 설치
![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-26-02.png)

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-26-22.png)
- 다운로드 클릭

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-26-41.png)

- Windows(installer) 클릭 후, 실행한 다음. 대충 확인,확인 누르자.

### Dbeaver(client)를 통한 접속하기

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-28-04.png)
- 이 화면이 뜰 텐데...

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-28-34.png)
- 빨간 동그라미를 클릭하자.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-28-59.png)
- 그러면, 이 화면이 뜰거고, MySQL 클릭

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-29-24.png)
- 이 화면이 뜰거고

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-29-49.png)
- 이 칸에다가, `summer@#`을 입력하고, 완료를 누르자.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-30-50.png)

- 그래서, 생긴 좌측에 체크 표시가 뜨면 끝!!!!

## 임시 데이터를 넣어보자.
- 이곳에서는 ChatGPT를 활용하는 방법을 적어보자해.

썸머가 하면서 생기는 쿼리 오류들. 그리고 기본적은 DB 궁금증들은 chatgpt 무료 수준에서도 충분히 답할 수 있을 거라 생각을 해.

충분히 활용을 하도록!!!

### ChatGPT에 나는 이렇게 질의를 했어.
![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-34-19.png)
- 뭐.. 임시니까, 어떻게 돌아가는 지는 알아보라고.

- 아래 링크를 줄테니, 들어가서 창을 한쪽에 띄어놔

- 링크: https://chatgpt.com/share/ae226e43-20ed-40e4-abe7-35f0dec535b5

### 질의 결과를 입력해보자.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-36-37.png)
- SQL 클릭

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-36-54.png)

- 그러면, 이 화면이 뜰거고

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-37-47.png)

- 우선, 두개의 명령어를 입력하자.

그리고 `create database test;`이 옆에 커서를 두고 `ctcl + enter`를 클릭하자.

그래야 한줄 한줄 실행이 된다.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-40-23.png)

- 이렇게 화면이 나오면 위와 마찬가지로 하나 하나 씩 실행을 하기 위해서 가각 `;` 옆에 커서를 두고 `ctrl + enter`

- `순서 매우 중요!!!!!!!!!!!!!!!!`


### 다 하면 아래를 입력해서 확인해봐

```sql

use test;

select * from Account;

select * from Vendor;

select * from Customer;

select * from transaction;

select * from Journalentry;

```

### 새로 고침을 눌러서 데이터를 확인하자.
![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-44-05.png)

- 아래 새로고침을 누르자. 그러면, `test` DB가 생겨있을 거다.

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-44-40.png)
- 클릭하면 이런 화면이 뜰 것이고, 저 화면에 있는 `엔티티 관계도`를 클릭하면

![](https://jwjinn.github.io/assets/img/summer/2024-06-23-20-45-16.png)

- 간단한 관계형 데이터 베이스 생성 끝!!!!

## 정리

- 뭐 이렇게 설치하고 쿼리를 넣어보면 됩니다.

- 어지간한거는, chatgpt가 알려줄걸? 