---
title: 이미지 애니메이션 효과 제거
description: 모든 이미지에 있는 애니메이션 효과를 제거하겠습니다.
author: 우진
date: 24-03-31
categories: [Gitblog, customize]
tags: [gitblog, img, image]
pin: true
math: true
mermaid: true

---

지금까지 모든 이미지에 애니메이션 효과가 있어서 오히려 가독성이 매우 떨어졌습니다.

그래서 가독성을 높히기 위해서 해당 스타일을 가지고 있는 곳을 찾아서 주석처리 하기로 했습니다.

## 설정 위치
 `_sass/addon/commons.scss`

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-31-12-21-14.png)

## commons.scss에서 .shimmer 클래스를 주석처리 한다.
>commons.scss -> 517번 줄에 있다.
![](https://jwjinn.github.io/assets/img/gitblog/2024-03-31-12-24-01.png)

```scss

// .shimmer {
//   overflow: hidden;
//   position: relative;
//   background: var(--img-bg);

//   &::before {
//     content: '';
//     position: absolute;
//     background: var(--shimmer-bg);
//     height: 100%;
//     width: 100%;
//     -webkit-animation: shimmer 1.3s infinite;
//     animation: shimmer 1.3s infinite;
//   }

//   @-webkit-keyframes shimmer {
//     0% {
//       transform: translateX(-100%);
//     }

//     100% {
//       transform: translateX(100%);
//     }
//   }

//   @keyframes shimmer {
//     0% {
//       transform: translateX(-100%);
//     }

//     100% {
//       transform: translateX(100%);
//     }
//   }
// }

```