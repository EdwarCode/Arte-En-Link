# ArteEnLink — Macroentrega 01 · renovación editorial premium
Fecha: 2026-11-17
Rama: `feat/premium-redesign-macro01-20261117`
Fuente: `main@f005f74225de68eee2268e2429d0c12752420767`
Estado: **CANDIDATO PARA REVISIÓN — NO APROBADO PARA PRODUCCIÓN**

## Qué se hizo
- Nueva portada comercial `index.html` + `premium.css` + `script.js`: tipografía editorial, identidad tinta/dorado/marfil, catálogo completo, foto real existente del repositorio, demostración accesible, CTA y paquetes comerciales intactos.
- Sistema visual `premium-collection.css` aplicado a las 12 categorías; 36 previews antes remotos se sustituyeron con WebP locales; metadatos y URL canónicas por categoría.
- Corrección de referencias locales inexistentes: ruta de imagen de bodas en portada; enlaces de regreso de demos; ocho decoraciones PNG ausentes reemplazadas por recursos tipográficos sin imágenes faltantes; 2 rutas de audio reparadas utilizando archivos ya presentes. Las licencias musicales siguen pendientes.
- 36 demos HTML: CSS accesibilidad `demo-base.css`, metadatos `noindex`, carga diferida de galerías y audio bajo demanda.
- RSVPs de demostración sin envío real a teléfono ficticio: enlaces estáticos explican que son ejemplos; 12 scripts con botones dinámicos se protegen por `demo-base.js`. **No se guardan ni transmiten confirmaciones de esta demo.**
- Portada SEO, `robots.txt`, `sitemap.xml` (solo home y categorías), favicon vectorial propio.
- Noindex en 2 invitaciones personalizadas: medida de indexación, **no es control de acceso**. Revisar consentimiento de las personas involucradas y enlaces públicos antes de lanzar.

## Alcance y límites
- `main`, despliegue, dominio, DNS, hosting y cuentas externas permanecen sin modificación.
- No se abrió PR, no se hizo merge ni se publicó ninguna revisión visual.
- No se instaló framework ni se alteraron los diseños internos individuales salvo rutas, señales de demostración y medidas puntuales de accesibilidad/performance.
- No se obtuvieron fotografías nuevas ni licencias musicales. Algunas pistas presentes en el repositorio indican artistas comerciales; **verificar autorización antes de usar en clientes**.
- El repositorio puede contener invitaciones a eventos concretos con imágenes y datos de personas; `noindex` no los vuelve privados.
- El texto de ofertas comerciales y los precios son candidatos: confirmar condiciones de entrega, revisiones y funciones.
- **Las demos no equivalen a RSVP operativo**: el formulario real requiere destinatario validado y, si se espera persistencia/seguridad de pases, un servicio del lado del servidor.

## Validaciones efectuadas
- Lectura de árbol GitHub + comprobación estática de rutas `src`, `href`, `poster` en la portada, 12 colecciones y 36 demos: **0 referencias a archivos locales inexistentes**, después de excluir anchors/URLs externas.
- Prueba de sintaxis JavaScript (compilación sin ejecución) de los 12 scripts de demos intervenidos: **12/12 PASS**.
- En esos 12 scripts y en el HTML de demos, sin apariciones del número ficticio `520000000000` para las rutas inspeccionadas.
- **NO EJECUTADO:** navegador real, Lighthouse, pruebas de audio reproducido, RSVP E2E, conexión WhatsApp, contraste automatizado, imágenes obtenidas por red, cumplimiento legal o deploy.

## Cómo revisar localmente (sin despliegue)
```bash
git clone https://github.com/EdwarCode/Arte-En-Link.git
cd Arte-En-Link
git switch feat/premium-redesign-macro01-20261117
python3 -m http.server 8000
```
Abrir `http://localhost:8000/` en navegador. Revisar los 36 enlaces a demos desde las 12 categorías en Chrome, Firefox y Safari móvil. No abrir los HTML con `file://`: varias rutas absolutas requieren un servidor web con raíz en el repositorio.

## Checklist previo a aprobación
- [ ] QA manual visual y navegación desktop/móvil, incluido menú, elementos interactivos y demos
- [ ] Validar contraste, foco de teclado, lector de pantalla, movimiento reducido y tiempos Core Web Vitals
- [ ] Revisión legal de todas las canciones y autorización de fotografías
- [ ] Revisión de privacidad y destinatarios definitivos para invitaciones reales; bloquear acceso si hace falta
- [ ] Confirmar condiciones comerciales, precios y correo de contacto
- [ ] Revisar cualquier dependencia externa de demos, enlaces de mapa y funciones simuladas
- [ ] Aprobación explícita del titular **antes** de merge, despliegue o difusión
