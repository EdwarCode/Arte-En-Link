
        document.addEventListener('DOMContentLoaded', () => {

            // 1. PRELOADER SIMPLE (CON RUTINA ANTI-FALLOS)
            const preloader = document.getElementById('preloader');
            const hidePreloader = () => {
                if(preloader && !preloader.classList.contains('oculto')) {
                    preloader.classList.add('oculto');
                }
            };
            
            // Intentamos ocultarlo cuando la ventana cargue, o forzamos después de 2.5s máximo
            window.addEventListener('load', () => setTimeout(hidePreloader, 800));
            setTimeout(hidePreloader, 2500);

            // 2. ANIMACIONES SCROLL (INTERSECTION OBSERVER)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 }); // Reducimos el umbral para asegurar que dispare rápido

            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 3. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45);
            targetDate.setHours(12, 0, 0, 0);

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
