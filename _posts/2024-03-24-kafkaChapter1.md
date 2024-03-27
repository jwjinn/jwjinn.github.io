---
title: Chapter1 카프카 시작하기
description: Chapter1을 공부한 것을 쉽게 해석해 볼게요.
author: joo
date: 24-03-24
categories: [Engineering, Kafka]
tags: [kafka]
pin: true
math: true
mermaid: true

---

# 카프카의 가장 장점: 발행/구독 메시지 전달

## 대학 시절에서는

제가 대학 시절과 취준생 시절에 만들었던 프로그램들을 생각을 해보았습니다.

(그림 입력)

하나의 파이선 프로그램에서 많은 데이터를 끌어 올 수 있도록 설계를 했을 겁니다.

MariaDB, MongoDB, CSV 파일, 그리고 또다른 DB인 ORACLE 까지도 하나의 파이선 프로그램이 다양하게 호출했습니다.

아직까지는 꽤 괜찮아 보입니다. 하나씩 사용한다고 가정한다면 파이선 모듈로 만들거나, 함수로 만들면

다루기 어려워 보이는 숫자는 아닙니다.

## 그렇지만, 상용에서는?

회사에 입사한 지 얼마 안된 저에게는 처음 접하는 DB인 Redis, ClickHouse, ElasticSearch까지 종류가 많이 늘어났습니다.

종류 뿐만 아니라, 각각의 솔루션들은 서로 실시간으로 통신을 하고 있습니다.

