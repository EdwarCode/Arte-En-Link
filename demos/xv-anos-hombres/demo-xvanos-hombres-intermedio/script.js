
        document.addEventListener('DOMContentLoaded', () => {
            // 1. PRELOADER
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => { setTimeout(() => { preloader.classList.add('oculto'); }, 800); });

            // 2. REPRODUCTOR DE MÚSICA & AUTO-PLAY ON INTERACTION
            const bgMusic = document.getElementById('bg-music');
            const btnMusic = document.getElementById('btn-music');
            let isPlaying = false;
            let interaccionIniciada = false;

            const iniciarMusica = () => {
                if(interaccionIniciada) return;
                interaccionIniciada = true;
                
                bgMusic.volume = 0; 
                bgMusic.play().then(() => {
                    isPlaying = true;
                    btnMusic.classList.remove('pausado');
                    
                    let vol = 0;
                    const fadeInterval = setInterval(() => {
                        if (vol < 1.0) {
                            vol += 0.05;
                            bgMusic.volume = Math.min(vol, 1);
                        } else {
                            clearInterval(fadeInterval);
                        }
                    }, 100);
                }).catch(error => {
                    console.log("Auto-play prevenido, el usuario debe usar el botón.");
                    interaccionIniciada = false; 
                });
            };

            document.body.addEventListener('click', iniciarMusica, { once: true });
            document.body.addEventListener('touchstart', iniciarMusica, { once: true });
            window.addEventListener('scroll', iniciarMusica, { once: true });

            btnMusic.addEventListener('click', (e) => {
                e.stopPropagation(); 
                if (isPlaying) {
                    bgMusic.pause();
                    btnMusic.classList.add('pausado');
                } else {
                    bgMusic.volume = 1; 
                    bgMusic.play();
                    btnMusic.classList.remove('pausado');
                }
                isPlaying = !isPlaying;
            });

            // 3. COPIAR AL PORTAPAPELES
            window.copiarTexto = function(idElemento) {
                const texto = document.getElementById(idElemento).innerText;
                navigator.clipboard.writeText(texto).then(() => {
                    const btn = document.querySelector('.btn-copiar');
                    const textoOriginal = btn.innerHTML;
                    btn.innerHTML = '<i class="ph-fill ph-check"></i> ¡Copiado!';
                    btn.style.backgroundColor = 'var(--color-neon)';
                    btn.style.color = '#000';
                    setTimeout(() => {
                        btn.innerHTML = textoOriginal;
                        btn.style.backgroundColor = 'transparent';
                        btn.style.color = 'var(--color-neon)';
                    }, 2000);
                });
            };

            // 4. ANIMACIONES SCROLL
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

            // 5. CUENTA REGRESIVA
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
