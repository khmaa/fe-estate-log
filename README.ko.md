# fe-estate-log

[![Coverage](https://codecov.io/github/khmaa/fe-estate-log/graph/badge.svg)](https://codecov.io/github/khmaa/fe-estate-log)

부동산 임장 기록 서비스를 만들며 프론트엔드 모노레포 구조를 학습하는 프로젝트입니다.

[English README](./README.md)

## 개요

이 저장소는 학습 중심의 프론트엔드 모노레포입니다.
프로젝트 아키텍처, 워크스페이스 설계, 공용 UI 패키지 개발, 테스트 환경 구성을 처음부터 직접 익히는 것을 목표로 합니다.

서비스 컨셉은 부동산이나 주변 지역을 직접 방문하면서 수집한 메모와 인상을 기록하는 임장 로그 플랫폼입니다.

## 워크스페이스 구조

```text
apps/
  web/            메인 React 애플리케이션
libs/
  shared-ui/      공용 UI 컴포넌트 라이브러리
ai-context/       로컬 AI 컨텍스트 문서 (git 제외)
```

## 기술 스택

- `pnpm` workspaces
- `React`
- `TypeScript`
- `Vite`
- `Vitest`
- `Testing Library`

## 사전 준비

- `Node.js` 20+ 권장
- `pnpm` 전역 설치

## 의존성 설치

```bash
pnpm install
```

## 프로젝트 실행

메인 웹 애플리케이션을 실행하려면:

```bash
pnpm -F web dev
```

이 명령은 `apps/web`의 Vite 개발 서버를 실행합니다.

## 테스트 실행

공용 UI 라이브러리 테스트 실행:

```bash
pnpm -F @shared-ui/core test:run
```

웹 애플리케이션 테스트 실행:

```bash
pnpm -F web test:run
```

`test:run` 스크립트가 있는 모든 워크스페이스 패키지 테스트 실행:

```bash
pnpm -r --if-present test:run
```

`web`과 `shared-ui`는 테스트 실행 시 커버리지 요약이 콘솔에 기본 출력되도록 설정되어 있습니다.
GitHub Actions에서 생성한 커버리지 결과는 Codecov로 업로드되도록 구성해 두었고, 이를 통해 저장소에서 커버리지 배지와 PR 커버리지 체크를 확인할 수 있습니다.

## 커버리지 정책

`apps/web`과 `libs/shared-ui`의 커버리지 리포트는 Codecov로 업로드됩니다.
저장소 루트의 `codecov.yml`에는 현재 다음 기준이 정의되어 있습니다.

- 전체 프로젝트 커버리지 목표: `auto`
- PR patch 커버리지 목표: `90%`
- PR patch 커버리지 허용 오차: `3%`

또한 Codecov에서 `web`과 `shared-ui`를 별도 component로 나눠서 각 워크스페이스 영역의 커버리지를 더 명확하게 볼 수 있게 했습니다.

## Storybook

`libs/shared-ui`에는 공용 컴포넌트를 독립적으로 확인하기 위한 Storybook이 설정되어 있습니다.
전체 애플리케이션을 실행하지 않고도 기본 컴포넌트의 형태, 상태, 상호작용 예시를 확인할 때 사용합니다.

Storybook 실행:

```bash
pnpm -F @shared-ui/core storybook
```

정적 Storybook 빌드:

```bash
pnpm -F @shared-ui/core storybook:build
```

Storybook 관련 파일 구조는 다음과 같습니다:

```text
libs/shared-ui/
  .storybook/                  Storybook 설정
  src/components/*.stories.tsx 공용 컴포넌트 스토리 파일
```

새 공용 컴포넌트를 추가할 때는 같은 컴포넌트 영역에 스토리 파일도 함께 추가해서 독립적으로 확인할 수 있게 유지합니다.

## 프로젝트별 실행 방법

### `apps/web`

개발 서버 실행:

```bash
pnpm -F web dev
```

테스트 실행:

```bash
pnpm -F web test:run
```

Vitest UI 실행:

```bash
pnpm -F web test:ui
```

애플리케이션 빌드:

```bash
pnpm -F web build
```

### `libs/shared-ui`

테스트 실행:

```bash
pnpm -F @shared-ui/core test:run
```

Vitest UI 실행:

```bash
pnpm -F @shared-ui/core test:ui
```

Storybook 실행:

```bash
pnpm -F @shared-ui/core storybook
```

Storybook 빌드:

```bash
pnpm -F @shared-ui/core storybook:build
```

## 현재 범위

- 재사용 가능한 공용 UI 패키지 구축
- 공용 패키지를 기반으로 메인 웹 애플리케이션 개발
- 모노레포에서 패키지 단위 테스트 방식 연습
- 아키텍처 의사결정과 학습 문맥 문서화

## 라이선스

MIT
