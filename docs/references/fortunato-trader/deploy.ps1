# Deploy Fortunato Trader para HostGator via FTP
# Uso: .\deploy.ps1

$FTP_HOST = "ftp.fortunatotrader.com.br"
$FTP_USER = "opencode@fortunatotrader.com.br"
$FTP_PASS = "@V^mp{V!E)#["
$FTP_PORT = 21
$LOCAL_DIR = $PSScriptRoot
$REMOTE_DIR = "/public_html"

$files = @(
    "index.html",
    "sitemap.xml",
    "robots.txt",
    "blog.css",
    "api\market.php",
    "assets\images\apex-promo.jpg",
    "assets\images\bulenox-promo.jpg",
    "assets\images\campanha-ninjatrader.jpg",
    "assets\images\earn2trade-promo.png",
    "assets\images\lucid-promo.jpg",
    "assets\images\ninjatrader-devices.png",
    "assets\images\ninjatrader-desktop.png",
    "assets\images\ninjatrader-lifestyle.jpg",
    "assets\images\ninjatrader-mobile.png",
    "assets\images\ninjatrader-phones.png",
    "assets\images\ninjatrader-web.png",
    "assets\images\sorteio.png",
    "assets\images\takeprofit-promo.png",
    "assets\images\wesley-fortunato.jpg",
    "assets\images\ylos-promo.png",
    "blog\prop-trading-o-que-e.html",
    "blog\nintrader-como-comecar.html",
    "blog\melhores-prop-firms-2026.html",
    "blog\como-passar-desafio-prop-firm.html",
    "blog\gestao-de-risco-trading.html"
)

Write-Host "=== Deploy Fortunato Trader ===" -ForegroundColor Cyan
Write-Host "Servidor: $FTP_HOST" -ForegroundColor Gray
Write-Host "Arquivos: $($files.Count)" -ForegroundColor Gray
Write-Host ""

foreach ($file in $files) {
    $localPath = Join-Path $LOCAL_DIR $file
    $remotePath = $REMOTE_DIR + "/" + $file.Replace("\", "/")

    if (Test-Path $localPath) {
        try {
            $ftpUrl = "ftp://${FTP_HOST}:${FTP_PORT}${remotePath}"
            $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUrl)
            $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
            $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($FTP_USER, $FTP_PASS)
            $ftpRequest.UseBinary = $true
            $ftpRequest.UsePassive = $true

            $fileContent = [System.IO.File]::ReadAllBytes($localPath)
            $ftpRequest.ContentLength = $fileContent.Length

            $requestStream = $ftpRequest.GetRequestStream()
            $requestStream.Write($fileContent, 0, $fileContent.Length)
            $requestStream.Close()

            Write-Host "  OK: $file" -ForegroundColor Green
        } catch {
            Write-Host "  FALHOU: $file - $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "  SKIP: $file (nao encontrado)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== Deploy concluido ===" -ForegroundColor Cyan
Write-Host "Site: https://fortunatotrader.com.br/" -ForegroundColor White
