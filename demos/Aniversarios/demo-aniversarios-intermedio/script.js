
        document.addEventListener('DOMContentLoaded', () => {

            // 1. INICIALIZAR VANTA.JS (Fondo de Niebla 3D)
            // Se inicializa rápido para que esté listo antes de que el preloader se vaya
            try {
                VANTA.FOG({
                    el: "#vanta-bg",
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0xd4af37, /* Oro */
                    midtoneColor: 0x4a0e17,   /* Borgoña sutil */
                    lowlightColor: 0x020611,  /* Navy oscuro */
                    baseColor: 0x0a192f,      /* Navy base */
                    blurFactor: 0.60,
                    speed: 1.50,
                    zoom: 1.00
                });
            } catch (e) {
                console.log("Vanta WebGL Fallback activo");
            }

            // 2. PRELOADER Y SOBRE 3D (Lógica Anti-Fallos de Audio NASA)
            const preloader = document.getElementById('preloader');
            const pantallaSobre = document.getElementById('pantalla-sobre');
            const sobreBtn = document.getElementById('sobre-btn');
            const selloOro = document.getElementById('sello-oro');
            const solapaArriba = document.getElementById('solapa-arriba');
            const cartaInterior = document.getElementById('carta-interior');
            const instruccionSobre = document.getElementById('instruccion-sobre');
            
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = document.getElementById('icono-musica');
            
            let musicaReproduciendo = false;
            let sobreAbierto = false;
            let playPromise;
            let isAudioProcessing = false;

            // Retirar preloader a los 2 segundos
            setTimeout(() => { preloader.classList.add('oculto'); }, 2000);

            // TÁCTICA DE MICRO-DESFASE PARA AUDIO Y GRÁFICOS
            sobreBtn.addEventListener('click', () => {
                if(sobreAbierto) return;
                sobreAbierto = true;
                
                instruccionSobre.style.display = 'none';

                // Paso 1: Disparo Síncrono del Audio (Garantizado)
                try {
                    musicaFondo.volume = 0.5;
                    if (musicaFondo.readyState === 0) musicaFondo.load();
                    
                    playPromise = musicaFondo.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            musicaReproduciendo = true;
                            iconoMusica.classList.replace('ph-play-circle', 'ph-pause-circle');
                            iconoMusica.classList.add('girar');
                        }).catch(err => console.warn('Requiere interacción manual.', err));
                    }
                } catch(e) {}

                // Paso 2: Micro-desfase de 50ms para desahogar procesador e iniciar 3D
                setTimeout(() => {
                    const tl = anime.timeline({ easing: 'easeOutExpo' });

                    tl.add({
                        targets: selloOro, scale: 1.5, opacity: 0, duration: 400
                    }).add({
                        // Abrir solapa
                        targets: solapaArriba, rotateX: 180, duration: 800, easing: 'easeOutQuad'
                    }, '-=200').add({
                        // Sacar carta
                        targets: cartaInterior, translateY: -80, duration: 600
                    }, '-=400').add({
                        // Desvanecer el sobre completo
                        targets: sobreBtn, scale: 1.1, opacity: 0, duration: 800 
                    }, '+=300').add({
                        // Quitar pantalla negra
                        targets: pantallaSobre, opacity: 0, duration: 800, 
                        complete: () => { pantallaSobre.style.display = 'none'; }
                    }, '-=600');
                }, 50);
            });

            // Control manual de música
            btnMusica.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (isAudioProcessing) return;
                isAudioProcessing = true;

                try {
                    if (musicaFondo.paused) {
                        if (musicaFondo.readyState === 0) musicaFondo.load();
                        musicaFondo.volume = 0.5;
                        
                        playPromise = musicaFondo.play();
                        if (playPromise !== undefined) await playPromise;
                        
                        musicaReproduciendo = true;
                        iconoMusica.classList.add('girar');
                        iconoMusica.classList.replace('ph-play-circle', 'ph-pause-circle');
                    } else {
                        if (playPromise !== undefined) await playPromise.catch(() => {});
                        
                        musicaFondo.pause();
                        musicaReproduciendo = false;
                        iconoMusica.classList.remove('girar');
                        iconoMusica.classList.replace('ph-pause-circle', 'ph-play-circle');
                    }
                } catch (error) {
                    console.error('Error con el reproductor:', error);
                } finally {
                    isAudioProcessing = false;
                }
            });

            // 3. ANIMACIONES SCROLL Y TIMELINE (Cero Jitter)
            const progresoTimeline = document.getElementById('linea-progreso');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        
                        // Revelado normal de tarjetas
                        if(entry.target.classList.contains('fade-up')) {
                            anime({ targets: entry.target, translateY: [40, 0], opacity: [0, 1], duration: 1000, easing: 'easeOutQuart' });
                            entry.target.classList.remove('fade-up'); // Limpiar clase para evitar re-triggers
                            observer.unobserve(entry.target);
                        }
                        
                        // Lógica especial para Timeline (Dibujado automático)
                        if(entry.target.classList.contains('hito-item')) {
                            const progresoTarget = entry.target.getAttribute('data-progreso');
                            progresoTimeline.style.height = progresoTarget + '%';
                            
                            const isRowReverse = window.getComputedStyle(entry.target).flexDirection === 'row-reverse';
                            
                            anime({ 
                                targets: entry.target, opacity: [0, 1], 
                                translateX: isRowReverse ? [-30, 0] : [30, 0], duration: 800, easing: 'easeOutBack' 
                            });
                            
                            setTimeout(() => { entry.target.classList.add('activado'); }, 200);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.fade-up, .hito-item').forEach(el => observer.observe(el));

            // 4. INICIALIZAR SWIPER.JS (Galería 3D Coverflow)
            const swiper = new Swiper(".mySwiper", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                coverflowEffect: {
                    rotate: 20, /* Rotación suave de las tarjetas */
                    stretch: 0,
                    depth: 150, /* Profundidad 3D */
                    modifier: 1,
                    slideShadows: true, /* Sombras dinámicas según el giro */
                },
                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                },
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: true,
                }
            });

            // 5. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 30);
            targetDate.setHours(17, 0, 0, 0);

            function updateCountdown() {
                const elDias = document.getElementById("dias");
                const elHoras = document.getElementById("horas");
                const elMinutos = document.getElementById("minutos");
                const elSegundos = document.getElementById("segundos");
                
                if (!elDias || !elHoras || !elMinutos || !elSegundos) return;

                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;
                if (distance < 0) return;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById("dias").innerText = days.toString().padStart(2, '0');
                document.getElementById("horas").innerText = hours.toString().padStart(2, '0');
                document.getElementById("minutos").innerText = minutes.toString().padStart(2, '0');
                document.getElementById("segundos").innerText = seconds.toString().padStart(2, '0');
            }

            setInterval(updateCountdown, 1000);
            updateCountdown();

        });
