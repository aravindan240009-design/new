$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontendDir = Join-Path $root "frontend"
$backendDir = Join-Path $root "backend"
$maven = "mvn"

if (Test-Path "C:\tmp\codex-tools\apache-maven-3.9.9\bin\mvn.cmd") {
  $maven = "C:\tmp\codex-tools\apache-maven-3.9.9\bin\mvn.cmd"
}

$dbPassword = Read-Host "Enter Supabase database password"
$env:DATABASE_URL = "jdbc:postgresql://aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&prepareThreshold=0"
$env:DATABASE_USERNAME = "postgres.sctxzleiutscylfdrbfu"
$env:DATABASE_PASSWORD = $dbPassword
$env:JWT_SECRET = "hostel-joining-system-local-secret-key-change-in-production-2026"
$env:CORS_ALLOWED_ORIGIN = "http://localhost:5173"
$env:PORT = "8080"

if (!(Test-Path (Join-Path $backendDir "target\hostel-joining-system-1.0.0.jar"))) {
  Push-Location $backendDir
  & $maven clean package "-Dmaven.test.skip=true"
  Pop-Location
}

Start-Process -FilePath "java" `
  -ArgumentList @("-jar", "target\hostel-joining-system-1.0.0.jar") `
  -WorkingDirectory $backendDir `
  -WindowStyle Hidden `
  -RedirectStandardOutput "C:\tmp\hostel-backend.log" `
  -RedirectStandardError "C:\tmp\hostel-backend.err"

Start-Process -FilePath "npm.cmd" `
  -ArgumentList @("run", "dev", "--", "--host", "127.0.0.1") `
  -WorkingDirectory $frontendDir `
  -WindowStyle Hidden `
  -RedirectStandardOutput "C:\tmp\hostel-frontend.log" `
  -RedirectStandardError "C:\tmp\hostel-frontend.err"

Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend:  http://localhost:8080"
Write-Host "Backend log:  C:\tmp\hostel-backend.log"
Write-Host "Frontend log: C:\tmp\hostel-frontend.log"
