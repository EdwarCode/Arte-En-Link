
        document.addEventListener('DOMContentLoaded', () => {

            // 1. PRELOADER
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => setTimeout(() => preloader.classList.add('oculto'), 800));
            setTimeout(() => preloader.classList.add('oculto'), 2500);

            // 2. INTERSECTION OBSERVER (Animaciones)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 3. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 30);
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

            // 4. GENERADOR DE PARTÍCULAS (CHISPAS DE FUEGO Y ORO)
            const contenedorChispas = document.getElementById('chispas-espiritu');
            if(contenedorChispas) {
                for(let i=0; i<25; i++) {
                    let chispa = document.createElement('div');
                    chispa.className = 'chispa';
                    // Posición y duración aleatoria
                    chispa.style.left = Math.random() * 100 + 'vw';
                    chispa.style.animationDuration = (Math.random() * 10 + 12) + 's';
                    chispa.style.animationDelay = (Math.random() * 10) + 's';
                    
                    // Alternar sutilmente algunas chispas a color vino para dar más profundidad
                    if(Math.random() > 0.7) {
                        chispa.style.background = 'var(--color-acento-vino)';
                        chispa.style.boxShadow = '0 0 6px var(--color-oro)';
                    }
                    
                    contenedorChispas.appendChild(chispa);
                }
            }
        });
