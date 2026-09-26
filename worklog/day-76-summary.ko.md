# 76일차 요약

## 목표

임장 기록 생성/수정 폼에서 submit 버튼이 비활성화된 이유를 보조 기술이 확인할 수 있도록 접근성 설명을 연결했습니다.

## 완료한 작업

- `VisitLogFormActions`에 submit 비활성 사유를 optional `aria-describedby`로 연결하는 props를 추가했습니다.
- 비활성 사유 문구를 화면에는 숨기되 스크린 리더가 읽을 수 있도록 `sr-only` 설명으로 렌더링했습니다.
- create dialog가 필수 입력값 누락 상태일 때 생성 버튼에 지역화된 비활성 사유를 연결하도록 수정했습니다.
- edit dialog가 필수 입력값 누락 상태일 때 저장 버튼에 지역화된 비활성 사유를 연결하도록 수정했습니다.
- 영어/한국어 create/edit validation 문구에 submit 비활성 사유를 추가했습니다.
- form actions, create dialog, edit dialog 테스트에서 accessible description을 검증했습니다.
- 76일차 worklog가 커밋 대상에 포함되도록 `.gitignore` 예외를 추가했습니다.

## 변경 파일

- `.gitignore`
- `apps/web/src/features/visit-logs/components/VisitLogFormActions.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogFormActions.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCreateDialog.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCreateDialog.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogEditDialog.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogEditDialog.test.tsx`
- `apps/web/src/app/i18n/locales/en/visitLogs.json`
- `apps/web/src/app/i18n/locales/ko/visitLogs.json`

## 검증

- `pnpm -F web test:run -- VisitLogFormActions VisitLogCreateDialog VisitLogEditDialog i18n`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/web-visit-log-submit-disabled-reason`

## 커밋

```text
feat: Add visit log submit disabled reason

- Describe disabled submit actions with accessible helper text
- Add localized create and edit submit disabled reason copy
- Cover the accessible submit descriptions in form and dialog tests
- Include the day 76 worklog in version control
```
