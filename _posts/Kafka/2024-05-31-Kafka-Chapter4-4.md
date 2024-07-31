---
title: 오프셋과 커밋
description: 
author: joo
date: 24-05-31
categories: [Kafka, Chapter4]
tags: [kafka, Data, Engineering]
pin: true
math: true
mermaid: true

---

우리가 poll()을 호출할 때마다 카프카에 쓰여진 메시지 중에서 컨슈머 그룹에 속한 컨슈머들이 아직 읽지 않은 레코드가 리턴됩니다.

