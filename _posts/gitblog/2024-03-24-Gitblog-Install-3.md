---
title: Github 블로그 만들기(3)
description: 테마 다운부터 로컬 실행 확인까지
author: joo
date: 24-03-24
categories: [Gitblog, Install]
tags: [gitblog]
pin: true
math: true
mermaid: true

---

## Jekyll 테마 다운로드
[테마 적용에 적극적으로 도움을 받은 사이트](https://www.irgroup.org/posts/jekyll-chirpy/)

### Chirpy Jekyll Theme

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-21-45-40.png)

https://github.com/cotes2020/jekyll-theme-chirpy?ref=statichunt.com

제일 깔끔해 보이고 개발 관련 문서 뿐만 아니라 다른 카테고리를 추가하기도 용의해 보여서 해당 테마를 선택했습니다.

## 로컬에서 배포해서 확인해보기
파일을 다운을 받고 압축을 해제 한 후, 원래 생각했던 폴더에 복붙합니다.

### 명령어 실행
다운을 받은 jekyll theme에는 이미 기본 설정이 되어 있습니다.
그렇기에, 아래 간단한 명령으로 필요한 것을 수행할 수 있습니다.

```bash

bundle

jekyll serve

```

### 실행 확인
http://localhost:4000/
![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-22-45-28.png)