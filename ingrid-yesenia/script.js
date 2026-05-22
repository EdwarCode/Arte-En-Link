
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            initThreeJSCaustics(); // Nuevo Motor Gráfico
            initPreloaderAnimations();
            initCountdown();
            
            new Swiper(".mySwiper", { 
                spaceBetween: 20, 
                pagination: { el: ".swiper-pagination", clickable: true },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0
                    },
                    768: {
                        slidesPerView: "auto",
                        slidesOffsetBefore: 24,
                        slidesOffsetAfter: 24
                    }
                }
            });
        });

        /* =========================================
           1. THREE.JS: CAUSTICS (Luz a través de cristal)
        ========================================= */
        function initThreeJSCaustics() {
            const container = document.getElementById('canvas-container');
            const scene = new THREE.Scene();
            
            // Cámara
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 2;

            // Renderizador
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización móvil
            container.appendChild(renderer.domElement);

            // Shader Material para calcular los reflejos (Caustics)
            const causticsMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    mouse: { value: new THREE.Vector2(0.5, 0.5) },
                    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    uniform vec2 mouse;
                    varying vec2 vUv;

                    // Función para generar los patrones de luz facetados
                    float getCaustics(vec2 p) {
                        float t = time * 0.15;
                        vec2 q = p - vec2(0.5);
                        q.x += (mouse.x - 0.5) * 0.2; // Sutil interacción
                        q.y += (mouse.y - 0.5) * 0.2;
                        
                        float a = atan(q.y, q.x);
                        float r = length(q);
                        
                        // Matemáticas para simular el tallado del cristal
                        float v = sin(r * 10.0 - t * 2.0) + cos(a * 5.0 + t);
                        v += sin(r * 20.0 + a * 3.0 - t * 3.0);
                        v *= smoothstep(0.8, 0.0, r); // Fade out en los bordes
                        
                        return smoothstep(0.5, 2.0, v); // Contraste duro para efecto cristal
                    }

                    void main() {
                        vec2 uv = vUv;
                        
                        // Cálculo de luces
                        float caustic1 = getCaustics(uv);
                        float caustic2 = getCaustics(uv * 1.5 + vec2(0.2));
                        float caustic3 = getCaustics(uv * 0.8 - vec2(0.1));
                        
                        float totalCaustics = caustic1 * 0.5 + caustic2 * 0.3 + caustic3 * 0.2;
                        
                        // Paleta Nivel Dios
                        vec3 bg = vec3(0.02, 0.008, 0.012); // #050203 Oscuro
                        vec3 colorVino = vec3(0.447, 0.184, 0.216); // #722F37
                        vec3 colorDorado = vec3(0.831, 0.686, 0.216); // #D4AF37
                        
                        // Mezcla: Fondo oscuro + Luces coloreadas proyectadas
                        vec3 finalColor = mix(bg, colorVino, totalCaustics * 0.8);
                        finalColor += colorDorado * pow(totalCaustics, 3.0) * 0.5; // Destellos intensos en el núcleo
                        
                        gl_FragColor = vec4(finalColor, 1.0);
                    }
                `
            });

            // Plano que ocupa toda la pantalla
            const geometry = new THREE.PlaneGeometry(10, 10);
            const plane = new THREE.Mesh(geometry, causticsMaterial);
            scene.add(plane);

            // Interacción táctil/mouse
            let mouseX = 0.5;
            let mouseY = 0.5;
            const updateMouse = (x, y) => {
                mouseX = x / window.innerWidth;
                mouseY = 1.0 - (y / window.innerHeight);
                // Inercia suave hacia el mouse
                causticsMaterial.uniforms.mouse.value.x += (mouseX - causticsMaterial.uniforms.mouse.value.x) * 0.05;
                causticsMaterial.uniforms.mouse.value.y += (mouseY - causticsMaterial.uniforms.mouse.value.y) * 0.05;
            };

            window.addEventListener('mousemove', (e) => updateMouse(e.clientX, e.clientY));
            window.addEventListener('touchmove', (e) => updateMouse(e.touches[0].clientX, e.touches[0].clientY));

            // Bucle de animación (60fps)
            const clock = new THREE.Clock();
            function animate() {
                requestAnimationFrame(animate);
                causticsMaterial.uniforms.time.value = clock.getElapsedTime();
                renderer.render(scene, camera);
            }
            animate();

            // Responsividad
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                causticsMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
            });
        }

        /* =========================================
           2. ANIMACIONES ANIME.JS Y PRELOADER
        ========================================= */
        function initPreloaderAnimations() {
            anime({ 
                targets: '.draw-path', 
                strokeDashoffset: [anime.setDashoffset, 0], 
                easing: 'easeInOutSine', 
                duration: 2500, 
                delay: (el, i) => i * 250, 
                direction: 'forwards', 
                complete: () => {
                    anime({ targets: '#enter-btn', opacity: 1, translateY: [20, 0], duration: 1000 });
                } 
            });
        }

        function enterInvitation() { 
            const audio = document.getElementById('bg-audio'); 
            audio.volume = 0.4; 
            safePlayAudio();
            
            document.getElementById('preloader').style.opacity = '0'; 
            
            setTimeout(() => { 
                document.getElementById('preloader').style.display = 'none'; 
                document.body.classList.remove('no-scroll'); 
                document.getElementById('content').classList.remove('hidden'); 
                shootConfetti(); 
                initScrollAnimations(); 
            }, 1000); 
        }

        function shootConfetti() { 
            const end = Date.now() + 5000; 
            (function frame() { 
                confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#722F37', '#D4AF37', '#FFFFFF'], zIndex: 60 }); 
                confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#722F37', '#D4AF37', '#FFFFFF'], zIndex: 60 }); 
                if (Date.now() < end) requestAnimationFrame(frame); 
            })(); 
        }

        function initScrollAnimations() { 
            const observer = new IntersectionObserver((entries) => { 
                entries.forEach(entry => { 
                    if (entry.isIntersecting) { 
                        anime({ 
                            targets: entry.target, 
                            translateY: [40, 0], 
                            opacity: [0, 1], 
                            easing: 'easeOutCubic', 
                            duration: 1200, 
                            delay: 50 
                        }); 
                        observer.unobserve(entry.target); 
                    } 
                }); 
            }, { threshold: 0.1 }); 
            
            document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el)); 
        }

        /* =========================================
           3. UI UTILITIES (Audio & Countdown)
        ========================================= */
        let isPlaying = false;
        let playPromise;

        function safePlayAudio() {
            const audio = document.getElementById('bg-audio');
            const icon = document.getElementById('audio-icon');
            playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    icon.setAttribute('data-lucide', 'music');
                    lucide.createIcons();
                }).catch(e => {
                    console.log("Autoplay bloqueado:", e);
                });
            }
        }

        function safePauseAudio() {
            const audio = document.getElementById('bg-audio');
            const icon = document.getElementById('audio-icon');
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audio.pause();
                    isPlaying = false;
                    icon.setAttribute('data-lucide', 'volume-x');
                    lucide.createIcons();
                }).catch(e => console.log(e));
            } else {
                audio.pause();
                isPlaying = false;
                icon.setAttribute('data-lucide', 'volume-x');
                lucide.createIcons();
            }
        }

        function toggleAudio() {
            if (isPlaying) {
                safePauseAudio();
            } else {
                safePlayAudio();
            }
        }

        function initCountdown() {
            const targetDate = new Date("June 6, 2026 17:00:00").getTime(); 
            setInterval(() => { 
                const now = new Date().getTime(); 
                const distance = targetDate - now; 
                if (distance < 0) return; 
                
                document.getElementById("days").innerText = Math.floor(distance / (1000*60*60*24)).toString().padStart(2, '0'); 
                document.getElementById("hours").innerText = Math.floor((distance % (1000*60*60*24)) / (1000*60*60)).toString().padStart(2, '0'); 
                document.getElementById("minutes").innerText = Math.floor((distance % (1000*60*60)) / (1000*60)).toString().padStart(2, '0'); 
                document.getElementById("seconds").innerText = Math.floor((distance % (1000*60)) / 1000).toString().padStart(2, '0'); 
            }, 1000);
        }

        /* =========================================
           4. RSVP & CALENDARIO
        ========================================= */
        let pases = 1; 
        function cambiarPases(val) { 
            pases += val; 
            if(pases < 1) pases = 1;
            if(pases > 10) pases = 10;
            document.getElementById('contador-pases').innerText = pases; 
        }

        function enviarWhatsApp() { 
            const inputNombre = document.getElementById('nombre');
            const errorNombre = document.getElementById('error-nombre');
            const asistencia = document.querySelector('input[name="asistencia"]:checked').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if(!inputNombre.value.trim()) {
                inputNombre.classList.add('border-red-400');
                errorNombre.classList.remove('hidden');
                return;
            }
            
            inputNombre.classList.remove('border-red-400');
            errorNombre.classList.add('hidden');

            const numero = "5219671361956"; 
            const numPases = asistencia.includes('Sí') ? pases : 0;
            const texto = `¡Hola! 🥂 Te contacto para confirmar asistencia a los espectaculares XV Años de Ingrid Yesenia.\n\n👤 *Nombre/Familia:* ${inputNombre.value}\n✅ *Estatus:* ${asistencia}\n🎟️ *Pases:* ${numPases}\n💌 *Mensaje:* ${mensaje ? mensaje : '¡Felicidades!'}`; 
            
            if(asistencia.includes('Sí')) shootConfetti();

            setTimeout(() => window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, '_blank'), 800);
        }

        function toggleCalendarMenu() { document.getElementById('calendar-menu').classList.toggle('hidden'); }
        function addToGoogleCalendar(e) { 
            e.preventDefault(); 
            window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=XV%20A%C3%B1os%20de%20Ingrid%20Yesenia&dates=20260606T230000Z/20260607T050000Z&details=%C2%A1Acomp%C3%A1%C3%B1anos%20a%20celebrar!&location=Sal%C3%B3n%20Tiale,%20Sector%20Salud`, '_blank'); 
            toggleCalendarMenu(); 
        }
        function downloadICS(e) { 
            e.preventDefault(); 
            const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:XV Años Ingrid Yesenia\nDTSTART:20260606T230000Z\nDTEND:20260607T050000Z\nLOCATION:Salón Tiale\nDESCRIPTION:¡Acompáñanos a celebrar la magia de los XV Años!\nEND:VEVENT\nEND:VCALENDAR`;
            const link = document.createElement('a'); 
            link.href = window.URL.createObjectURL(new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })); 
            link.setAttribute('download', 'XV_Ingrid.ics'); 
            document.body.appendChild(link); link.click(); document.body.removeChild(link);
            toggleCalendarMenu(); 
        }
