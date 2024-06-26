---
title: Github 블로그 만들기(1)
description: 깃허브 블로그를 만들기 위한 Ruby, Jekyll를 설치해봅시다.
author: joo
date: 24-03-24
categories: [Gitblog, Install]
tags: [gitblog]
pin: true
math: true
mermaid: true

---

[참고한 사이트](https://devpro.kr/posts/Github-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-(1)/)

## 1. Ruby 설치
[루비 다운로드 페이지](https://rubyinstaller.org/downloads/)<br>

![rubyimages추가](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-16-08-34.png){: width="972" height="589" }
우선 recommend 되어 있는 Ruby+Devkit 3.2.3-1 (x64)를 다운로드 했다.

### Ruby 설치 확인
설치를 진행하면 'unsure press enter'라는 문구가 있습니다. unsure 하니 enter를 클릭하면 됩니다.

## JekyII 설치

### 에러 발생
```bash
jwjin@BOOK-1AOGFI21KE MINGW64 ~/Desktop
$ gem install jekyll
ERROR:  Could not find a valid gem 'jekyll' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - SocketError: Failed to open TCP connection to rubygems.org:443 (getaddrinfo: 알려진 호스트가 없습니다. ) (https://rubygems.org/specs.4.8.gz)
ERROR:  Possible alternatives: algoliasearch-jekyll, asciidocsy-jekyll-theme, bootstrap4jekyll, cloudcannon-jekyll-bookshop, editorial-autogestiva-jekyll-theme
```

공식 서버에서는 https 인 이유 때문에, 정상적으로 다운로드가 되지 않는 듯하다.

미러 서버를 이용해서 다운로드를 받자.

### 미러 서버를 통한 다운로드
[공식 미러 서버 사이트](https://www.ruby-lang.org/en/downloads/mirrors/)

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-16-34-00.png)
가장 가까운 일본 사이트를 이용했습니다.

```bash
gem install jekyll --source http://shibaura-it.ac.jp
gem install bundler --source http://shibaura-it.ac.jp
```
## 설치 확인

![](https://jwjinn.github.io/assets/img/gitblog/2024-03-23-16-38-50.png)