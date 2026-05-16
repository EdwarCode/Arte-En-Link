
        document.addEventListener('DOMContentLoaded', () => {

            // 1. INICIALIZAR FONDOS FLOTANTES
            const iconos = ['ph-graduation-cap', 'ph-scroll', 'ph-star', 'ph-sparkle'];
            const containerFlotantes = document.getElementById('flotantes-container');
            const totalFlotantes = 15;

            for (let i = 0; i < totalFlotantes; i++) {
                let el = document.createElement('i');
                let iconoAleatorio = iconos[Math.floor(Math.random() * iconos.length)];
                el.className = `ph-duotone ${iconoAleatorio} joya-flotante`;
                el.style.left = `${Math.random() * 100}vw`;
                containerFlotantes.appendChild(el);
            }

            anime({
                targets: '.joya-flotante',
                translateY: [function() { return anime.random(0, 100) + 'vh'; }, '-20vh'],
                translateX: function() { return anime.random(-30, 30); },
                rotate: function() { return anime.random(-180, 180); },
                scale: function() { return anime.random(0.5, 1.2); },
                duration: function() { return anime.random(15000, 25000); }, 
                easing: 'linear',
                loop: true,
                delay: anime.stagger(500)
            });

            // 2. PRELOADER Y UNBOXING PORTA-DIPLOMAS
            const preloader = document.getElementById('preloader');
            const birrete = document.getElementById('birrete-loader');
            const pantallaUnboxing = document.getElementById('pantalla-unboxing');
            const portaBtn = document.getElementById('porta-btn');
            const tapaCuero = document.getElementById('tapa-cuero');
            const sello = document.getElementById('sello-oro');
            const instruccion = document.getElementById('instruccion');
            
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            const iconoMusica = document.getElementById('icono-musica');
            let musicaReproduciendo = false;
            let unboxingHecho = false;
            let playPromise; 
            let isAudioProcessing = false;

            anime({ targets: birrete, translateY: [-10, 10], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 1000 });

            setTimeout(() => { 
                anime({ targets: preloader, opacity: 0, duration: 800, easing: 'linear', complete: () => preloader.style.display = 'none' }); 
            }, 2000);

            // MANIOBRA DE APERTURA: Audio Inmediato + Micro-Desfase para 3D
            portaBtn.addEventListener('click', () => {
                if(unboxingHecho) return;
                unboxingHecho = true;
                
                instruccion.style.display = 'none';

                // AUDIO SÍNCRONO DIRECTO
                try {
                    musicaFondo.volume = 0.5;
                    musicaFondo.muted = false;
                    
                    if (musicaFondo.readyState === 0) {
                        musicaFondo.load();
                    }
                    
                    playPromise = musicaFondo.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            musicaReproduciendo = true;
                            iconoMusica.classList.add('girar', 'ph-pause-circle');
                            iconoMusica.classList.remove('ph-play-circle');
                        }).catch(error => {
                            console.warn('Interacción manual requerida:', error);
                        });
                    }
                } catch(error) {
                    console.error('Error al intentar reproducir:', error);
                }

                // ANIMACIONES DE APERTURA (Con micro-desfase de 50ms para no ahogar procesador)
                setTimeout(() => {
                    const tl = anime.timeline({ easing: 'easeOutExpo' });
                    tl.add({
                        targets: sello, scale: 1.5, opacity: 0, duration: 400
                    }).add({
                        targets: tapaCuero, rotateX: -160, duration: 1200, easing: 'spring(1, 80, 10, 0)' 
                    }, '-=200').add({
                        targets: portaBtn, scale: 1.1, opacity: 0, duration: 800 
                    }, '+=400').add({
                        targets: pantallaUnboxing, opacity: 0, duration: 800, 
                        complete: () => { pantallaUnboxing.style.display = 'none'; }
                    }, '-=600');
                }, 50);
            });

            // Control Audio manual con Semáforo Anti-Pánico
            btnMusica.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (isAudioProcessing) return;
                isAudioProcessing = true;

                try {
                    if (musicaFondo.paused) {
                        if (musicaFondo.readyState === 0) musicaFondo.load();
                        musicaFondo.volume = 0.5;
                        
                        playPromise = musicaFondo.play();
                        if (playPromise !== undefined) await playPromise;
                        
                        iconoMusica.classList.add('girar', 'ph-pause-circle');
                        iconoMusica.classList.remove('ph-play-circle');
                        musicaReproduciendo = true;
                    } else {
                        if (playPromise !== undefined) await playPromise.catch(() => {});
                        
                        musicaFondo.pause();
                        iconoMusica.classList.remove('girar', 'ph-pause-circle');
                        iconoMusica.classList.add('ph-play-circle');
                        musicaReproduciendo = false;
                    }
                } catch (error) {
                    console.error('Error con el reproductor:', error);
                } finally {
                    isAudioProcessing = false;
                }
            });

            // 3. SCROLL REVEAL Y LÍNEA DE TIEMPO
            const progresoTimeline = document.getElementById('linea-progreso');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if(entry.target.classList.contains('reveal-item')) {
                            anime({ targets: entry.target, translateY: [40, 0], opacity: [0, 1], duration: 1000, easing: 'easeOutQuart' });
                            observer.unobserve(entry.target);
                        }
                        if(entry.target.classList.contains('hito-item')) {
                            const progresoTarget = entry.target.getAttribute('data-progreso');
                            progresoTimeline.style.height = progresoTarget + '%';
                            const isRowReverse = window.getComputedStyle(entry.target).flexDirection === 'row-reverse';
                            
                            anime({ 
                                targets: entry.target, opacity: [0, 1], 
                                translateX: isRowReverse ? [-30, 0] : [30, 0], duration: 800, easing: 'easeOutBack' 
                            });
                            setTimeout(() => { entry.target.classList.add('activado'); }, 200);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            }, { threshold: 0.2 });
            document.querySelectorAll('.reveal-item, .hito-item').forEach(el => observer.observe(el));

            // 4. CUENTA REGRESIVA
            const targetDate = new Date(); targetDate.setDate(targetDate.getDate() + 45); targetDate.setHours(21, 0, 0, 0);
            function updateCountdown() {
                const distance = targetDate.getTime() - new Date().getTime();
                if (distance < 0) return;
                document.getElementById("dias").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                document.getElementById("horas").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                document.getElementById("minutos").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                document.getElementById("segundos").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }
            setInterval(updateCountdown, 1000); updateCountdown();

            // 5. GALERÍA 3D COVERFLOW
            const track = document.getElementById('track');
            const urlsFotos = [
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=400&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1546410531-bea5aadcb6ce?q=80&w=400&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?q=80&w=400&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?q=80&w=400&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=400&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=400&auto=format&fit=crop"
            ];
            
            const numFotos = urlsFotos.length;
            const theta = 360 / numFotos;
            const cellWidth = window.innerWidth <= 768 ? 220 : 280; 
            const radius = Math.round((cellWidth / 2) / Math.tan(Math.PI / numFotos)) + 40; 
            
            let currentAngle = 0;
            let targetAngle = 0;

            track.style.transform = `translateZ(${-radius}px) rotateY(0deg)`;

            urlsFotos.forEach((url, i) => {
                let div = document.createElement('div');
                div.className = 'foto-3d';
                if(i===0) div.classList.add('activa');
                div.style.transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
                div.innerHTML = `<img src="${url}" alt="Graduacion ${i}">`;
                track.appendChild(div);
            });

            function rotarCarrusel(direccion) {
                targetAngle += direccion * theta;
                
                let fotos = document.querySelectorAll('.foto-3d');
                fotos.forEach(f => f.classList.remove('activa'));
                let idxActiva = Math.round((targetAngle / theta) % numFotos);
                if(idxActiva < 0) idxActiva += numFotos;
                let idxReal = idxActiva === 0 ? 0 : numFotos - idxActiva;
                fotos[idxReal].classList.add('activa');

                anime({
                    targets: track,
                    rotateY: targetAngle,
                    translateZ: -radius, 
                    duration: 1000,
                    easing: 'spring(1, 80, 10, 0)'
                });
            }

            let startX = 0; let isDragging = false;
            const carrusel = document.getElementById('carrusel');
            
            carrusel.addEventListener('mousedown', (e) => { startX = e.pageX; isDragging = true; });
            carrusel.addEventListener('mouseup', (e) => { 
                if(!isDragging) return; isDragging = false; 
                if(e.pageX < startX - 30) rotarCarrusel(-1); 
                else if(e.pageX > startX + 30) rotarCarrusel(1); 
            });
            carrusel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
            carrusel.addEventListener('touchend', (e) => { 
                let endX = e.changedTouches[0].clientX; 
                if(endX < startX - 30) rotarCarrusel(-1); 
                else if(endX > startX + 30) rotarCarrusel(1); 
            });

            // 6. MÓDULO UNIFICADO VIP
            document.getElementById('btn-enviar-rsvp').addEventListener('click', () => {
                const nombreInput = document.getElementById('rsvp-nombre');
                const nombre = nombreInput.value.trim();
                const consejo = document.getElementById('vip-consejo').value.trim() || "(Ningún consejo en especial, ¡mucho éxito!)";
                const cancion = document.getElementById('vip-cancion').value.trim() || "(La que ponga el DJ está perfecta)";
                
                if(!nombre) {
                    nombreInput.style.borderColor = '#ff4d4d';
                    nombreInput.placeholder = '¡Tu nombre es requerido!';
                    anime({ targets: nombreInput, translateX: [0, -10, 10, -10, 10, 0], duration: 400, easing: 'easeInOutSine' });
                    return;
                }
                
                anime({ targets: '#btn-enviar-rsvp', scale: [1, 0.95, 1], duration: 300, easing: 'easeInOutQuad', 
                    complete: () => {
                        const mensaje = `¡Hola Alejandro! ✨\n\nSoy *${nombre}* y confirmo con mucho orgullo mi asistencia a tu cena de gala. ¡Felicidades Ingeniero!\n\n*🎓 Mi Consejo para tu futuro:*\n"${consejo}"\n\n*🎵 Para la fiesta, dile al DJ que ponga:*\n"${cancion}"\n\n¡Nos vemos en la celebración!`;
                        window.open(`https://wa.me/520000000000?text=${encodeURIComponent(mensaje)}`, '_blank');
                    }
                });
            });

        });
