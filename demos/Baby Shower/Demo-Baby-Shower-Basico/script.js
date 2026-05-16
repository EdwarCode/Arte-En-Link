
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Quitar Preloader
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => {
                setTimeout(() => { preloader.classList.add('oculto'); }, 800);
            });

            // 2. Animaciones al hacer scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });
            
            // Observamos todo excepto la portada que ya es visible
            document.querySelectorAll('section .fade-up, footer .fade-up').forEach(el => observer.observe(el));

            // 3. Lógica de la Cuenta Regresiva (Ajustada a 45 días)
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); 
            targetDate.setHours(16, 0, 0, 0); // 4:00 PM

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