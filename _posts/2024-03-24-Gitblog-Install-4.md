---
title: Github 블로그 만들기(4)
description: 깃허브 블로그를 만들기 위한 Ruby, Jekyll를 설치해봅시다.
author: joo
date: 24-03-24
categories: [Gitblog, Install]
tags: [gitblog]
pin: true
math: true
mermaid: true

---

[배포 에러시 확인했던 사이트](https://jjikin.com/posts/Jekyll-Chirpy-%ED%85%8C%EB%A7%88%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-Github-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0(2023-6%EC%9B%94-%EA%B8%B0%EC%A4%80)/)

## 환경 설정 확인해보기
- _config.yml : 블로그의 기본 설정 파일입니다. 기본 환경세팅은 모두 여기에서 합니다.
- _data : 왼쪽 사이드바와 포스트 하단의 공유하기 버튼등의 구성을 변경할 수 있습니다. 언어 설정에 따라 기본적으로 화면에 나오는 단어들을 변경할 수 있습니다.
- _include : 사이드바, toc, 구글애널리틱스, footer, 댓글 등의 대부분의 모듈형으로 삽입되는 UI를 변경할 수 있습니다
- _layout : 블로그 전역에 적용되는 기본 형식, 카테고리, 포스트 등에 적용되는 형식등을 변경할 수 있습니다.
- _posts : 내가 작성한 블로그 글을 저장해 두는 곳입니다.
- _sass : css 파일을 커스터마이징 할 수 있습니다.
- _site : 로컬에서 실행할 때, 화면 UI를 구성하는 모든 내용이 들어 있습니다. 이곳의 내용을 변경하면 로컬에는 잘 반영되지만, git에는 올라가지 않습니다. 또한 다른 기본 디렉토리의 내용을 변경하고 빌드하게 되면 이곳의 내용이 바뀌게 됩니다.
- _tabs : 왼쪽 사이드바의 기본 탭메뉴들에 대한 랜딩페이지가 들어 있습니다.
- assets : css, img등이 있습니다. 포스팅에 들어갈 이미지는 assets/img 아래에 넣으면 됩니다.
- tools : github에서 자동 배포를 위한 코드가 들어 있습니다. 이곳은 아예 건들지 맙시다

### config.yml 수정 해보기
간단하게 아래 내용을 보고 꼭 필요한 것만 수정했습니다.

https://www.irgroup.org/posts/jekyll-chirpy/#%EC%B0%B8%EA%B3%A0

## 첫 번째 포스팅 해보기
형식 : yyyy-mm-dd-제목.md

작성한 파일은 _posts 디렉토리에 넣습니다.

2024-03-23-welcome.md 만들어보고 _posts 디렉토리에 넣어보기.

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-23-03-54.png)
헤당 포스트가 로컬 홈페이지에서 확인할 수 있게 되었습니다.

# 배포 해보기

## gitignore 추가
Gemfile.lock

이 파일이 빌드/배포가 에러를 내는 경우가 있다고 합니다.

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-23-09-33.png)

확인해보니 이미 자동으로 gitignore에 추가되어 있습니다.

## 깃 허브 커밋 후 푸쉬

[배포시 확인해야 할 점](https://jjikin.com/posts/Jekyll-Chirpy-%ED%85%8C%EB%A7%88%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-Github-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0(2023-6%EC%9B%94-%EA%B8%B0%EC%A4%80)/)

### 깃 허브 추가 설정
![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-23-47-40.png)

Settings -> Pages -> Build and deployment -> Source

'GitHub Actions'으로 변경합니다.

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-23-49-14.png)

Jekyll -> Configure -> Commit changes를 클릭합니다.

### pages-deploy.yml.hook 파일 삭제
![]https://jwjinn.github.io/assets/img/gitblog/(2024-03-23-23-50-30.png)

이미 삭제되어서 보여지지는 않지만, pages-deploy.yml.hook 파일을 삭제합니다.

## 배포 확인해보기

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-23-55-12.png)

정상적으로 배포가 진행되었습니다.