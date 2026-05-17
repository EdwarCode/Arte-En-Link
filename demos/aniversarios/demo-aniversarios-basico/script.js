
        document.addEventListener('DOMContentLoaded', () => {

            // 1. LÓGICA DEL PRELOADER
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => {
                setTimeout(() => { preloader.classList.add('oculto'); }, 800); 
            });

            // 2. ANIMACIONES SCROLL CON ANIME.JS (El Fade-Up Premium)
            const fadeElements = document.querySelectorAll('.fade-up');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: entry.target,
                            translateY: [40, 0],
                            opacity: [0, 1],
                            duration: 1200,
                            easing: 'easeOutCubic'
                        });
                        observer.unobserve(entry.target); 
                    }
                });
            }, { threshold: 0.15 });

            fadeElements.forEach(el => observer.observe(el));

            // 3. ANIMACIÓN DEL BOTÓN RSVP (Microlatido para llamar la atención)
            anime({
                targets: '.btn-oro',
                scale: [1, 1.03, 1],
                duration: 2500,
                easing: 'easeInOutSine',
                loop: true
            });

            // 4. CUENTA REGRESIVA
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
