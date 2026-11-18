# ArteEnLink

Catálogo de **invitaciones digitales interactivas** realizado con HTML, CSS y JavaScript sin framework obligatorio.

## Estructura
- `index.html`, `premium.css`, `script.js`: escaparate comercial y seis preguntas frecuentes.
- `categorias/`: 12 colecciones de eventos, conectadas por `premium-collection.css`.
- `demos/`: 36 demostraciones en niveles Básico, Intermedio y Premium.
- `assets/img/` y `assets/audio/`: recursos locales; comprueba propiedad y licencia antes de usar en trabajos comerciales.
- `demo-base.js`, `demo-base.css`: explica los botones de ejemplo y evita enviar confirmaciones a teléfonos ficticios.
- `ingrid-yesenia/`, `vicente/`: páginas personalizadas. Requieren consentimiento y análisis de privacidad; `noindex` **no las protege con contraseña**.

## Vista previa local — sin despliegue
```bash
git switch feat/premium-redesign-macro01-20261117
node scripts/verify-static.cjs
python3 -m http.server 8000 --bind 127.0.0.1
```
Abre `http://127.0.0.1:8000/`. Usa servidor local, no doble clic sobre `index.html`, porque hay rutas absolutas.

## Capturas en móvil y escritorio
```bash
bash scripts/qa-screenshots.sh
```
El script exige Node.js, Python 3 y Chromium/Google Chrome, utiliza solo un servidor local temporal y genera imágenes en `qa-output/` (carpeta ignorada por Git). Estas capturas **no reemplazan** la prueba manual en iPhone y Android.

## Política de publicación
Esta rama es un **candidato**, no el sitio en producción. No fusionar con `main` ni desplegar hasta contar con aprobación expresa y el checklist de `docs/REVISION-PRELANZAMIENTO-02.md` satisfecho.

Los precios están tomados del catálogo original. Anticipos, plazos de entrega, revisiones, duración de los enlaces y licencias audiovisuales deben confirmarse antes de contratar con clientes.
