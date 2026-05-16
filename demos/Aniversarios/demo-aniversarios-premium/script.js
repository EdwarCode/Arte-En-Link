
        document.addEventListener('DOMContentLoaded', () => {

            // 1. INICIALIZAR FONDO WEBGL (VANTA WAVES VIP - SEDA DE TERCIOPELO)
            try {
                VANTA.WAVES({
                    el: "#vanta-bg",
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x070a12,       /* Negro muy profundo y cálido */
                    shininess: 25.00,      /* Acabado satinado, no tan brillante */
                    waveHeight: 15.00,     /* Oleaje elegante y suave */
                    waveSpeed: 0.30,       /* Movimiento súper lento (tela al viento) */
                    zoom: 0.85
                });
            } catch(e) { console.log("WebGL Waves Fallback activado"); }

            // 2. PRELOADER Y UNBOXING ESTUCHE TERCIOPELO 3D (AUDIO SÍNCRONO NASA)
            const preloader = document.getElementById('preloader');
            const pantallaUnboxing = document.getElementById('pantalla-unboxing');
            const estucheBtn = document.getElementById('estuche-btn');
            const tapaTerciopelo = document.getElementById('tapa-terciopelo');
            const sello = document.getElementById('sello-oro');
            const instruccion = document.getElementById('instruccion');
            
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = document.getElementById('icono-musica');
            
            let musicaReproduciendo = false;
            let unboxingHecho = false;
            let playPromise; 
            let isAudioProcessing = false;

            // Retirar preloader a los 2.5s
            setTimeout(() => { 
                anime({ targets: preloader, opacity: 0, duration: 800, easing: 'linear', complete: () => preloader.style.display = 'none' }); 
            }, 2500);

            // TÁCTICA DE APERTURA (Semáforo Audio y 3D)
            estucheBtn.addEventListener('click', () => {
                if(unboxingHecho) return;
                unboxingHecho = true;
                
                instruccion.style.display = 'none';

                // AUDIO DIRECTO SÍNCRONO
                try {
                    musicaFondo.volume = 0.5;
                    musicaFondo.muted = false;
                    if (musicaFondo.readyState === 0) musicaFondo.load();
                    
                    playPromise = musicaFondo.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            musicaReproduciendo = true;
                            iconoMusica.classList.add('girar', 'ph-pause-circle');
                            iconoMusica.classList.remove('ph-play-circle');
                        }).catch(err => console.warn('Requiere interacción manual.', err));
                    }
                } catch(e) {}

                // ANIMACIONES 3D (Con micro-desfase para CPU)
                setTimeout(() => {
                    const tl = anime.timeline({ easing: 'easeOutExpo' });
                    tl.add({
                        targets: sello, scale: 1.5, opacity: 0, duration: 500
                    }).add({
                        // Abrir tapa hacia atrás (rotación X negativa)
                        targets: tapaTerciopelo, rotateX: -140, duration: 1200, easing: 'spring(1, 80, 10, 0)' 
                    }, '-=300').add({
                        // Desvanecer el estuche para revelar la invitación
                        targets: estucheBtn, scale: 1.1, opacity: 0, duration: 800 
                    }, '+=500').add({
                        // Quitar pantalla negra
                        targets: pantallaUnboxing, opacity: 0, duration: 1000, 
                        complete: () => { pantallaUnboxing.style.display = 'none'; }
                    }, '-=600');
                }, 50);
            });

            // Control manual de música (Semáforo)
            btnMusica.addEventListener('click', async (e) => {
                e.preventDefault(); e.stopPropagation();
                if (isAudioProcessing) return;
                isAudioProcessing = true;

                try {
                    if (musicaFondo.paused) {
                        if (musicaFondo.readyState === 0) musicaFondo.load();
                        musicaFondo.volume = 0.5;
                        playPromise = musicaFondo.play();
                        if (playPromise !== undefined) await playPromise;
                        iconoMusica.classList.add('girar', 'ph-pause-circle');
                        iconoMusica.classList.remove('ph-play-circle');
                        musicaReproduciendo = true;
                    } else {
                        if (playPromise !== undefined) await playPromise.catch(() => {});
                        musicaFondo.pause();
                        iconoMusica.classList.remove('girar', 'ph-pause-circle');
                        iconoMusica.classList.add('ph-play-circle');
                        musicaReproduciendo = false;
                    }
                } catch (error) { console.error('Error de audio:', error); } 
                finally { isAudioProcessing = false; }
            });

            // 3. SCROLL REVEAL Y LÍNEA DE TIEMPO DIBUJADA
            const progresoTimeline = document.getElementById('linea-progreso');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if(entry.target.classList.contains('reveal-item')) {
                            anime({ targets: entry.target, translateY: [50, 0], opacity: [0, 1], duration: 1200, easing: 'easeOutQuart' });
                            observer.unobserve(entry.target);
                        }
                        if(entry.target.classList.contains('hito-item')) {
                            const progresoTarget = entry.target.getAttribute('data-progreso');
                            progresoTimeline.style.height = progresoTarget + '%';
                            
                            const isRowReverse = window.getComputedStyle(entry.target).flexDirection === 'row-reverse';
                            anime({ targets: entry.target, opacity: [0, 1], translateX: isRowReverse ? [-40, 0] : [40, 0], duration: 1000, easing: 'easeOutBack' });
                            
                            setTimeout(() => { entry.target.classList.add('activado'); }, 200);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            }, { threshold: 0.15 });
            document.querySelectorAll('.reveal-item, .hito-item').forEach(el => observer.observe(el));

            // 4. CUENTA REGRESIVA
            const targetDate = new Date(); targetDate.setDate(targetDate.getDate() + 30); targetDate.setHours(17, 0, 0, 0);
            function updateCountdown() {
                const elDias = document.getElementById("dias");
                if(!elDias) return;
                const distance = targetDate.getTime() - new Date().getTime();
                if (distance < 0) return;
                elDias.innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                document.getElementById("horas").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                document.getElementById("minutos").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                document.getElementById("segundos").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }
            setInterval(updateCountdown, 1000); updateCountdown();

            // 5. GALERÍA SWIPER COVERFLOW 3D + LIGHTBOX (ZOOM VIP)
            const swiper = new Swiper(".mySwiper", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                coverflowEffect: { rotate: 25, stretch: 0, depth: 200, modifier: 1, slideShadows: true },
                loop: true,
                autoplay: { delay: 3500, disableOnInteraction: false }
            });

            // Lógica del Lightbox (Zoom VIP)
            const lightbox = document.getElementById('lightbox-vip');
            const lightboxImg = document.getElementById('lightbox-img');
            const cerrarLightboxBtn = document.getElementById('cerrar-lightbox');

            document.querySelectorAll('.swiper-slide img').forEach(img => {
                img.addEventListener('click', (e) => {
                    // Detener swiper al abrir foto
                    swiper.autoplay.stop();
                    lightboxImg.src = e.target.src;
                    lightbox.classList.add('activo');
                });
            });

            const cerrarLightbox = () => {
                lightbox.classList.remove('activo');
                // Reanudar swiper al cerrar
                swiper.autoplay.start();
            };

            cerrarLightboxBtn.addEventListener('click', cerrarLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) cerrarLightbox();
            });

            // 6. SÚPER FORMULARIO VIP (ENVÍO WHATSAPP)
            document.getElementById('btn-enviar-rsvp').addEventListener('click', () => {
                const nombreInput = document.getElementById('rsvp-nombre');
                const nombre = nombreInput.value.trim();
                const mensaje = document.getElementById('vip-mensaje').value.trim() || "(Feliz aniversario, que sigan sumando años llenos de amor y salud.)";
                const cancion = document.getElementById('vip-cancion').value.trim() || "(La que ustedes gusten, bailaré de todo.)";
                
                if(!nombre) {
                    nombreInput.style.borderColor = '#ff4d4d';
                    nombreInput.placeholder = '¡El nombre es necesario!';
                    anime({ targets: nombreInput, translateX: [0, -10, 10, -10, 10, 0], duration: 400, easing: 'easeInOutSine' });
                    return;
                }
                
                anime({ targets: '#btn-enviar-rsvp', scale: [1, 0.95, 1], duration: 300, easing: 'easeInOutQuad', 
                    complete: () => {
                        const textoWp = `¡Hola! ✨\n\nSoy *${nombre}* y es un inmenso honor confirmar mi asistencia a sus Bodas de Oro.\n\n*💌 Mi mensaje para ustedes:*\n"${mensaje}"\n\n*🎵 Canción que pido para el DJ:*\n"${cancion}"\n\n¡Nos vemos en la fiesta! 🥂`;
                        window.open(`https://wa.me/520000000000?text=${encodeURIComponent(textoWp)}`, '_blank');
                    }
                });
            });

        });