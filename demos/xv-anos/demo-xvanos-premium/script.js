
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. PRELOADER Y MAGIA DE PASES (URL Params)
            const preloader = document.getElementById('preloader');
            const urlParams = new URLSearchParams(window.location.search);
            const nombreParam = urlParams.get('invitado');
            const pasesParam = urlParams.get('pases');

            const nombreFinal = nombreParam ? nombreParam : 'Querido Invitado';
            const pasesFinal = pasesParam ? pasesParam : '2';

            document.getElementById('nombre-invitado').innerText = nombreFinal;
            document.getElementById('num-pases').innerText = pasesFinal;

            window.addEventListener('load', () => {
                setTimeout(() => { preloader.classList.add('oculto'); }, 1500);
            });

            // 2. MÚSICA Y SOBRE DIGITAL CON CONFETI
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = document.getElementById('icono-musica');
            
            const pantallaSobre = document.getElementById('pantalla-sobre');
            const sobreWrapper = document.getElementById('sobre-invitacion');
            const selloBtn = document.getElementById('sello-btn');
            
            let musicaReproduciendo = false;
            let sobreAbierto = false;

            // Función para lanzar el Confeti (4 segundos)
            function lanzarConfeti() {
                var duration = 4 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999999 };

                function randomInRange(min, max) { return Math.random() * (max - min) + min; }

                var interval = setInterval(function() {
                    var timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) { return clearInterval(interval); }

                    var particleCount = 50 * (timeLeft / duration);
                    // Colores Rose Gold, Blanco y Blush
                    confetti(Object.assign({}, defaults, { 
                        particleCount, 
                        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                        colors: ['#D48C9A', '#E8B4BC', '#FFFFFF', '#B86B7A']
                    }));
                    confetti(Object.assign({}, defaults, { 
                        particleCount, 
                        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                        colors: ['#D48C9A', '#E8B4BC', '#FFFFFF', '#B86B7A']
                    }));
                }, 250);
            }

            selloBtn.addEventListener('click', () => {
                if(sobreAbierto) return;
                sobreAbierto = true;

                // 1. Inicia animación del sobre (se rompe el sello y se abre la tapa)
                sobreWrapper.classList.add('abriendo');

                // 2. A los 500ms (cuando el sobre está abierto), sale el confeti
                setTimeout(() => {
                    lanzarConfeti();
                }, 500);

                // 3. Reproducir música automáticamente
                musicaFondo.volume = 0.5;
                musicaFondo.play().then(() => {
                    musicaReproduciendo = true;
                    iconoMusica.classList.replace('ph-play-circle', 'ph-pause-circle');
                    iconoMusica.classList.add('girar');
                }).catch(e => console.log("El navegador requiere más interacción para el audio."));

                // 4. A los 1.5s, la pantalla del sobre se desvanece dejando ver la invitación
                setTimeout(() => {
                    pantallaSobre.classList.add('abierto');
                    
                    // Disparamos animaciones de la portada hero
                    document.querySelectorAll('.hero-content .fade-up').forEach(el => el.classList.add('visible'));
                    document.querySelectorAll('.pase-vip.fade-up').forEach(el => el.classList.add('visible'));
                }, 1500);
            });

            // Control manual de música en el botón flotante
            btnMusica.addEventListener('click', (e) => {
                e.stopPropagation();
                if (musicaReproduciendo) {
                    musicaFondo.pause();
                    iconoMusica.classList.remove('girar');
                    iconoMusica.classList.replace('ph-pause-circle', 'ph-play-circle');
                } else {
                    musicaFondo.play();
                    iconoMusica.classList.add('girar');
                    iconoMusica.classList.replace('ph-play-circle', 'ph-pause-circle');
                }
                musicaReproduciendo = !musicaReproduciendo;
            });

            // 3. ANIMACIONES SCROLL
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });
            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 4. LÓGICA DEL MURO DE DESEOS (Magia con LocalStorage para la Demo)
            const btnEnviarDeseo = document.getElementById('btn-enviar-deseo');
            const muroMensajes = document.getElementById('muro-mensajes');
            
            // Mensajes falsos por defecto para que no luzca vacío al inicio
            const mensajesPorDefecto = [
                { nombre: "Familia López", texto: "¡Felicidades hermosa! Que disfrutes tu día al máximo, te queremos muchísimo." },
                { nombre: "Tu amiga Sofi", texto: "No puedo creer lo rápido que creciste. ¡Lista para brillar en la pista!" }
            ];

            // Revisamos si ya hay mensajes guardados en la memoria del celular/PC
            let mensajesGuardados = JSON.parse(localStorage.getItem('deseosXV_DemoVIP')) || mensajesPorDefecto;

            // Función para dibujar una notita en el muro
            function renderizarMensaje(nombre, texto, alPrincipio = false) {
                const nuevaNota = document.createElement('div');
                nuevaNota.className = 'nota-deseo';
                nuevaNota.innerHTML = `
                    <div class="nota-texto">"${texto}"</div>
                    <div class="nota-autor">- ${nombre}</div>
                `;
                
                if (alPrincipio) {
                    muroMensajes.prepend(nuevaNota);
                } else {
                    muroMensajes.appendChild(nuevaNota);
                }
            }

            // Limpiamos el HTML quemado y dibujamos los mensajes de la memoria
            muroMensajes.innerHTML = '';
            mensajesGuardados.forEach(msg => renderizarMensaje(msg.nombre, msg.texto));

            // Qué pasa al darle clic a "Publicar Deseo"
            btnEnviarDeseo.addEventListener('click', () => {
                const nombre = document.getElementById('deseo-nombre').value.trim();
                const texto = document.getElementById('deseo-texto').value.trim();
                
                if(nombre === "" || texto === "") {
                    alert("Por favor, escribe tu nombre y tu deseo.");
                    return;
                }
                
                // 1. Guardamos el nuevo mensaje en nuestra lista (al inicio)
                mensajesGuardados.unshift({ nombre, texto });
                
                // 2. Guardamos la lista actualizada en el LocalStorage
                localStorage.setItem('deseosXV_DemoVIP', JSON.stringify(mensajesGuardados));
                
                // 3. Dibujamos la nueva nota en la pantalla
                renderizarMensaje(nombre, texto, true);
                
                // 4. Limpiamos el formulario
                document.getElementById('deseo-nombre').value = '';
                document.getElementById('deseo-texto').value = '';
                
                // 5. Efecto de confirmación en el botón
                btnEnviarDeseo.innerText = "¡Deseo Publicado!";
                setTimeout(() => { btnEnviarDeseo.innerText = "Publicar Deseo"; }, 3000);
            });

            // 5. LÓGICA DEL DJ
            const btnCancion = document.getElementById('btn-pedir-cancion');
            btnCancion.addEventListener('click', () => {
                const cancion = document.getElementById('cancion-input').value.trim();
                if(cancion !== "") {
                    btnCancion.innerHTML = '<i class="ph-fill ph-check-circle"></i> ¡Anotada!';
                    document.getElementById('cancion-input').value = '';
                    setTimeout(() => { btnCancion.innerHTML = '<i class="ph-fill ph-music-note-add"></i> Enviar al DJ'; }, 3000);
                }
            });

            // 6. CONFIRMACIÓN RSVP (WHATSAPP)
            document.getElementById('btn-confirmar-whatsapp').addEventListener('click', () => {
                const respuesta = document.getElementById('rsvp-respuesta').value;
                const asistentes = document.getElementById('rsvp-asistentes').value;
                
                const numeroWhatsApp = "520000000000"; 
                const mensaje = `¡Hola! Soy *${nombreFinal}*.\n\nHe revisado la invitación VIP de Valentina.\n*Respuesta:* ${respuesta}.\n*Asistentes:* ${asistentes} de los ${pasesFinal} pases asignados.\n\n¡Gracias por la invitación! ✨`;
                
                const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
                window.open(urlWhatsApp, '_blank');
            });

            // 7. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 45); 
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