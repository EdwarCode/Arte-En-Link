
        document.addEventListener('DOMContentLoaded', () => {
            // 1. PRELOADER Y DATOS URL (Magia VIP)
            const preloader = document.getElementById('preloader');
            const urlParams = new URLSearchParams(window.location.search);
            const nombreParam = urlParams.get('invitado');
            const pasesParam = urlParams.get('pases');
            
            if (nombreParam) document.getElementById('nombre-invitado').innerText = nombreParam;
            if (pasesParam) document.getElementById('num-pases').innerText = pasesParam;
            
            window.addEventListener('load', () => { 
                setTimeout(() => { preloader.classList.add('oculto'); }, 800); 
            });

            // 2. ANIMACIONES SCROLL
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 3. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); 
            targetDate.setHours(20, 0, 0, 0);

            function updateCountdown() {
                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;
                
                if (distance < 0) {
                    document.getElementById("contador-xv").innerHTML = "<div style='font-family: var(--font-display); font-size: 1.5rem; color: var(--color-neon);'>¡EL EVENTO HA COMENZADO!</div>";
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
