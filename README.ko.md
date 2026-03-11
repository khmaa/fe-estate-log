# fe-estate-log

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

## 현재 범위

- 재사용 가능한 공용 UI 패키지 구축
- 공용 패키지를 기반으로 메인 웹 애플리케이션 개발
- 모노레포에서 패키지 단위 테스트 방식 연습
- 아키텍처 의사결정과 학습 문맥 문서화

## 라이선스

MIT
