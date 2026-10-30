# 111일차 요약

## 목표

Showcase의 릴리스 알림 스위치가 화면에 표시된 제목과 설명을 접근성 트리에서도 그대로 사용하도록 개선했습니다.

## 완료한 작업

- 릴리스 알림 제목을 실제 `Label`로 변경해 Switch와 연결했습니다.
- 알림 설명에 식별자를 추가하고 Switch의 `aria-describedby`로 참조했습니다.
- 화면 라벨과 중복되던 별도 `aria-label` 사용을 제거했습니다.
- 더 이상 사용하지 않는 한·영 `ariaLabel` 번역 키를 정리했습니다.
- 앱 통합 테스트에서 영문과 한글 접근성 이름 및 설명을 검증했습니다.
- 영문 환경에서 스위치 상호작용과 checked 상태 변경을 함께 확인했습니다.

## 변경 파일

- `apps/web/src/pages/ShowcasePage.tsx`
- `apps/web/src/App.test.tsx`
- `apps/web/src/app/i18n/locales/en/showcase.json`
- `apps/web/src/app/i18n/locales/ko/showcase.json`

## 검증

- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/web-showcase-switch-accessibility`

## 커밋

```text
fix: Connect showcase switch accessibility text

- Associate the release notification label with its switch
- Expose the visible switch description to assistive technology
- Remove redundant English and Korean aria label translations
- Cover localized switch semantics and interaction
- Document day 111 showcase accessibility follow-up
```
