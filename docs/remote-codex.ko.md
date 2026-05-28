# 원격 Codex 접속 가이드

이 문서는 휴대폰에서 집 Mac에 SSH로 접속한 뒤, 이 저장소에서 Codex를 실행하는 방법을 기록합니다.

접속 방식은 두 가지입니다.

- 같은 Wi-Fi: Mac의 로컬 IP로 직접 접속합니다.
- 외부 네트워크: Tailscale을 통해 Mac의 Tailscale IP로 접속합니다.

## 현재 기기 주소

네트워크 설정이 바뀌지 않았다면 이 개발 Mac은 다음 값을 사용합니다.

- macOS 사용자: `kyungho`
- Mac hostname: `kyunghomaui-noteubug.local`
- 같은 Wi-Fi IP: `192.168.45.250`
- Tailscale IP: `100.110.178.50`
- Galaxy S24 Tailscale IP: `100.76.245.23`

로컬 Wi-Fi IP는 공유기가 새 주소를 할당하면 바뀔 수 있습니다.
집 밖에서 접속할 때는 Tailscale IP를 사용하는 것을 권장합니다.

## macOS 설정

Mac에서 SSH 접속을 허용합니다.

```text
System Settings -> General -> Sharing -> Remote Login
```

터미널에서 Remote Login을 켜려면 먼저 터미널 앱에 Full Disk Access 권한이 필요할 수 있습니다.

```text
System Settings -> Privacy & Security -> Full Disk Access
```

권한을 부여한 뒤에는 다음 명령으로 Remote Login을 켤 수 있습니다.

```bash
sudo systemsetup -setremotelogin on
```

로컬 접속 정보를 확인합니다.

```bash
whoami
hostname
ipconfig getifaddr en0
```

## 같은 Wi-Fi에서 SSH 접속

휴대폰과 Mac이 같은 Wi-Fi에 있을 때는 Mac의 로컬 IP를 사용합니다.

```bash
ssh kyungho@192.168.45.250
```

이 주소는 LTE, 5G, 다른 Wi-Fi에서는 동작하지 않습니다.

## Tailscale 설정

Mac과 Galaxy S24에 Tailscale을 설치하고 같은 계정으로 로그인합니다.

1. Mac에 Tailscale을 설치한다.
2. macOS 시스템 확장 허용 요청이 나오면 허용한다.
3. Mac에서 Tailscale에 로그인한다.
4. Galaxy S24에 Tailscale을 설치한다.
5. 같은 Tailscale 계정으로 로그인한다.
6. 두 기기가 같은 tailnet에 표시되는지 확인한다.

Mac의 Tailscale IP를 확인합니다.

```bash
tailscale ip -4
```

현재 이 Mac의 Tailscale IP는 다음과 같습니다.

```text
100.110.178.50
```

## 휴대폰 SSH 클라이언트 설정

Galaxy S24에서는 Termius를 사용하고 host를 두 개 만들어둡니다.

같은 Wi-Fi용 host:

```text
Alias: Kyungho Mac Wi-Fi
Hostname: 192.168.45.250
Port: 22
Username: kyungho
Password: macOS 로그인 비밀번호
```

외부 Tailscale용 host:

```text
Alias: Kyungho Mac Tailscale
Hostname: 100.110.178.50
Port: 22
Username: kyungho
Password: macOS 로그인 비밀번호
```

비밀번호 접속을 사용할 때는 SSH key, certificate, FIDO2 입력란은 비워둡니다.
처음 접속할 때 SSH fingerprint 승인이 뜰 수 있습니다. 예상한 Mac 주소로 접속 중일 때만 승인합니다.

## 원격에서 Codex 실행

SSH 접속 후 프로젝트로 이동하고 Codex를 이어서 실행합니다.

```bash
cd ~/Desktop/workspace/fe-estate-log
codex resume --last
```

Codex가 Volta로 관리되는 상태에서 업데이트 안내가 뜨면, 내장 npm update prompt는 건너뛰고 Volta로 업데이트합니다.

```bash
volta install @openai/codex@latest
codex --version
codex resume --last
```

## 원격 작업 중 잠자기 방지

Mac은 켜져 있고 인터넷에 연결되어 있어야 합니다.
Mac이 잠자기 상태가 되면 SSH와 Tailscale 접속이 끊길 수 있습니다.

전원 어댑터 연결 중 추천 설정은 다음과 같습니다.

```bash
sudo pmset -c sleep 0
sudo pmset -c displaysleep 10
sudo pmset -c womp 1
```

의미는 다음과 같습니다.

- `sleep 0`: 전원 연결 중 시스템 잠자기 방지
- `displaysleep 10`: 화면은 10분 후 꺼짐
- `womp 1`: 네트워크 접근 시 깨우기 허용

현재 전원 설정은 다음 명령으로 확인합니다.

```bash
pmset -g
```

## 보안 주의사항

- 공유기 포트포워딩으로 SSH 포트 `22`를 외부 인터넷에 직접 열지 않습니다.
- 집 밖에서는 Tailscale IP로 접속하는 것을 권장합니다.
- 자리를 비울 때는 Mac 화면을 잠가둡니다.
- macOS 로그인 비밀번호를 채팅이나 문서에 공유하지 않습니다.
- 추후에는 Termius 접속 방식을 비밀번호 대신 SSH key 인증으로 바꾸는 것을 고려합니다.
