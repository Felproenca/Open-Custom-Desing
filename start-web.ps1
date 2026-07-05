Write-Host "Starting daemon..." -ForegroundColor Cyan
$daemon = Start-Process -FilePath "node" -ArgumentList "apps/daemon/dist/cli.js","--port","17456" -WorkingDirectory $PSScriptRoot -PassThru -NoNewWindow

Start-Sleep -Seconds 3

Write-Host "Starting Next.js web on port 17573..." -ForegroundColor Cyan
$web = Start-Process -FilePath "npx" -ArgumentList "next","dev","-p","17573" -WorkingDirectory "$PSScriptRoot\apps\web" -PassThru -NoNewWindow

Write-Host ""
Write-Host "Daemon:  http://localhost:17456" -ForegroundColor Green
Write-Host "Web:     http://localhost:17573" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow

try {
    while ($true) { Start-Sleep -Seconds 5 }
} finally {
    Write-Host "Stopping..." -ForegroundColor Red
    Stop-Process -Id $daemon.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $web.Id -Force -ErrorAction SilentlyContinue
}
