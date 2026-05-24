#!/bin/bash
# Start Open Design (daemon + web) — portas fixas + abre navegador
set -e
cd "$(dirname "$0")"

DAEMON_PORT="${OD_DAEMON_PORT:-17456}"
WEB_PORT="${OD_WEB_PORT:-17573}"
WEB_URL="http://localhost:${WEB_PORT}"

echo "▶  Iniciando Open Design..."
echo "   daemon : ${DAEMON_PORT}"
echo "   web    : ${WEB_PORT}"
echo ""

pnpm tools-dev run web \
  --daemon-port "$DAEMON_PORT" \
  --web-port "$WEB_PORT" \
  > /tmp/od-start.log 2>&1 &

# Aguarda web responder (max 45s)
for i in {1..45}; do
  sleep 1
  if curl -sf "$WEB_URL" -o /dev/null 2>&1; then
    echo "✓  Open Design rodando"
    echo ""
    pnpm tools-dev status 2>/dev/null | grep -E "daemon|web|desktop" || true
    echo ""
    echo "→  Abra: $WEB_URL"
    echo ""

    # Auto-abre o navegador (best-effort)
    if command -v xdg-open >/dev/null 2>&1; then
      xdg-open "$WEB_URL" >/dev/null 2>&1 &
    elif command -v open >/dev/null 2>&1; then
      open "$WEB_URL" >/dev/null 2>&1 &
    fi

    echo "    Comandos úteis:"
    echo "    ./stop.sh                parar tudo"
    echo "    pnpm tools-dev logs      ver logs"
    echo "    pnpm tools-dev status    ver status"
    echo "    pnpm tools-dev check     health check"
    exit 0
  fi
done

echo "✗  Timeout — web não respondeu em 45s. Veja: tail /tmp/od-start.log"
exit 1
