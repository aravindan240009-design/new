# Oracle Always Free Backend Deployment

This folder runs the Spring Boot backend on an Oracle Cloud Always Free VM with Docker Compose.

## VM Commands

Install Docker:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg git
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```

Clone and start:

```bash
git clone YOUR_GITHUB_REPO_URL hostel-joining-system
cd hostel-joining-system/deploy/oracle-backend
cp .env.example .env
nano .env
docker compose up -d --build
```

Backend without a domain:

```text
http://YOUR_VM_PUBLIC_IP:8080
```

For IP-only hosting without Caddy, run this instead:

```bash
docker compose -f docker-compose.ip.yml up -d --build
```

Backend with a domain:

1. Point `api.your-domain.com` DNS A record to the VM public IP.
2. Replace `api.your-domain.com` in `Caddyfile`.
3. Run:

```bash
docker compose up -d --build
```

Caddy will automatically request HTTPS certificates.

## Oracle Security List

Open inbound ports:

- `22` for SSH
- `80` for HTTP
- `443` for HTTPS
- `8080` only if you are not using a domain/Caddy
