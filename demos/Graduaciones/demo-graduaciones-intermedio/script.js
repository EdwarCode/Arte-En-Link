
        document.addEventListener('DOMContentLoaded', () => {

            // 1. LÓGICA DE ENTRADA (PRELOADER 3 SEG -> CARPETA 3D)
            const preloader = document.getElementById('preloader');
            const pantallaCarpeta = document.getElementById('pantalla-carpeta');
            const carpetaBtn = document.getElementById('carpeta-btn');
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = document.getElementById('icono-musica');
            
            let musicaReproduciendo = false;
            let carpetaAbierta = false;

            // Retraso exacto de 3 segundos
            setTimeout(() => { 
                preloader.classList.add('oculto'); 
            }, 3000);

            // Interacción: Abrir Carpeta
            carpetaBtn.addEventListener('click', () => {
                if(carpetaAbierta) return;
                carpetaAbierta = true;
                
                // 1. Animación CSS 3D
                carpetaBtn.classList.add('abierta');
                
                // 2. Encender la Música
                musicaFondo.volume = 0.5;
                musicaFondo.play().then(() => {
                    musicaReproduciendo = true;
                    iconoMusica.classList.replace('ph-play-circle', 'ph-pause-circle');
                    iconoMusica.classList.add('girar');
                }).catch(e => console.log("Interacción requerida para audio."));
                
                // 3. Desvanecer la pantalla de la carpeta para revelar la web (1.2s después)
                setTimeout(() => {
                    pantallaCarpeta.classList.add('oculto');
                }, 1200);
            });

            // Control Manual de Música
            btnMusica.addEventListener('click', () => {
                if (musicaReproduciendo) {
                    musicaFondo.pause();
                    iconoMusica.classList.remove('girar');
                    iconoMusica.classList.replace('ph-pause-circle', 'ph-play-circle');
                } else {
                    musicaFondo.play();
                    iconoMusica.classList.add('girar');
                    iconoMusica.classList.replace('ph-play-circle', 'ph-pause-circle');
                }
                musicaReproduciendo = !musicaReproduciendo;
            });

            // 2. ANIMACIONES SCROLL (Cero Jitter / Translate3d)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 3. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 30);
            targetDate.setHours(17, 0, 0, 0);

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
