#!/usr/bin/env bash
# ArteEnLink · capturas locales, sin despliegue ni dependencias npm.
set -Eeuo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
OUTPUT="${1:-$ROOT/qa-output}"
PORT="${ARTEENLINK_QA_PORT:-8765}"
if ! [[ "$PORT" =~ ^[0-9]{2,5}$ ]]; then echo 'Puerto no válido' >&2; exit 2; fi
for cmd in node python3; do
  if ! command -v "$cmd" >/dev/null 2>&1; then echo "Falta $cmd" >&2; exit 2; fi
done
BROWSER=""
for candidate in chromium google-chrome chromium-browser google-chrome-stable; do
  if command -v "$candidate" >/dev/null 2>&1; then BROWSER="$(command -v "$candidate")"; break; fi
done
if [[ -z "$BROWSER" ]]; then
  echo 'No se encontró Chromium/Google Chrome; instala un navegador antes de capturar.' >&2
  exit 2
fi
if [[ "$(id -u)" -eq 0 ]]; then
  echo 'Ejecuta esta prueba como usuario normal, no como root.' >&2
  exit 2
fi
mkdir -p "$OUTPUT"
cd "$ROOT"
node scripts/verify-static.cjs
SERVER_LOG="$(mktemp)"
PROFILE="$(mktemp -d)"
SERVER_PID=""
cleanup() {
  if [[ -n "$SERVER_PID" ]]; then kill "$SERVER_PID" 2>/dev/null || true; wait "$SERVER_PID" 2>/dev/null || true; fi
  rm -f "$SERVER_LOG"
  rm -rf "$PROFILE"
}
trap cleanup EXIT INT TERM
python3 -m http.server "$PORT" --bind 127.0.0.1 >"$SERVER_LOG" 2>&1 &
SERVER_PID=$!
sleep 1
if ! kill -0 "$SERVER_PID" 2>/dev/null; then
  echo 'No se pudo iniciar el servidor local. Comprueba si el puerto está ocupado.' >&2
  cat "$SERVER_LOG" >&2
  exit 1
fi
BASE="http://127.0.0.1:$PORT"
ARGS=(--headless=new --no-first-run --no-default-browser-check --disable-dev-shm-usage --hide-scrollbars --force-device-scale-factor=1 --user-data-dir="$PROFILE")
# Detectar bloqueos por políticas del navegador y no guardar capturas engañosas.
if ! "$BROWSER" "${ARGS[@]}" --virtual-time-budget=2500 --dump-dom "$BASE/" >"$OUTPUT/_verificacion-navegador.html" 2>"$OUTPUT/chromium.log"; then
  echo 'El navegador no pudo abrir la página local.' >&2; exit 1
fi
if ! grep -q 'id="catalogo"' "$OUTPUT/_verificacion-navegador.html"; then
  echo 'El navegador no cargó ArteEnLink: revisa chromium.log y sus políticas.' >&2; exit 1
fi
PAGES=(
  'inicio|/'
  'coleccion-bodas|/categorias/bodas/bodas.html'
  'coleccion-xv-anos|/categorias/xv-anos/xvanos.html'
  'demo-boda-premium|/demos/bodas/demo-boda-premium/demo-boda-premium.html'
  'demo-infantil-premium|/demos/cumpleanos-infantiles/demo-cumpleanos-infantil-premium/demo-cumpleanos-infantil-premium.html'
)
for view in 'movil|390|844' 'escritorio|1440|900'; do
  IFS='|' read -r label width height <<<"$view"
  for item in "${PAGES[@]}"; do
    IFS='|' read -r slug route <<<"$item"
    file="$OUTPUT/${label}-${slug}.png"
    echo "Capturando $label: $route"
    "$BROWSER" "${ARGS[@]}" --window-size="$width,$height" --virtual-time-budget=2800 \
      --screenshot="$file" "$BASE$route" >>"$OUTPUT/chromium.log" 2>&1
    if [[ ! -s "$file" ]]; then echo "Falta captura: $file" >&2; exit 1; fi
  done
done
printf '\nCapturas generadas: %s\n' "$OUTPUT"
printf 'Revisa también: audio, apertura de sobres, interacción táctil y enlaces.\n'
