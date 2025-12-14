#옵시디언
[[옵시디언 팁 모음집]]
***

## 1. 환경 설정 및 설치

1. **소프트웨어 설치:**
- **Node.js:** 반드시 **v22 (LTS)** 이상 버전 설치. (초기 v20 버전 오류 해결됨)  
- **Git:** 코드 관리 도구.
- **Obsidian:** 글쓰기 도구.

1. **GitHub 저장소 준비:**
- `jackyzha0/quartz`를 **Fork** 함.
- 저장소 이름을 `jwjinn.github.io`로 변경.
- **[Settings] -> [Pages]** 메뉴에서 **Source**를 `GitHub Actions`로 변경.


## 2. 필수 파일 생성:
- 경로: .github/workflows/deploy.yml
- 해당 설정을 하지 않으면, Github에서 자기 마음대로 배포를 진행하게 된다.

```yaml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v4

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-22.04
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

## 3. 블로그 이름 변경
- 대상 파일: `quartz.config.ts`
- `pageTitle: "Quartz 4.0"` 값을 원하는 값으로 변경.

## 4. github 싱크 작업
- 배포
```shell
npx quartz sync
```

***
## 로컬 호스트에서 보는 법

```shell

npx quartz build --serve

```
- `http://localhost:8080`
