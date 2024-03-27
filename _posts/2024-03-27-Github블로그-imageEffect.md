---
title: 이미지 애니메이션 효과 제거
description: 모든 이미지에 있는 애니메이션 효과를 제거하겠습니다.
author: joo
date: 24-03-27
categories: [Gitblog, customize]
tags: [gitblog, img, image]
pin: true
math: true
mermaid: true

---

지금까지 모든 이미지에 애니메이션 효과가 있어서 오히려 가독성이 매우 떨어졌습니다.

## 설정 위치
commons.scss -> 517 

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