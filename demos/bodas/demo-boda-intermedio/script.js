
        document.addEventListener('DOMContentLoaded', () => {
            const btnAbrir = document.getElementById('btn-abrir');
            const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = btnMusica.querySelector('i');
            let musicaReproduciendo = false;

            btnAbrir.addEventListener('click', () => {
                pantallaBienvenida.classList.add('abierto');
                musicaFondo.volume = 0.5; 
                musicaFondo.play().then(() => {
                    musicaReproduciendo = true;
                    if(!iconoMusica.classList.contains('girar')) iconoMusica.classList.add('girar');
                }).catch(error => {
                    console.log("Autoplay blocked.");
                    iconoMusica.classList.remove('girar');
                });
            });

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

            const btnRegalos = document.getElementById('btn-regalos');
            const datosRegalos = document.getElementById('datos-regalos');
            btnRegalos.addEventListener('click', () => {
                datosRegalos.classList.toggle('visible');
                btnRegalos.innerText = datosRegalos.classList.contains('visible') ? "Ocultar Detalles" : "Ver Detalles";
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            const carrusel = document.getElementById('carrusel');
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');

            if (carrusel && btnPrev && btnNext) {
                btnNext.addEventListener('click', () => {
                    const scrollAmount = carrusel.offsetWidth * 0.8;
                    carrusel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
                
                btnPrev.addEventListener('click', () => {
                    const scrollAmount = carrusel.offsetWidth * 0.8;
                    carrusel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
            }

            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 30); 
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