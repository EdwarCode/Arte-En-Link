
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Quitar Preloader y activar música automática (si el navegador lo permite)
            const preloader = document.getElementById('preloader');
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = btnMusica.querySelector('i');
            let musicaReproduciendo = false;

            window.addEventListener('load', () => {
                setTimeout(() => { 
                    preloader.classList.add('oculto'); 
                    
                    // Intento de autoplay
                    musicaFondo.volume = 0.4;
                    musicaFondo.play().then(() => {
                        musicaReproduciendo = true;
                        iconoMusica.classList.add('girar');
                    }).catch(err => console.log("Autoplay bloqueado. El usuario debe iniciar el audio."));

                }, 2000); // 2 segundos para que se aprecie bien el nombre brillando
            });

            // Control flotante de música
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

            // 2. Animaciones al hacer scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });
            
            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 3. Lógica del Carrusel de Fotos
            const carrusel = document.getElementById('carrusel');
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');

            if (carrusel && btnPrev && btnNext) {
                btnNext.addEventListener('click', () => {
                    const primerItem = carrusel.querySelector('.foto-item');
                    const estiloCarrusel = window.getComputedStyle(carrusel);
                    const gap = parseInt(estiloCarrusel.gap) || 0;
                    const scrollAmount = primerItem.offsetWidth + gap;
                    carrusel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
                
                btnPrev.addEventListener('click', () => {
                    const primerItem = carrusel.querySelector('.foto-item');
                    const estiloCarrusel = window.getComputedStyle(carrusel);
                    const gap = parseInt(estiloCarrusel.gap) || 0;
                    const scrollAmount = primerItem.offsetWidth + gap;
                    carrusel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
            }

            // 4. Lógica de la Cuenta Regresiva (Ajustada a 15 días)
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 15); 
            targetDate.setHours(16, 0, 0, 0);

            function updateCountdown() {
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
