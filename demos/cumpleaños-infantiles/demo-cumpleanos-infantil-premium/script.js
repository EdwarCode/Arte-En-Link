
        AOS.init();

        // 0. QUITAR PRELOADER
        const preloader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => { preloader.classList.add('oculto'); }, 1200);
        });

        // 1. CONFETI HÍBRIDO
        function launchConfetti() {
            var duration = 3000;
            var end = Date.now() + duration;
            var colors = ['#B2E2F2', '#C2EABD', '#FFD700'];
            (function frame() {
                confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colors, shapes: ['square'] });
                confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colors, shapes: ['square'] });
                confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#FFD700'], shapes: ['star'], scalar: 1.5 });
                confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FFD700'], shapes: ['star'], scalar: 1.5 });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        }

        // LÓGICA DE MÚSICA
        const musicaFondo = document.getElementById('musica-fondo');
        const btnMusica = document.getElementById('btn-musica');
        const iconoMusica = btnMusica.querySelector('i');
        let musicaReproduciendo = false;

        btnMusica.addEventListener('click', () => {
            if (musicaReproduciendo) {
                musicaFondo.pause();
                iconoMusica.classList.remove('girar');
                iconoMusica.classList.replace('ph-music-notes', 'ph-speaker-slash');
            } else {
                musicaFondo.play();
                iconoMusica.classList.add('girar');
                iconoMusica.classList.replace('ph-speaker-slash', 'ph-music-notes');
            }
            musicaReproduciendo = !musicaReproduciendo;
        });

        // 2. SOBRE Y MÚSICA - CON AUDIO ACTIVADO
        function openEnvelope() {
            document.querySelector('.envelope-container').classList.add('open-it');
            launchConfetti();
            
            // Activar música al abrir sobre
            musicaFondo.volume = 0.5;
            musicaFondo.play().then(() => {
                musicaReproduciendo = true;
                if(!iconoMusica.classList.contains('girar')) iconoMusica.classList.add('girar');
            }).catch(e => {
                console.log("Autoplay bloqueado por el navegador.");
                iconoMusica.classList.remove('girar');
            });

            setTimeout(() => {
                document.getElementById('envelope-overlay').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('envelope-overlay').style.display = 'none';
                    AOS.refresh();
                }, 1000);
            }, 1500);
        }

        // 3. CARRUSEL OPTIMIZADO (LIMITADO A 8 FOTOS PARA LA DEMO)
        const slidesData = [];
        for (let i = 1; i <= 8; i++) {
            slidesData.push(`CARRUSEL${i}.jpeg`);
        }

        new Swiper(".mySwiper", {
            effect: "cards",
            grabCursor: true,
            pagination: { el: ".swiper-pagination", dynamicBullets: true },
            observer: true,
            observeParents: true,
            virtual: {
                slides: slidesData,
                renderSlide: function (slideContent, index) {
                    return `
                        <div class="swiper-slide">
                            <img src="${slideContent}" alt="Recuerdo ${index}" loading="lazy">
                        </div>
                    `;
                },
            },
        });

        // 4. TIMELINE OBSERVER
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const icon = entry.target.querySelector('.timeline-icon');
                    if(icon) icon.classList.add('active');
                    if(entry.target.id === 'final-story') launchConfetti();
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));

        // 5. BOTÓN FLOTANTE
        window.addEventListener('scroll', () => {
            const storyEnd = document.querySelector('.story-section').getBoundingClientRect().bottom;
            const floatBtn = document.getElementById('floating-rsvp');
            if (storyEnd < 0) {
                floatBtn.classList.add('visible');
            } else {
                floatBtn.classList.remove('visible');
            }
        });

        // 6. CONTADOR (4:00 PM)
        const targetDate = new Date("Jan 28, 2026 16:00:00").getTime();
        setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;
            document.getElementById('timer').innerText = 
                `${Math.floor(diff / (1000 * 60 * 60 * 24))}d ${Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}h ${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}m ${Math.floor((diff % (1000 * 60)) / 1000)}s`;
        }, 1000);

