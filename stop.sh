#!/bin/bash
# Stop Open Design
set -e
cd "$(dirname "$0")"

echo "■  Parando Open Design..."
pnpm tools-dev stop
echo ""
echo "✓  Tudo parado"
