# Contributing

이 저장소는 학습 중심의 프론트엔드 모노레포입니다.
이 문서의 목적은 개발 규칙을 단순하고 일관되게 유지하는 것입니다.

[English Document](./CONTRIBUTING.md)

## 저장소 구조

- `apps/web`: 메인 애플리케이션
- `libs/shared-ui`: 공용 UI 컴포넌트 패키지

## 브랜치 네이밍

브랜치명은 아래 형식을 사용합니다.

```text
type/scope-short-description
```

추천 예시:

- `feat/shared-ui-button`
- `feat/shared-ui-storybook`
- `fix/web-routing-error`
- `docs/root-readme-storybook`
- `chore/shared-ui-test-setup`

가이드라인:

- `feat`, `fix`, `docs`, `test`, `chore`처럼 명확한 `type`을 사용합니다
- 이 저장소의 범위를 반영해 `shared-ui`, `web`, `root` 같은 `scope`를 사용합니다
- 설명은 짧고 `kebab-case`로 작성합니다
- `feat/button`, `fix/bug`, `test/config`처럼 모호한 이름은 피합니다

## 커밋 메시지

짧고 명확한 conventional 스타일 커밋 메시지를 사용합니다.

권장 형식:

```text
type: short summary
```

예시:

- `feat: add shared-ui Button component`
- `feat: add shared-ui Storybook and Button stories`
- `docs: update root README with Storybook usage`
- `test: add Button unit tests`

추가 설명이 필요하면 본문에 여러 줄 bullet을 붙입니다.

## Git Hook

이 저장소는 Husky를 통해 Git hook을 사용합니다.

Hook 동작:

- `pre-commit`: `lint-staged`를 실행하고 lint 실패 시 커밋을 차단합니다
- `commit-msg`: `commitlint`를 실행하고 커밋 메시지 형식이 틀리면 커밋을 차단합니다
- `pre-push`: 워크스페이스 테스트와 web 빌드를 실행하고 둘 중 하나라도 실패하면 push를 차단합니다

현재 검사 항목:

- 커밋 단계:
  - `apps/web`, `libs/shared-ui`의 staged TypeScript 파일을 ESLint로 검사
  - 커밋 메시지가 설정된 conventional 형식을 따르는지 검사
- 푸시 단계:
  - `pnpm run test:all`
  - `pnpm run build:web`

## 개발 흐름

기본 작업 흐름:

1. 목적이 분명한 브랜치를 만든다
2. 하나의 관심사나 영역에 집중해서 수정한다
3. 관련 테스트를 실행한다
4. 공용 UI 작업이면 Storybook으로 확인한다
5. 명확한 메시지로 커밋한다

## 테스트

`test:run` 스크립트가 있는 모든 워크스페이스 테스트 실행:

```bash
pnpm -r --if-present test:run
```

웹 앱 테스트만 실행:

```bash
pnpm -F web test:run
```

공용 UI 패키지 테스트만 실행:

```bash
pnpm -F @shared-ui/core test:run
```

## Storybook

Storybook은 `libs/shared-ui`의 공용 컴포넌트를 독립적으로 확인하는 용도로 사용합니다.

Storybook 실행:

```bash
pnpm -F @shared-ui/core storybook
```

Storybook 빌드:

```bash
pnpm -F @shared-ui/core storybook:build
```

새 공용 UI 컴포넌트를 추가할 때는 해당 컴포넌트를 독립적으로 검토할 수 있도록 스토리 파일도 함께 추가합니다.
