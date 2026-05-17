
        document.addEventListener('DOMContentLoaded', () => {

            // 1. PRELOADER
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => {
                setTimeout(() => { preloader.classList.add('oculto'); }, 800);
            });

            // 2. ANIMACIONES SCROLL (Cero Jitter)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 3. CUENTA REGRESIVA
            // Fecha objetivo: Por defecto pondremos unos 30 días a partir de hoy para que la demo se vea funcionando
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
