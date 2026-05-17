
        document.addEventListener('DOMContentLoaded', () => {
            
            // 0. Lógica del Preloader
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => {
                setTimeout(() => { preloader.classList.add('oculto'); }, 1000);
            });

            // 1. Animaciones al hacer scroll (Fade-in suave)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });
            
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

            // 2. Lógica de la Cuenta Regresiva
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); // Ejemplo: 45 días a partir de hoy
            targetDate.setHours(17, 0, 0, 0);

            function updateCountdown() {
                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;
                
                if (distance < 0) {
                    document.getElementById("contador-xv").innerHTML = "<h3 style='font-family: var(--fuente-nombres); font-size: 2.5rem; color: var(--color-rosa-gold);'>¡El gran día ha llegado!</h3>";
                    return;
                }
                
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

        // 3. Función del botón de WhatsApp
        function confirmarAsistencia() {
            const numeroWhatsApp = "520000000000"; // Reemplazar con el número de los papás o la quinceañera
            const mensaje = "¡Hola! He recibido la invitación para los XV Años de Valentina. 👑\n\nQuiero confirmar mi asistencia. ¡Ahí estaremos para celebrar!";
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');
        }
