---
title: 화면 축소시, 메뉴가 그대로 뜨게 하자.
description: 화면이 작으면 좌측 메뉴 화면이 안뜬다. 원인을 찾아보자.
author: 우진
date: 24-04-06
categories: [Gitblog, customize]
tags: [gitblog, sitemap]
pin: true
math: true
mermaid: true

---

# 현재 상황
![](https://jwjinn.github.io/assets/img/gitblog/2024-04-06-17-54-57.png)

화면이 작은 상황에서 해당 메뉴 버튼을 클릭이 동작을 하지 않습니다.

따라서, 웹 화면을 축소 했을 때, 그리고 모바일 환경에서는 정상적으로 동작하지 않고 있습니다.

## 원인 찾기
동일 사이트의 다른 블로그 설정을 보기로 했습니다.

![](https://jwjinn.github.io/assets/img/gitblog/2024-04-06-17-57-58.png)
> 클릭 하기 전에는 `sidebar-display` 가 뜨지 않는 상태이지만.

![](https://jwjinn.github.io/assets/img/gitblog/2024-04-06-17-57-25.png)
> 클릭을 하면 `sidebar-display` 가 뜹니다.

## 유추 할 수 있는 원인

1. 리스너의 문제
2. 설정의 문제 - 아마 css 건들면서 건들여 졌을 수도.
3. 자바스크립트 호출의 문제


## javascript 위치

`_javascript/modules/components/sidebar.js`


## 코드 동작 확인
```javascript

$("#sidebar-trigger").click(function(){console.log("hello")})
```
![](https://jwjinn.github.io/assets/img/gitblog/2024-04-06-18-20-29.png)

> 제대로 동작함. 코드에 문제가 없었습니다.

## 네트워크 확인
![](https://jwjinn.github.io/assets/img/gitblog/2024-04-06-18-32-29.png)
현재는 `200`으로 정상 응답되어 있지만, 수정 전에는 `400`으로 잘못된 경로로 요청을 한다는 것을 확인했습니다.

![](https://jwjinn.github.io/assets/img/gitblog/2024-04-06-18-35-43.png)
해당 경로를 확인해 봤습니다.

## 경로에 존재하지 않는 자바스크립트...

### 1. js/dist 폴더에 존재하지 않는 자바스크립트
![](https://jwjinn.github.io/assets/img/gitblog/2024-04-06-18-36-26.png)

### 2. 게다가 gitIgnore되어 있는 폴더..
![](https://jwjinn.github.io/assets/img/gitblog/2024-04-06-18-37-22.png)
> 지금은 해당 경로가 github에 잘 올라갈 수 있도록 주석처리 했습니다.

이제 정상 동작 합니다.