
        document.addEventListener('DOMContentLoaded', () => {

            // 1. EL PERGAMINO SAGRADO (Apertura y Música)
            const btnAbrir = document.getElementById('btn-abrir-pergamino');
            const pergamino = document.getElementById('pergamino-intro');
            const audio = document.getElementById('audio-fondo');
            const btnMusica = document.getElementById('btn-musica');

            btnAbrir.addEventListener('click', () => {
                pergamino.classList.add('abierto');
                document.body.classList.remove('bloqueado');
                
                // Disparar animaciones de portada
                setTimeout(() => {
                    document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('visible'));
                }, 800);

                // Iniciar Audio
                audio.play().then(() => {
                    btnMusica.classList.add('visible', 'girando');
                }).catch(() => {
                    btnMusica.classList.add('visible'); // Muestra botón aunque falle autoplay
                });
            });

            // 2. PARALLAX SUTIL EN HERO
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroImg = document.getElementById('hero-img');
                if(heroImg && scrolled < window.innerHeight) {
                    heroImg.style.transform = `translateY(${scrolled * 0.25}px)`;
                }
            });

            // 3. INTERSECTION OBSERVER (Efectos Cascada)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });
            
            // Observamos todo excepto el hero que se anima al abrir
            document.querySelectorAll('section .fade-up, footer.fade-up').forEach(el => observer.observe(el));

            // 4. GENERADOR DE CHISPAS
            const contenedorChispas = document.getElementById('chispas-espiritu');
            if(contenedorChispas) {
                for(let i=0; i<20; i++) {
                    let chispa = document.createElement('div');
                    chispa.className = 'chispa';
                    chispa.style.left = Math.random() * 100 + 'vw';
                    chispa.style.animationDuration = (Math.random() * 10 + 12) + 's';
                    chispa.style.animationDelay = (Math.random() * 10) + 's';
                    if(Math.random() > 0.7) {
                        chispa.style.background = 'var(--color-acento-vino)';
                        chispa.style.boxShadow = '0 0 6px var(--color-oro)';
                    }
                    contenedorChispas.appendChild(chispa);
                }
            }

            // 5. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 30);
            targetDate.setHours(12, 0, 0, 0);

            function updateCountdown() {
                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;
                if (distance < 0) return;

                document.getElementById("dias").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                document.getElementById("horas").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                document.getElementById("minutos").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                document.getElementById("segundos").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }
            setInterval(updateCountdown, 1000);
            updateCountdown();
        });

        // Función global para pausar/reproducir música
        function toggleMusica() {
            const audio = document.getElementById('audio-fondo');
            const btnMusica = document.getElementById('btn-musica');
            if(audio.paused) {
                audio.play();
                btnMusica.classList.add('girando');
            } else {
                audio.pause();
                btnMusica.classList.remove('girando');
            }
        }
