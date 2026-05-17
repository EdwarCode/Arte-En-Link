
        // Bloquear el scroll de la página al inicio
        document.body.classList.add('body-no-scroll');

        document.addEventListener('DOMContentLoaded', () => {
            // 0. GENERAR PARTÍCULAS AMBIENTALES
            const contenedorParticulas = document.getElementById('particulas');
            for(let i=0; i<30; i++) {
                let p = document.createElement('div');
                p.className = 'particula';
                p.style.left = Math.random() * 100 + 'vw';
                p.style.animationDuration = (Math.random() * 5 + 5) + 's';
                p.style.animationDelay = (Math.random() * 5) + 's';
                contenedorParticulas.appendChild(p);
            }

            // 1. PRELOADER (Corregido a 3 segundos exactos y absolutos)
            const preloader = document.getElementById('preloader');
            setTimeout(() => { preloader.classList.add('oculto'); }, 3000);

            // 2. MÚSICA Y PANTALLA INTRO (Lógica Nativa Infalible)
            const bgMusic = document.getElementById('bg-music');
            const btnMusic = document.getElementById('btn-music');
            const introPantalla = document.getElementById('intro-pantalla');
            const btnEntrar = document.getElementById('btn-entrar');

            // Función para iniciar al tocar la tarjeta
            btnEntrar.addEventListener('click', () => {
                // Ocultar intro y liberar scroll
                introPantalla.classList.add('oculto');
                document.body.classList.remove('body-no-scroll');
                
                // Intentar reproducir directamente (Volumen al 100%)
                bgMusic.volume = 1;
                const playPromise = bgMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Reproducción exitosa
                        btnMusic.classList.remove('pausado');
                    }).catch(err => {
                        console.warn("Audio no encontrado o bloqueado. Asegúrate de tener el archivo assets/musica.mp3 en tu VS Code:", err);
                        btnMusic.classList.add('pausado');
                    });
                }
            });

            // Control del Botón Flotante de Música
            btnMusic.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar conflictos con otros clics
                
                // Le preguntamos directamente al audio si está pausado
                if (bgMusic.paused) { 
                    // Si está pausado, lo reproducimos
                    const playPromise = bgMusic.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            btnMusic.classList.remove('pausado');
                        }).catch(err => console.error("Error al reanudar:", err));
                    }
                } else { 
                    // Si está sonando, lo pausamos
                    bgMusic.pause();
                    btnMusic.classList.add('pausado'); 
                }
            });

            // 3. GALERÍA 3D COVERFLOW
            const items = document.querySelectorAll('.carousel-item');
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');
            let currentIndex = Math.floor(items.length / 2);

            function updateCarousel() {
                items.forEach((item, index) => {
                    const offset = index - currentIndex;
                    const tx = offset * 90; 
                    const ty = Math.abs(offset) * 10; 
                    const rY = offset * -25; 
                    const tz = Math.abs(offset) * -150; 
                    
                    item.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${rY}deg)`;
                    item.style.zIndex = items.length - Math.abs(offset);
                    item.style.opacity = Math.abs(offset) > 2 ? 0 : 1 - (Math.abs(offset) * 0.2);
                    
                    if(offset === 0) {
                        item.style.borderColor = 'var(--color-neon)';
                        item.style.boxShadow = '0 15px 40px rgba(0,229,255,0.4)';
                    } else {
                        item.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                        item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
                    }
                });
            }

            if (btnPrev && btnNext) {
                btnPrev.addEventListener('click', () => { if(currentIndex > 0) { currentIndex--; updateCarousel(); } });
                btnNext.addEventListener('click', () => { if(currentIndex < items.length - 1) { currentIndex++; updateCarousel(); } });
                updateCarousel(); 
            }

            // 4. ANIMACIONES SCROLL
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
                });
            }, { threshold: 0.15 });
            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

            // 5. CUENTA REGRESIVA
            const targetDate = new Date(); targetDate.setDate(targetDate.getDate() + 45); targetDate.setHours(20, 0, 0, 0);
            setInterval(() => {
                const distance = targetDate.getTime() - new Date().getTime();
                if (distance > 0) {
                    document.getElementById("dias").innerText = Math.floor(distance / 86400000).toString().padStart(2, '0');
                    document.getElementById("horas").innerText = Math.floor((distance % 86400000) / 3600000).toString().padStart(2, '0');
                    document.getElementById("minutos").innerText = Math.floor((distance % 3600000) / 60000).toString().padStart(2, '0');
                    document.getElementById("segundos").innerText = Math.floor((distance % 60000) / 1000).toString().padStart(2, '0');
                }
            }, 1000);

            // 6. MEGA FORMULARIO A WHATSAPP
            const telWA = "520000000000"; // Reemplazar
            window.copiarTexto = function(id) {
                navigator.clipboard.writeText(document.getElementById(id).innerText).then(() => {
                    const btn = document.querySelector('.btn-copiar');
                    btn.innerHTML = '<i class="ph-fill ph-check"></i> ¡Copiado!';
                    setTimeout(() => btn.innerHTML = '<i class="ph ph-copy"></i> Copiar', 2000);
                });
            };
            
            window.enviarMegaConfirmacion = function() {
                const nombre = document.getElementById('wa-nombre').value;
                const pases = document.getElementById('wa-pases').value;
                const cancion = document.getElementById('wa-cancion').value;
                const mensaje = document.getElementById('wa-mensaje').value;

                if(!nombre || !pases) {
                    alert("Por favor, ingresa tu nombre y los pases a confirmar.");
                    return;
                }

                let textoWA = `🎟️ *¡Hola! Confirmo mi asistencia VIP a los XV de Alexander.*\n\n`;
                textoWA += `👤 *Invitado:* ${nombre}\n`;
                textoWA += `✅ *Pases:* ${pases}\n\n`;
                
                if(cancion) textoWA += `🎵 *Sugerencia DJ:* ${cancion}\n`;
                if(mensaje) textoWA += `✉️ *Mensaje para Alexander:* "${mensaje}"\n\n`;
                
                textoWA += `¡Ahí nos vemos! ✨`;

                window.open(`https://wa.me/${telWA}?text=${encodeURIComponent(textoWA)}`, '_blank');
            };
        });
