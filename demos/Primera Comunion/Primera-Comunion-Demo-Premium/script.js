
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. GENERADOR DE PARTÍCULAS (ORBES DE LUZ)
            const contenedorChispas = document.getElementById('contenedor-chispas');
            for(let i=0; i<20; i++) {
                let chispa = document.createElement('div');
                chispa.className = 'chispa';
                chispa.style.left = Math.random() * 100 + 'vw';
                chispa.style.animationDuration = (Math.random() * 10 + 10) + 's';
                chispa.style.animationDelay = (Math.random() * 10) + 's';
                contenedorChispas.appendChild(chispa);
            }

            // 2. APERTURA GATEFOLD & MÚSICA
            const btnAbrir = document.getElementById('btn-abrir');
            const gatefold = document.getElementById('gatefold');
            const audio = document.getElementById('audio-premium');
            const reproductor = document.getElementById('reproductor');

            btnAbrir.addEventListener('click', () => {
                gatefold.classList.add('abierto');
                document.body.classList.remove('bloqueado');
                
                // Disparar animaciones de portada
                setTimeout(() => {
                    document.querySelectorAll('.hero .anim').forEach(el => el.classList.add('visible'));
                }, 800);

                // Iniciar Audio
                audio.play().then(() => {
                    reproductor.classList.add('visible', 'girando');
                }).catch(e => {
                    reproductor.classList.add('visible'); // Muestra botón si el navegador bloquea autoplay
                });
            });

            // 3. INTERSECTION OBSERVER (STORYTELLING SCROLL)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });

            // Observamos todo lo que tenga clase .anim (menos hero que se anima al abrir)
            document.querySelectorAll('section .anim').forEach(el => observer.observe(el));

            // 4. CONTADOR REGRESIVO
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); // +45 días
            targetDate.setHours(12, 0, 0, 0);

            function updateTimer() {
                const now = new Date().getTime();
                const diff = targetDate.getTime() - now;
                if(diff < 0) return;

                document.getElementById('dias').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                document.getElementById('horas').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                document.getElementById('minutos').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                document.getElementById('segundos').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }
            setInterval(updateTimer, 1000);
            updateTimer();
        });

        // Toggle Música Play/Pause
        function togglePlay() {
            const audio = document.getElementById('audio-premium');
            const reproductor = document.getElementById('reproductor');
            if(audio.paused) {
                audio.play();
                reproductor.classList.add('girando');
            } else {
                audio.pause();
                reproductor.classList.remove('girando');
            }
        }

        // Lógica para Enviar WhatsApp Unificado Maestro
        function enviarMensajeWhatsApp() {
            const nombre = document.getElementById('nombre-invitado').value.trim();
            const mensaje = document.getElementById('mensaje-bendicion').value.trim();
            
            let textoWA = "Hola, confirmo mi asistencia a la Primera Comunión de Camila.";
            
            if (nombre) textoWA += ` Soy *${nombre}*.`;
            if (mensaje) textoWA += `\n\nAdemás, te dejo este mensaje con mucho cariño: "${mensaje}"`;

            const url = `https://wa.me/520000000000?text=${encodeURIComponent(textoWA)}`;
            window.open(url, '_blank');
        }
