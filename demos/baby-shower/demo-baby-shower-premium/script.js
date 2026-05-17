
        // --- 1. APERTURA MÁGICA Y CONFETI ---
        function abrirInvitacion() {
            const sobre = document.querySelector('.sobre-wrapper');
            const preloader = document.getElementById('preloader');
            const musica = document.getElementById('musicaFondo');
            const btnMusica = document.getElementById('btnMusica');
            const iconoMusica = btnMusica.querySelector('i');

            // 1. Añadimos clase para romper el sello y abrir la solapa en 3D
            sobre.classList.add('abriendo');
            
            // 2. Esperamos a que la solapa se abra (800ms) antes de mostrar la invitación
            setTimeout(() => {
                // Disparar Confeti Luxury (Tonos Teddy)
                var count = 200;
                var defaults = { origin: { y: 0.7 }, colors: ['#D4AF37', '#D4A373', '#FAF6F0', '#B58453'] };

                function fire(particleRatio, opts) {
                    confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * particleRatio) }));
                }

                fire(0.25, { spread: 26, startVelocity: 55 });
                fire(0.2, { spread: 60 });
                fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
                fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
                fire(0.1, { spread: 120, startVelocity: 45 });

                // Activar fade-out del preloader
                preloader.classList.add('abierto');

                // Reproducir música (Política de navegadores permitida tras clic)
                musica.play().then(() => {
                    btnMusica.classList.add('reproduciendo');
                    iconoMusica.classList.replace('ph-speaker-slash', 'ph-speaker-high');
                }).catch(e => console.log("Audio preventivo."));
                
            }, 800); // Sincronizado con la transición rotateX(180deg) de CSS
        }

        // --- 2. GENERADOR DE PARTÍCULAS (ESTRELLAS FLOTANTES CSS) ---
        function crearParticulas() {
            const container = document.getElementById('particulas');
            const iconos = ['ph-star', 'ph-sparkle'];
            
            for(let i=0; i<15; i++) {
                let p = document.createElement('i');
                // Alternar entre iconos
                p.className = `ph-fill ${iconos[Math.floor(Math.random() * iconos.length)]} estrella-p`;
                
                // Propiedades aleatorias
                let left = Math.random() * 100;
                let delay = Math.random() * 10;
                let duration = 8 + Math.random() * 10;
                let size = 0.5 + Math.random() * 0.8;

                p.style.left = `${left}%`;
                p.style.animationDelay = `${delay}s`;
                p.style.animationDuration = `${duration}s`;
                p.style.fontSize = `${size}rem`;
                
                container.appendChild(p);
            }
        }

        // --- 3. INTERSECTION OBSERVER (Animaciones on scroll) ---
        document.addEventListener('DOMContentLoaded', () => {
            crearParticulas(); // Inicializar estrellas de fondo

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
                });
            }, { threshold: 0.15 });
            document.querySelectorAll('.fade-up, .bounce-in').forEach(el => observer.observe(el));

            // --- 4. CUENTA REGRESIVA ---
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); 
            targetDate.setHours(16, 0, 0, 0); 

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

        // --- FUNCIONES AUXILIARES ---
        function mostrarToast(mensaje) {
            const toast = document.getElementById('toast');
            toast.textContent = mensaje;
            toast.classList.add('mostrar');
            setTimeout(() => { toast.classList.remove('mostrar'); }, 3000);
        }

        function toggleMusica() {
            const musica = document.getElementById('musicaFondo');
            const btn = document.getElementById('btnMusica');
            const icono = btn.querySelector('i');

            if (musica.paused) {
                musica.play();
                btn.classList.add('reproduciendo');
                icono.classList.replace('ph-speaker-slash', 'ph-speaker-high');
            } else {
                musica.pause();
                btn.classList.remove('reproduciendo');
                icono.classList.replace('ph-speaker-high', 'ph-speaker-slash');
            }
        }

        function toggleCuenta() {
            document.getElementById('datosCuenta').classList.toggle('visible');
        }

        function copiarCLABE() {
            var textArea = document.createElement("textarea");
            textArea.value = "012345678910111213";
            textArea.style.position = "fixed"; textArea.style.top = "0"; textArea.style.left = "0"; textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.focus(); textArea.select();
            try {
                if(document.execCommand('copy')) mostrarToast('¡CLABE copiada al portapapeles!');
            } catch (err) { console.error('Error al copiar'); }
            document.body.removeChild(textArea);
        }

        function enviarRSVP() {
            const nombre = document.getElementById('rsvpNombre').value;
            if(!nombre) { mostrarToast('Por favor ingresa tu nombre.'); return; }
            const estado = document.getElementById('rsvpEstado').value;
            const pases = document.getElementById('rsvpPases').value;
            
            // Construir mensaje VIP para WhatsApp
            let msj = `✨ *Confirmación VIP* ✨\n\nHola, soy *${nombre}*.\nQuiero confirmar que *${estado}* al Baby Shower de Leonardo.\nDetalle: ${pases}.\n\n¡Gracias!`;
            let url = `https://wa.me/520000000000?text=${encodeURIComponent(msj)}`;
            window.open(url, '_blank');
        }
