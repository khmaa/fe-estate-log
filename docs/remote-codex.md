# Remote Codex Access

This guide documents how to use a phone to connect to the home Mac and run Codex in this repository through SSH.

The setup uses two access modes:

- Same Wi-Fi: connect directly to the Mac's local IP address.
- Outside the home network: connect through Tailscale using the Mac's Tailscale IP address.

## Current Device Addresses

Use these values for this development machine unless the network setup changes:

- macOS user: `kyungho`
- Mac hostname: `kyunghomaui-noteubug.local`
- Same-Wi-Fi IP: `192.168.45.250`
- Tailscale IP: `100.110.178.50`
- Galaxy S24 Tailscale IP: `100.76.245.23`

The local Wi-Fi IP can change when the router assigns a new address.
The Tailscale IP is the preferred address for remote access from outside the home network.

## macOS Setup

Enable SSH on the Mac:

```text
System Settings -> General -> Sharing -> Remote Login
```

If enabling Remote Login from the shell, the terminal app may need Full Disk Access first:

```text
System Settings -> Privacy & Security -> Full Disk Access
```

After granting access, this command can enable Remote Login:

```bash
sudo systemsetup -setremotelogin on
```

Confirm the local access details:

```bash
whoami
hostname
ipconfig getifaddr en0
```

## Same-Wi-Fi SSH Access

When the phone and Mac are on the same Wi-Fi, use the Mac's local IP:

```bash
ssh kyungho@192.168.45.250
```

This address does not work from LTE, 5G, or another Wi-Fi network.

## Tailscale Setup

Install and sign in to Tailscale on both devices:

1. Install Tailscale on the Mac.
2. Allow the macOS system extension when prompted.
3. Sign in to Tailscale on the Mac.
4. Install Tailscale on the Galaxy S24.
5. Sign in with the same Tailscale account.
6. Confirm both devices appear in the same tailnet.

Confirm the Mac's Tailscale IP:

```bash
tailscale ip -4
```

For this Mac, the current Tailscale IP is:

```text
100.110.178.50
```

## Phone SSH Client Setup

Use Termius on the Galaxy S24 and create two hosts.

Same-Wi-Fi host:

```text
Alias: Kyungho Mac Wi-Fi
Hostname: 192.168.45.250
Port: 22
Username: kyungho
Password: macOS login password
```

Remote Tailscale host:

```text
Alias: Kyungho Mac Tailscale
Hostname: 100.110.178.50
Port: 22
Username: kyungho
Password: macOS login password
```

Leave SSH key, certificate, and FIDO2 fields empty when using password login.
The first connection may ask to approve the SSH fingerprint. Approve it only when connecting to the expected Mac address.

## Running Codex Remotely

After connecting through SSH, move to the project and resume Codex:

```bash
cd ~/Desktop/workspace/fe-estate-log
codex resume --last
```

If Codex shows an update prompt while managed by Volta, skip the built-in npm update prompt and update through Volta:

```bash
volta install @openai/codex@latest
codex --version
codex resume --last
```

## Preventing Sleep During Remote Work

The Mac must stay awake and connected to the internet.
When the Mac sleeps, SSH and Tailscale access can stop.

Recommended power adapter settings:

```bash
sudo pmset -c sleep 0
sudo pmset -c displaysleep 10
sudo pmset -c womp 1
```

Meanings:

- `sleep 0`: prevent system sleep while connected to power.
- `displaysleep 10`: turn the display off after 10 minutes.
- `womp 1`: allow wake for network access.

Check current power settings:

```bash
pmset -g
```

## Security Notes

- Do not expose SSH port `22` to the public internet through router port forwarding.
- Prefer the Tailscale IP for remote access outside the home network.
- Keep the Mac locked when unattended.
- Do not share the macOS login password in chat or documentation.
- Consider switching Termius to SSH key authentication later instead of password login.
