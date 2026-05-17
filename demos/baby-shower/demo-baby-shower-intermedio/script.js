
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Quitar Preloader al primer clic/toque (Políticas de Autoplay de Audio)
            const preloader = document.getElementById('preloader');
            const musica = document.getElementById('musicaFondo');
            const btnMusica = document.getElementById('btnMusica');
            const iconoMusica = btnMusica.querySelector('i');

            // Necesitamos interacción del usuario para reproducir audio
            document.body.addEventListener('click', function iniciarApp() {
                preloader.classList.add('oculto');
                
                // Intentar reproducir música
                musica.play().then(() => {
                    btnMusica.classList.add('reproduciendo');
                    iconoMusica.classList.replace('ph-speaker-slash', 'ph-speaker-high');
                }).catch(e => console.log("Autoplay prevenido. El usuario debe usar el botón."));
                
                // Quitar el event listener para que no se dispare en cada clic
                document.body.removeEventListener('click', iniciarApp);
            }, { once: true });

            // 2. Intersection Observer (Animaciones de Scroll)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
                });
            }, { threshold: 0.15 });
            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 3. Cuenta Regresiva
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); 
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

        // Funciones auxiliares
        function toggleMusica() {
            const musica = document.getElementById('musicaFondo');
            const btn = document.getElementById('btnMusica');
            const icono = btn.querySelector('i');

            if (musica.paused) {
                musica.play();
                btn.classList.add('reproduciendo');
                icono.classList.replace('ph-speaker-slash', 'ph-speaker-high');
            } else {
                musica.pause();
                btn.classList.remove('reproduciendo');
                icono.classList.replace('ph-speaker-high', 'ph-speaker-slash');
            }
        }

        function toggleCuenta() {
            document.getElementById('datosCuenta').classList.toggle('visible');
        }

        function copiarCLABE() {
            // Método alternativo (fallback) compatible con iframes y entornos restringidos
            var textArea = document.createElement("textarea");
            textArea.value = "012345678910111213";
            
            // Estilos para evitar que la pantalla haga scroll hacia abajo o se muestre
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.opacity = "0";
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var exitoso = document.execCommand('copy');
                if(exitoso) {
                    // En un entorno real se recomienda usar un Toast/Modal bonito en lugar de alert
                    alert('¡CLABE copiada al portapapeles!');
                } else {
                    alert('No se pudo copiar automáticamente. Por favor cópiala manualmente.');
                }
            } catch (err) {
                console.error('Error al copiar: ', err);
            }

            document.body.removeChild(textArea);
        }
