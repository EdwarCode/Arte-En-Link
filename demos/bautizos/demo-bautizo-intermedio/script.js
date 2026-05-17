
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. LÓGICA DE LA PANTALLA DE BIENVENIDA (SOBRE VIRTUAL) Y MÚSICA
            const btnAbrir = document.getElementById('btn-abrir');
            const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = btnMusica.querySelector('i');
            let musicaReproduciendo = false;

            btnAbrir.addEventListener('click', () => {
                // Ocultar pantalla
                pantallaBienvenida.classList.add('abierto');
                
                // Reproducir música suave
                musicaFondo.volume = 0.4; 
                musicaFondo.play().then(() => {
                    musicaReproduciendo = true;
                    if(!iconoMusica.classList.contains('girar')) iconoMusica.classList.add('girar');
                }).catch(error => {
                    console.log("Autoplay bloqueado por el navegador.");
                    iconoMusica.classList.remove('girar');
                });
                
                // Disparar animaciones de la portada
                document.querySelectorAll('.portada .fade-up').forEach(el => el.classList.add('visible'));
            });

            // Botón flotante de música
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

            // 2. LÓGICA DE MOSTRAR REGALOS
            const btnRegalos = document.getElementById('btn-regalos');
            const datosRegalos = document.getElementById('datos-regalos');
            btnRegalos.addEventListener('click', () => {
                datosRegalos.classList.toggle('visible');
                btnRegalos.innerText = datosRegalos.classList.contains('visible') ? "Ocultar Datos Bancarios" : "Ver Datos Bancarios";
            });

            // 3. ANIMACIONES AL HACER SCROLL
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });
            
            // Excluimos la portada para que se anime al abrir el sobre
            document.querySelectorAll('section .fade-up, footer .fade-up').forEach(el => observer.observe(el));

            // 4. LÓGICA DEL CARRUSEL DE FOTOS (Mobile First exacto)
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

            // 5. LÓGICA DE LA CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); 
            targetDate.setHours(11, 0, 0, 0);

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
