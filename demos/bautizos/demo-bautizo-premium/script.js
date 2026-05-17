
        document.addEventListener('DOMContentLoaded', () => {
            const apiKey = "";
            
            // 1. MAGIA DE LOS PASES VIP
            const urlParams = new URLSearchParams(window.location.search);
            const nombreParam = urlParams.get('invitado');
            const pasesParam = urlParams.get('pases');

            const nombreFinal = nombreParam ? nombreParam : 'Querido Invitado';
            const pasesFinal = pasesParam ? pasesParam : '2';

            document.getElementById('nombre-invitado').innerText = nombreFinal;
            document.getElementById('label-nombre-rsvp').innerText = nombreFinal;
            document.getElementById('num-pases').innerText = pasesFinal;

            if(!nombreParam && !pasesParam) {
                const contenedorPase = document.getElementById('contenedor-pase');
                if(contenedorPase) contenedorPase.style.display = 'none';
            }

            document.getElementById('btn-confirmar-wa').addEventListener('click', () => {
                const respuesta = document.getElementById('rsvp-respuesta').value;
                const numeroWhatsApp = "520000000000"; 
                const mensaje = `¡Hola! Soy *${nombreFinal}*.\n\nHe revisado la invitación de Mateo.\n*Respuesta:* ${respuesta}.\n*Pases asignados:* ${pasesFinal}\n\n¡Muchas gracias! 🕊️`;
                const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
                window.open(urlWhatsApp, '_blank');
            });


            // 2. PRELOADER Y SOBRE DIGITAL 3D CON CONFETI
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => { setTimeout(() => { preloader.classList.add('oculto'); }, 1200); });

            const selloBtn = document.getElementById('sello-btn');
            const sobreWrapper = document.getElementById('sobre-invitacion');
            const pantallaSobre = document.getElementById('pantalla-sobre');
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = document.getElementById('icono-musica');
            
            let musicaReproduciendo = false;
            let sobreAbierto = false;

            function lanzarConfeti() {
                var duration = 4 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 999999 };

                function randomInRange(min, max) { return Math.random() * (max - min) + min; }

                var interval = setInterval(function() {
                    var timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) { return clearInterval(interval); }
                    var particleCount = 50 * (timeLeft / duration);
                    
                    confetti(Object.assign({}, defaults, { 
                        particleCount, 
                        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                        colors: ['#A3B19B', '#FFFFFF', '#D4C4A8']
                    }));
                    confetti(Object.assign({}, defaults, { 
                        particleCount, 
                        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                        colors: ['#A3B19B', '#FFFFFF', '#D4C4A8']
                    }));
                }, 250);
            }

            selloBtn.addEventListener('click', () => {
                if(sobreAbierto) return;
                sobreAbierto = true;

                sobreWrapper.classList.add('abriendo');
                setTimeout(() => { lanzarConfeti(); }, 400);

                musicaFondo.volume = 0.5;
                musicaFondo.play().then(() => {
                    musicaReproduciendo = true;
                    iconoMusica.classList.replace('ph-music-notes', 'ph-speaker-slash');
                    iconoMusica.classList.add('girar');
                }).catch(e => console.log("El navegador bloqueó el audio automático."));

                // Desvanecer pantalla sobre y animar hero
                setTimeout(() => {
                    pantallaSobre.classList.add('abierto');
                    document.querySelectorAll('.portada .zoom-in, .portada .blur-in').forEach(el => el.classList.add('visible'));
                }, 1500);
            });

            btnMusica.addEventListener('click', () => {
                if (musicaReproduciendo) {
                    musicaFondo.pause();
                    iconoMusica.classList.remove('girar');
                    iconoMusica.classList.replace('ph-speaker-slash', 'ph-music-notes');
                } else {
                    musicaFondo.play();
                    iconoMusica.classList.add('girar');
                    iconoMusica.classList.replace('ph-music-notes', 'ph-speaker-slash');
                }
                musicaReproduciendo = !musicaReproduciendo;
            });

            // 3. MOSTRAR REGALOS
            const btnRegalos = document.getElementById('btn-regalos');
            const datosRegalos = document.getElementById('datos-regalos');
            btnRegalos.addEventListener('click', () => {
                datosRegalos.classList.toggle('visible');
                btnRegalos.innerText = datosRegalos.classList.contains('visible') ? "Ocultar Datos" : "Ver Datos Bancarios";
            });

            // 4. ANIMACIONES SCROLL (NUEVO MOTOR)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
                });
            }, { threshold: 0.15 });
            // Observamos TODAS las nuevas clases de animación
            document.querySelectorAll('.fade-up, .zoom-in, .slide-right, .slide-left, .blur-in').forEach(el => observer.observe(el));

            // 5. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); 
            targetDate.setHours(11, 0, 0, 0);

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

            // 7. LÓGICA DEL LIBRO DE FIRMAS CON LOCALSTORAGE
            const btnEnviarFirma = document.getElementById('btn-enviar-firma');
            const muroFirmas = document.getElementById('muro-firmas');
            
            const firmasPorDefecto = [
                { nombre: "Abuelos Silva", texto: "Que la luz de Dios guíe siempre tu camino, mi niño hermoso. Te amamos infinito." },
                { nombre: "Tía Caro", texto: "¡Qué emoción verte recibir este sacramento! Eres una bendición para toda la familia." }
            ];

            let firmasGuardadas = JSON.parse(localStorage.getItem('firmasBautizo_DemoVIP')) || firmasPorDefecto;

            function renderizarFirma(nombre, texto, alPrincipio = false) {
                const nuevaNota = document.createElement('div');
                nuevaNota.className = 'nota-deseo';
                nuevaNota.innerHTML = `
                    <div class="nota-texto">"${texto}"</div>
                    <div class="nota-autor">- ${nombre}</div>
                `;
                if (alPrincipio) { muroFirmas.prepend(nuevaNota); } 
                else { muroFirmas.appendChild(nuevaNota); }
            }

            muroFirmas.innerHTML = '';
            firmasGuardadas.forEach(msg => renderizarFirma(msg.nombre, msg.texto));

            btnEnviarFirma.addEventListener('click', () => {
                const nombre = document.getElementById('firma-nombre').value.trim();
                const texto = document.getElementById('firma-texto').value.trim();
                
                if(nombre === "" || texto === "") { alert("Por favor, escribe tu nombre y un mensaje."); return; }
                
                firmasGuardadas.unshift({ nombre, texto });
                localStorage.setItem('firmasBautizo_DemoVIP', JSON.stringify(firmasGuardadas));
                
                renderizarFirma(nombre, texto, true);
                
                document.getElementById('firma-nombre').value = '';
                document.getElementById('firma-texto').value = '';
                
                const textoOriginal = btnEnviarFirma.innerText;
                btnEnviarFirma.innerText = "¡Mensaje Guardado!";
                setTimeout(() => { btnEnviarFirma.innerText = textoOriginal; }, 3000);
            });
        });
