
        document.addEventListener('DOMContentLoaded', () => {
            const numeroWhatsApp = "520000000000"; // Tu número aquí

            // --- REVELACIÓN DE TEXTO DE CINE (Split Text) ---
            const splitTexts = document.querySelectorAll('.split-text');
            splitTexts.forEach(el => {
                const text = el.innerText;
                el.innerHTML = '';
                text.split('').forEach((char, i) => {
                    const span = document.createElement('span');
                    span.innerText = char === ' ' ? '\u00A0' : char;
                    span.className = 'split-char';
                    span.style.transitionDelay = `${i * 30}ms`;
                    el.appendChild(span);
                });
            });

            const textObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.split-char').forEach(char => char.classList.add('visible'));
                    }
                });
            }, { threshold: 0.5 });
            splitTexts.forEach(el => textObserver.observe(el));

            // --- TARJETAS CON FÍSICA 3D Y REFLEJO (Tilt + Spotlight) ---
            const tiltCards = document.querySelectorAll('.tilt-card');
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -5;
                    const rotateY = ((x - centerX) / centerX) * 5;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                });
            });

            // --- MENÚ FLOTANTE DYNAMIC ISLAND (SMART SCROLL) ---
            const dynamicIsland = document.getElementById('dynamic-island');
            let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
            
            // --- SCROLLYTELLING (Objeto 3D Fondo) ---
            const scrollyObj = document.getElementById('scrolly-object');

            window.addEventListener('scroll', () => {
                const currentScroll = window.scrollY || document.documentElement.scrollTop;
                
                // Smart Scroll Menú
                if (currentScroll > 300) {
                    if (currentScroll > lastScrollTop) {
                        dynamicIsland.classList.remove('visible');
                    } else {
                        dynamicIsland.classList.add('visible');
                    }
                } else {
                    dynamicIsland.classList.remove('visible');
                }
                lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 

                // Animación Objeto 3D Fondo
                if(scrollyObj) {
                    const rotY = currentScroll * 0.08;
                    const rotX = currentScroll * 0.04;
                    scrollyObj.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
                }
            }, { passive: true });

            // --- TARJETA RASCA Y GANA ---
            const canvas = document.getElementById('scratch-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                let isDrawing = false;
                
                const initCanvas = () => {
                    canvas.width = canvas.parentElement.offsetWidth;
                    canvas.height = canvas.parentElement.offsetHeight;
                    
                    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                    gradient.addColorStop(0, '#D4AF37');
                    gradient.addColorStop(0.5, '#F3E5AB');
                    gradient.addColorStop(1, '#997A00');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    ctx.font = 'bold 1.2rem Montserrat';
                    ctx.fillStyle = 'rgba(0,0,0,0.4)';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('Rasca para descubrir', canvas.width/2, canvas.height/2);
                };
                
                initCanvas();
                window.addEventListener('resize', initCanvas);

                const getMousePos = (e) => {
                    const rect = canvas.getBoundingClientRect();
                    if (e.touches && e.touches.length > 0) {
                        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
                    }
                    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
                };

                const startDrawing = (e) => {
                    isDrawing = true;
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.lineWidth = 45;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    scratch(e);
                };

                const scratch = (e) => {
                    if (!isDrawing) return;
                    if(e.cancelable) e.preventDefault(); 
                    const pos = getMousePos(e);
                    ctx.lineTo(pos.x, pos.y);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pos.x, pos.y);
                };

                const stopDrawing = () => { isDrawing = false; ctx.beginPath(); };

                canvas.addEventListener('mousedown', startDrawing);
                canvas.addEventListener('mousemove', scratch);
                canvas.addEventListener('mouseup', stopDrawing);
                canvas.addEventListener('mouseleave', stopDrawing);

                canvas.addEventListener('touchstart', startDrawing, {passive: false});
                canvas.addEventListener('touchmove', scratch, {passive: false});
                canvas.addEventListener('touchend', stopDrawing);
            }

            // --- REGALO 3D UNBOXING ---
            const giftContainer = document.getElementById('gift-container');
            if(giftContainer){
                giftContainer.addEventListener('click', () => {
                    giftContainer.classList.add('abierto');
                    showToast("¡Has abierto el regalo! 🎁");
                });
            }

            // --- COPIAR CLABE ---
            const btnCopiarClabe = document.getElementById('btn-copiar-clabe');
            if (btnCopiarClabe) {
                btnCopiarClabe.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    const clabe = '012345678901234567';
                    
                    const textArea = document.createElement("textarea");
                    textArea.value = clabe;
                    textArea.style.position = "fixed";
                    textArea.style.top = "0";
                    textArea.style.left = "0";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    try {
                        document.execCommand('copy');
                        showToast('Clabe copiada 📋');
                    } catch (err) {
                        showToast('Error al copiar la Clabe ❌');
                    }
                    
                    document.body.removeChild(textArea);
                });
            }

            // --- SISTEMA DE NOTIFICACIONES TOAST ---
            const toastUI = document.getElementById('toast-notify');
            const toastMsg = document.getElementById('toast-msg');
            let toastTimer;
            function showToast(mensaje) {
                toastMsg.innerText = mensaje;
                toastUI.classList.add('mostrar');
                clearTimeout(toastTimer);
                toastTimer = setTimeout(() => { toastUI.classList.remove('mostrar'); }, 3500);
            }

            // --- 1. ENTRADA VIP (Black Card Flash) ---
            const vipEntry = document.getElementById('vip-entry');
            const blackCard = document.getElementById('black-card');
            const flashBang = document.getElementById('flash-bang');
            const musicBtn = document.getElementById('music-player');
            const musicIcon = document.getElementById('music-icon');
            const audio = document.getElementById('bg-audio');
            let isPlaying = false;
            let cardUnlocked = false; 

            function toggleMusic() {
                if(isPlaying) {
                    audio.pause();
                    musicIcon.classList.replace('ph-pause-circle', 'ph-play-circle');
                    musicBtn.classList.remove('playing');
                } else {
                    audio.play().catch(e => console.log("Autoplay bloqueado - requiere interacción"));
                    musicIcon.classList.replace('ph-play-circle', 'ph-pause-circle');
                    musicBtn.classList.add('playing');
                }
                isPlaying = !isPlaying;
            }

            blackCard.addEventListener('click', () => {
                if (cardUnlocked) return;
                cardUnlocked = true;
                
                flashBang.style.opacity = '1';
                setTimeout(() => {
                    blackCard.classList.add('card-unlocking');
                    if (!isPlaying) toggleMusic();
                    setTimeout(() => { flashBang.style.opacity = '0'; vipEntry.classList.add('oculto'); }, 400);
                }, 100);
            });

            musicBtn.addEventListener('click', toggleMusic);

            // --- 2. TÚNEL DEL TIEMPO (Sticky Logic) ---
            const bgYearText = document.getElementById('bg-year');
            const eraItems = document.querySelectorAll('.era-item');
            const eraObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('activo');
                        const year = entry.target.getAttribute('data-year');
                        bgYearText.style.opacity = 0;
                        setTimeout(() => { bgYearText.innerText = year; bgYearText.style.opacity = 1; }, 250);
                    }
                });
            }, { threshold: 0.5 });
            eraItems.forEach(item => eraObserver.observe(item));

            // --- 3. ANIMACIONES GLOBALES FADE-UP ---
            const generalObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
            }, { threshold: 0.1 });
            document.querySelectorAll('.fade-up, .fold-up, .slide-left, .slide-right').forEach(el => generalObserver.observe(el));

            // --- 4. GALERÍA CILÍNDRICA 3D ---
            const carousel = document.getElementById('carousel');
            let isDragging = false;
            let startX = 0;
            let currentAngle = 0;
            let targetAngle = 0;

            const startDrag = (x) => { isDragging = true; startX = x; carousel.classList.add('dragging'); };
            const moveDrag = (x) => { if (!isDragging) return; const walk = (x - startX) * 0.5; carousel.style.setProperty('--rotacion-actual', `${currentAngle + walk}deg`); };
            const endDrag = (x) => {
                if (!isDragging) return;
                isDragging = false; carousel.classList.remove('dragging');
                const walk = (x - startX) * 0.5; currentAngle += walk;
                targetAngle = Math.round(currentAngle / 60) * 60; currentAngle = targetAngle; 
                carousel.style.setProperty('--rotacion-actual', `${targetAngle}deg`);
            };

            carousel.addEventListener('mousedown', (e) => startDrag(e.pageX));
            document.addEventListener('mousemove', (e) => moveDrag(e.pageX));
            document.addEventListener('mouseup', (e) => endDrag(e.pageX));
            carousel.addEventListener('touchstart', (e) => startDrag(e.touches[0].pageX), { passive: true });
            document.addEventListener('touchmove', (e) => { if(isDragging) e.preventDefault(); moveDrag(e.touches[0].pageX); }, { passive: false });
            document.addEventListener('touchend', (e) => endDrag(e.changedTouches[0].pageX));

            // --- 5. CONSOLA DE INVITADO VIP (TODO EN 1) ---
            const btnEnviarTodo = document.getElementById('btn-enviar-todo');
            if (btnEnviarTodo) {
                btnEnviarTodo.addEventListener('click', () => {
                    const asistencia = document.getElementById('rsvp-asistencia').value;
                    const nombre = document.getElementById('rsvp-nombre').value;
                    const cancion = document.getElementById('rsvp-cancion').value;
                    const mensaje = document.getElementById('rsvp-mensaje').value;

                    if(nombre.trim() === "") { showToast("Por favor, indícanos tu nombre para la lista VIP 🎫"); return; }

                    let textoWA = `👑 *Acceso VIP - Cumpleaños Carlos*\n\n*Invitado:* ${nombre}\n*Asistencia:* ${asistencia}\n`;
                    if(cancion.trim() !== "") textoWA += `*Canción para el DJ:* ${cancion}\n`;
                    if(mensaje.trim() !== "") textoWA += `\n*Anécdota / Mensaje:*\n"${mensaje}"\n`;

                    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWA)}`, '_blank');
                });
            }

            // --- 6. CUENTA REGRESIVA INFINITA (MODO DEMO) ---
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 30); 
            
            function updateCountdown() {
                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                document.getElementById("dias").innerText = days.toString().padStart(2, '0');
                document.getElementById("horas").innerText = hours.toString().padStart(2, '0');
                document.getElementById("minutos").innerText = minutes.toString().padStart(2, '0');
                document.getElementById("segundos").innerText = seconds.toString().padStart(2, '0');
            }
            setInterval(updateCountdown, 1000); updateCountdown();
        });
