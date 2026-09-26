# 70일차 요약

## 목표

Galaxy S24에서 SSH로 집 Mac에 접속해 Codex로 개발을 이어갈 수 있도록, 같은 Wi-Fi 환경과 외부 네트워크 환경 모두에 대한 원격 접속 흐름을 문서화했습니다.

## 완료한 작업

- 영어 원격 Codex 접속 가이드 `docs/remote-codex.md`를 추가했습니다.
- 한국어 원격 Codex 접속 가이드 `docs/remote-codex.ko.md`를 추가했습니다.
- 같은 Wi-Fi에서 Mac 로컬 IP로 SSH 접속하는 흐름을 문서화했습니다.
- 외부 네트워크에서 Tailscale을 통해 SSH 접속하는 흐름을 문서화했습니다.
- 현재 Mac 사용자, hostname, 로컬 IP, Tailscale IP, Galaxy S24 Tailscale IP를 기록했습니다.
- Wi-Fi용과 Tailscale용 Termius host 설정값을 정리했습니다.
- Codex resume 명령과 Volta 기반 Codex 업데이트 흐름을 추가했습니다.
- 안정적인 원격 접속을 위한 Mac 잠자기 방지 설정을 추가했습니다.
- SSH 포트포워딩을 피하고 인증 정보를 문서/채팅에 공유하지 않는 보안 주의사항을 추가했습니다.
- 영어/한국어 README에서 두 원격 접속 가이드로 이동할 수 있도록 링크를 추가했습니다.

## 검증

- `pnpm run deploy:check`를 성공적으로 실행했습니다.
- 포맷 검사, 린트, 워크스페이스 테스트, 일반 웹 빌드, demo 웹 빌드가 모두 통과했습니다.
- `git diff --check`가 통과하는 것을 확인했습니다.
- 마무리 시점에 워크트리가 깨끗한 것을 확인했습니다.

## 커밋

```text
docs: Add remote Codex access guide

- Document same-Wi-Fi and Tailscale SSH access from mobile
- Add Termius, Codex, Volta update, and Mac sleep prevention steps
- Link the English and Korean remote access guides from the READMEs
```
