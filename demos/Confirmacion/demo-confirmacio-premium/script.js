
        document.addEventListener('DOMContentLoaded', () => {

            // 1. PRELOADER Y PUERTAS DE CATEDRAL
            const preloader = document.getElementById('preloader');
            const escenaPuertas = document.getElementById('escena-puertas');
            const btnAbrir = document.getElementById('btn-abrir');
            const audio = document.getElementById('audio-fondo');
            const btnMusica = document.getElementById('btn-musica');

            // Quitar preloader después de 3 segundos exactos
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 1000);
            }, 3000);

            // Abrir puertas al tocar el sello
            btnAbrir.addEventListener('click', () => {
                escenaPuertas.classList.add('abierto');
                document.body.classList.remove('bloqueado');
                
                // Play Música Épica
                audio.play().then(() => {
                    btnMusica.classList.add('activo', 'girando');
                }).catch(() => {
                    btnMusica.classList.add('activo'); // Fallback si el navegador bloquea autoplay
                });

                // Disparar animaciones del Hero
                setTimeout(() => {
                    document.querySelector('.hero-content').classList.add('visible');
                }, 1000);
            });

            // 2. PARALLAX EN HERO
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroImg = document.getElementById('hero-img');
                if(heroImg && scrolled < window.innerHeight) {
                    heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            });

            // 3. EFECTO TILT 3D EN TARJETAS (PILARES)
            const tiltCards = document.querySelectorAll('.tilt-card');
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
                    const rotateY = ((x - centerX) / centerX) * 10;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                });
            });

            // 4. INTERSECTION OBSERVER (Animaciones Cascada)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });
            
            document.querySelectorAll('.fade-up:not(.hero-content)').forEach(el => observer.observe(el));

            // 5. GENERADOR DE CHISPAS (FUEGO DIVINO)
            const contenedorChispas = document.getElementById('contenedor-chispas');
            if(contenedorChispas) {
                for(let i=0; i<30; i++) {
                    let chispa = document.createElement('div');
                    chispa.className = 'chispa';
                    chispa.style.left = Math.random() * 100 + 'vw';
                    chispa.style.width = Math.random() * 3 + 2 + 'px';
                    chispa.style.height = chispa.style.width;
                    chispa.style.animationDuration = (Math.random() * 15 + 10) + 's';
                    chispa.style.animationDelay = (Math.random() * 10) + 's';
                    
                    // Alternar colores de chispas
                    let rand = Math.random();
                    if(rand > 0.8) {
                        chispa.style.background = 'var(--color-rojo-vivo)';
                        chispa.style.boxShadow = '0 0 10px var(--color-oro)';
                    } else if (rand > 0.4) {
                        chispa.style.background = '#FFFFFF';
                        chispa.style.boxShadow = '0 0 15px var(--color-oro)';
                    }
                    contenedorChispas.appendChild(chispa);
                }
            }

            // 6. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 30);
            targetDate.setHours(12, 0, 0, 0);

            function updateCountdown() {
                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;
                if (distance < 0) return;

                document.getElementById("dias").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                document.getElementById("horas").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                document.getElementById("minutos").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                document.getElementById("segundos").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }
            setInterval(updateCountdown, 1000);
            updateCountdown();
        });

        // Toggle Música
        function toggleMusica() {
            const audio = document.getElementById('audio-fondo');
            const btn = document.getElementById('btn-musica');
            if(audio.paused) {
                audio.play();
                btn.classList.add('girando');
            } else {
                audio.pause();
                btn.classList.remove('girando');
            }
        }

        // Lógica RSVP (WhatsApp)
        function enviarRSVP() {
            const numeroTel = "520000000000"; // Reemplazar con el número de ArteEnLink o cliente
            const nombre = document.getElementById('wa-nombre').value;
            const mensaje = document.getElementById('wa-mensaje').value;
            const asistencia = document.querySelector('input[name="asistencia"]:checked').value;

            if(!nombre) {
                alert("Por favor, ingresa tu nombre para poder confirmar.");
                return;
            }

            let textoWa = `¡Hola! Soy *${nombre}*.\n\nEstatus: ${asistencia}\n`;
            if(mensaje) {
                textoWa += `\nMi mensaje para Mateo: "${mensaje}"`;
            }

            const url = `https://wa.me/${numeroTel}?text=${encodeURIComponent(textoWa)}`;
            window.open(url, '_blank');
        }
