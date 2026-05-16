
        document.addEventListener('DOMContentLoaded', () => {
            // 1. MAGIA DE LOS PASES VIP (Lectura de URL)
            const urlParams = new URLSearchParams(window.location.search);
            const nombreParam = urlParams.get('invitado');
            const pasesParam = urlParams.get('pases');

            const nombreFinal = nombreParam ? nombreParam : 'Querido Invitado';
            const pasesFinal = pasesParam ? pasesParam : '2';

            document.getElementById('nombre-invitado').innerText = nombreFinal;
            document.getElementById('num-pases').innerText = pasesFinal;

            document.getElementById('btn-confirmar-whatsapp').addEventListener('click', () => {
                const respuesta = document.getElementById('rsvp-respuesta').value;
                const bebida = document.getElementById('rsvp-bebida').value;
                const mensajeCariño = document.getElementById('rsvp-mensaje').value || '¡Felicidades por esta nueva etapa!';
                
                const numeroWhatsApp = "520000000000"; 
                const mensaje = `¡Hola Juan y Ana! Soy *${nombreFinal}*.\n\n*Respuesta:* ${respuesta} con los *${pasesFinal} pases* que nos asignaron.\n*Bebida de preferencia:* ${bebida}\n*Mensaje:* "${mensajeCariño}"\n\n¡Gracias por invitarnos!`;
                
                const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
                window.open(urlWhatsApp, '_blank');
            });

            // 2. LÓGICA DEL SOBRE DIGITAL Y MÚSICA REFACTORIZADA
            const selloBtn = document.getElementById('sello-btn');
            const pantallaSobre = document.getElementById('pantalla-sobre');
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = btnMusica.querySelector('i');
            
            let musicaReproduciendo = false;
            let playPromise = null;
            let sobreAbierto = false;

            selloBtn.addEventListener('click', () => {
                if(sobreAbierto) return; 
                sobreAbierto = true;
                
                selloBtn.classList.add('roto');
                
                setTimeout(() => {
                    pantallaSobre.classList.add('abierto');
                }, 500);
                
                musicaFondo.volume = 0.5; 
                playPromise = musicaFondo.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        musicaReproduciendo = true;
                        if(!iconoMusica.classList.contains('girar')) iconoMusica.classList.add('girar');
                        iconoMusica.classList.replace('ph-speaker-slash', 'ph-music-notes');
                    }).catch(error => {
                        console.log("Autoplay bloqueado.", error);
                        musicaReproduciendo = false;
                    });
                }
            });

            // Control flotante de música seguro
            btnMusica.addEventListener('click', () => {
                if (musicaReproduciendo) {
                    if (playPromise !== undefined && playPromise !== null) {
                        playPromise.then(() => {
                            musicaFondo.pause();
                            iconoMusica.classList.remove('girar');
                            iconoMusica.classList.replace('ph-music-notes', 'ph-speaker-slash');
                            musicaReproduciendo = false;
                        }).catch(error => console.log("Error al pausar:", error));
                    } else {
                        musicaFondo.pause();
                        iconoMusica.classList.remove('girar');
                        iconoMusica.classList.replace('ph-music-notes', 'ph-speaker-slash');
                        musicaReproduciendo = false;
                    }
                } else {
                    playPromise = musicaFondo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            iconoMusica.classList.add('girar');
                            iconoMusica.classList.replace('ph-speaker-slash', 'ph-music-notes');
                            musicaReproduciendo = true;
                        }).catch(error => {
                            console.log("Autoplay bloqueado.", error);
                            musicaReproduciendo = false;
                        });
                    }
                }
            });

            // 3. MOSTRAR DATOS BANCARIOS
            const btnRegalos = document.getElementById('btn-regalos');
            const datosRegalos = document.getElementById('datos-regalos');
            btnRegalos.addEventListener('click', () => {
                datosRegalos.classList.toggle('visible');
                btnRegalos.innerText = datosRegalos.classList.contains('visible') ? "Ocultar Detalles" : "Ver Detalles Bancarios";
            });

            // 4. ANIMACIONES SCROLL VIP
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });
            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 5. CUENTA REGRESIVA
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 30); 
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

        function sugerirCancion() {
            const cancion = document.getElementById('input-cancion').value;
            if(cancion.trim() === "") {
                alert("Por favor escribe una canción.");
                return;
            }
            const numeroWhatsApp = "520000000000"; 
            const mensaje = `¡Hola! Para la playlist de la boda sugiero la canción: *${cancion}* 🎶`;
            window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
        }
    