# Revisión previa al lanzamiento — ArteEnLink Premium
**Rama:** `feat/premium-redesign-macro01-20261117` · **Producción: NO MODIFICADA**.

## Estado comprobado
- 12 categorías verificadas en GitHub: los tres precios publicados se mantienen ($349 / $549 / $799 MXN) y los enlaces comerciales usan el número `525623721854` ya presente en el proyecto.
- 36 demos cuentan con `demo-base.js`: enlaces internos `href="#"` de ejemplo ya no saltan silenciosamente al principio; muestran un aviso. Enlaces sociales identificables se dirigen a los perfiles comerciales existentes.
- Se eliminaron tres referencias CSS a PNG inexistentes de la demo infantil Premium, conservando una textura decorativa de CSS sin peticiones 404.
- El verificador `scripts/verify-static.cjs` ahora inspecciona además los recursos CSS. **Su ejecución completa en un clon local está pendiente**.
- Preguntas frecuentes agregadas a la portada para explicar demos, música con licencia, revisiones y vigencia sin prometer plazos no confirmados.

## Capturas móviles y escritorio — PENDIENTES DE EJECUCIÓN
Ejecutar como usuario normal, en un clon de la rama. No instala dependencias ni despliega el sitio.

```bash
git switch feat/premium-redesign-macro01-20261117
node scripts/verify-static.cjs
bash scripts/qa-screenshots.sh
```

Requisitos: Node.js, Python 3 y Chromium/Google Chrome. El script abre un servidor solo en `127.0.0.1`, toma diez capturas (390×844 / 1440×900, cinco páginas) en `qa-output/` y lo cierra al terminar. El navegador usa un perfil temporal; los archivos de resultados están ignorados por Git.

**No equivale a pruebas táctiles reales**: en iPhone/Safari y Android/Chrome revisar apertura, scroll horizontal, carga de fuentes, modales, texto, audio y acciones WhatsApp. La pantalla de introducción/sobre de cada demo puede requerir clic para ver el interior.

## Aceptación visual y funcional
- [ ] Portada y categorías sin contenido solapado a 390px, 768px y 1440px
- [ ] Todas las 36 demos se abren en navegador real sin errores de consola ni contenido faltante
- [ ] Botones CTA de catálogo y WhatsApp llevan al destino previsto
- [ ] Enlaces ilustrativos presentan aviso claro y no simulan transacciones/RSVP reales
- [ ] Reproductor de audio funciona tras gesto del usuario y puede pausarse
- [ ] Teclado, foco, contraste y `prefers-reduced-motion` revisados
- [ ] Lighthouse móvil y escritorio; corregir regresiones importantes antes del merge
- [ ] Licencia comercial y derechos de cada pista e imagen verificados, especialmente artistas reconocibles
- [ ] Consentimiento y privacidad de páginas con nombres/fotografías reales verificados
- [ ] Teléfono, email, plazos, vigencia, precio, revisiones y condiciones contractuales confirmados por la persona responsable

**NO-GO** hasta completar los checks. No realizar PR, merge, despliegue, DNS, publicación ni promoción sin autorización del propietario.

## Revisión adicional de contenido y seguridad (rama, sin publicación)
- **Oferta comercial armonizada** en las 12 colecciones: se retiraron las promesas rígidas de «24 horas», «cambios ilimitados» y anticipo obligatorio de 50% hasta que se confirmen formalmente. Se mantienen intactos los precios de $349, $549 y $799 MXN. El verificador estático ahora protege esta coherencia.
- **Tres demos reforzadas**: los muros de mensajes de Bautizos Premium y XV Premium ya representan nombres y textos con `textContent`, no con plantillas `innerHTML`. La galería de Graduaciones Premium crea elementos `img` mediante DOM. Se agregó recuperación segura ante `localStorage` defectuoso.
- **Bloqueo vigente**: no hay reporte visual de capturas ni pruebas de comportamiento real en Chrome, Firefox o Safari. Los comandos se incluyeron para el equipo autorizado; la aprobación de interfaz debe basarse en sus resultados.
- **Sin permisos para lanzar**: ni el número de WhatsApp, ni las licencias multimedia, ni la vigencia/duración, ni el proceso de pago, ni los datos personales se consideran auditados externamente por estas pruebas de código.
