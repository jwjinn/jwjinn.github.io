---
title: Github 블로그 만들기(2)
description: 리포지토리 생성부터 로컬 업로드까지
author: joo
date: 24-03-24
categories: [Gitblog, Install]
tags: [gitblog]
pin: true
math: true
mermaid: true

---

## 리포지토리 생성
![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-16-41-50.png)

간단하게 {username}.gitbub.io 형식으로 진행하면 됩니다.

### git clone 하기
기타 설정을 가져 오지 않기 위해서 딱 클론 명령만 사용했습니다.

```bash

$ git clone https://github.com/jwjinn/jwjinn.github.io.git
Cloning into 'jwjinn.github.io'...
warning: You appear to have cloned an empty repository.

```

## Jekyll 사이트 생성
Jekyll 사이트를 로컬에서 테스트를 하고 github에서 동작시키는 것을 목표로 합니다.

따라서, 이 과정은 로컬에서 웹 화면을 테스트 하기 위한 환경 구축이라고 생각하면 좋습니다.

### Jekyll 로컬용 폴더
![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-16-54-31.png)
깃헙용 경로와 로컬용 경로를 다르게 했습니다.

### 웹 화면 배포 명령
명령어를 실행하는 위치는 깃헙 클론한 경로가 아닌 내가 임의로 만든 폴더에서 진행했습니다.

```bash
# jeky11 웹 사이트 구축 경로 설정
jekyll new ./

# bundle 설치와 업데이트
bundle install
bundle update
bundle install

# 서버 실행
bundle exec jekyll serve

```
### 접속 확인
http://127.0.0.1:4000/

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-16-59-02.png)

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-16-59-27.png)