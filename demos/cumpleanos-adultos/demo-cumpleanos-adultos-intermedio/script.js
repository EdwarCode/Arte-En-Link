
        document.addEventListener('DOMContentLoaded', () => {
            // ELEMENTOS GLOBALES
            const masterScreen = document.getElementById('master-screen');
            const preloaderView = document.getElementById('preloader-view');
            const envelopeView = document.getElementById('envelope-view');
            const waxSeal = document.getElementById('wax-seal');
            const musicBtn = document.getElementById('music-player');
            const musicIcon = document.getElementById('music-icon');
            const audio = document.getElementById('bg-audio');
            let isPlaying = false;

            // FUNCION REPRODUCIR MUSICA
            function toggleMusic() {
                if(isPlaying) {
                    audio.pause();
                    musicIcon.classList.replace('ph-pause-circle', 'ph-play-circle');
                    musicBtn.classList.remove('playing');
                } else {
                    audio.play().catch(error => console.log("Auto-play prevenido por el navegador", error));
                    musicIcon.classList.replace('ph-play-circle', 'ph-pause-circle');
                    musicBtn.classList.add('playing');
                }
                isPlaying = !isPlaying;
            }

            // 1. LÓGICA DE DOBLE ENTRADA (PRELOADER -> SOBRE -> INVITACIÓN + MÚSICA)
            setTimeout(() => {
                preloaderView.classList.add('oculto');
                envelopeView.classList.add('visible');
            }, 3000);

            waxSeal.addEventListener('click', () => {
                // Disparar confeti
                confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#D4AF37', '#F3E5AB', '#997A00', '#ffffff'] });
                
                // Iniciar música automáticamente al abrir el sobre
                if (!isPlaying) {
                    toggleMusic();
                }
                
                // Animación del sobre
                masterScreen.classList.add('abriendo');
                setTimeout(() => { masterScreen.classList.add('bajando'); }, 1200);
                setTimeout(() => { masterScreen.classList.add('oculto'); }, 2500);
            });

            // 2. BOTÓN DE MÚSICA MANUAL
            musicBtn.addEventListener('click', toggleMusic);

            // 3. ANIMACIONES SCROLL
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
            }, { threshold: 0.15 });

            document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => { observer.observe(el); });

            // 4. LÓGICA REGALOS (Copiar)
            const btnRegalo = document.getElementById('btn-regalo');
            const datosBancarios = document.getElementById('datos-bancarios');
            const btnCopiar = document.getElementById('btn-copiar');
            const numClabe = document.getElementById('num-clabe').innerText;

            btnRegalo.addEventListener('click', () => {
                datosBancarios.classList.toggle('abierto');
                btnRegalo.innerHTML = datosBancarios.classList.contains('abierto') ? '<i class="ph-fill ph-caret-up"></i> Ocultar Datos' : '<i class="ph-fill ph-bank"></i> Ver Datos Bancarios';
            });

            btnCopiar.addEventListener('click', () => {
                navigator.clipboard.writeText(numClabe).then(() => {
                    btnCopiar.innerHTML = '<i class="ph-fill ph-check"></i> Copiado';
                    setTimeout(() => { btnCopiar.innerHTML = '<i class="ph ph-copy"></i> Copiar Clabe'; }, 2000);
                });
            });

            // 5. CUENTA REGRESIVA
            const targetDate = new Date(); targetDate.setDate(targetDate.getDate() + 30); targetDate.setHours(20, 0, 0, 0);
            function updateCountdown() {
                const distance = targetDate.getTime() - new Date().getTime();
                if (distance < 0) return;
                document.getElementById("dias").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                document.getElementById("horas").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                document.getElementById("minutos").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                document.getElementById("segundos").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }
            setInterval(updateCountdown, 1000); updateCountdown();
        });
