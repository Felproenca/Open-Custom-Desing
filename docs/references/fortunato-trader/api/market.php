<?php
// Yahoo Finance CORS Proxy — hospede em public_html/api/market.php
// Uso: api/market.php?symbol=ES=F

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=30');

$symbol = isset($_GET['symbol']) ? $_GET['symbol'] : 'ES=F';

// Validar símbolo (apenas permitidos)
$allowed = ['ES=F','NQ=F','MES=F','MNQ=F','MGC=F','CL=F'];
if (!in_array($symbol, $allowed)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid symbol']);
    exit;
}

$url = 'https://query1.finance.yahoo.com/v8/finance/chart/' . urlencode($symbol) . '?interval=1d&range=1d';

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$response) {
    http_response_code(502);
    echo json_encode(['error' => 'Failed to fetch data']);
    exit;
}

$data = json_decode($response, true);
$meta = $data['chart']['result'][0]['meta'] ?? null;

if (!$meta) {
    http_response_code(502);
    echo json_encode(['error' => 'Invalid response']);
    exit;
}

$price = $meta['regularMarketPrice'] ?? null;
$prevClose = $meta['chartPreviousClose'] ?? null;
$chg = ($price && $prevClose) ? (($price - $prevClose) / $prevClose) * 100 : null;

echo json_encode([
    'symbol' => $symbol,
    'price' => $price,
    'change' => $chg,
    'time' => $meta['regularMarketTime'] ?? null
]);
