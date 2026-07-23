
        // --- 0. PRELOADER ---
        window.addEventListener('load', () => {
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if(preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 1000);
                }
            }, 1000); // Muestra el preloader un segundo
        });

        // --- 1. LÓGICA DE APERTURA (PIRÁMIDE) Y AUDIO ---
        let opened = false;
        
        function openInvitation() {
            if(opened) return;
            opened = true;

            const audio = document.getElementById('bg-music');
            
            // Animación de desaparición del botón Emblema
            gsap.to("#emblem", { scale: 0, opacity: 0, duration: 0.8, ease: "power2.in" });

            // Animación de puertas deslizándose
            gsap.to("#gate-left", { xPercent: -100, duration: 2, ease: "power3.inOut", delay: 0.5 });
            gsap.to("#gate-right", { xPercent: 100, duration: 2, ease: "power3.inOut", delay: 0.5 });
            
            // Mostrar contenido principal
            gsap.to("#main-content", { display: "block", opacity: 1, duration: 2, delay: 1.5 });

            // Iniciar Audio a los 2.5 segundos con Fade In
            setTimeout(() => {
                audio.volume = 0;
                audio.play().catch(e => console.log("Auto-play prevenido por el navegador"));
                // Fade in manual
                let vol = 0;
                let fade = setInterval(() => {
                    if (vol < 0.9) {
                        vol += 0.1;
                        audio.volume = vol;
                    } else {
                        clearInterval(fade);
                    }
                }, 200);
            }, 2500);

            // Iniciar animaciones de Scroll
            initScrollAnimations();
        }

        // --- 2. EFECTOS PARALLAX (EL NÚMERO 46) ---
        function initScrollAnimations() {
            gsap.registerPlugin(ScrollTrigger);

            // Animar opacidad y difuminado del gran 46 de fondo al hacer scroll
            gsap.to("#bg-46", {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                },
                opacity: 0.15,
                filter: "blur(1px)",
                y: 100 // Ligero movimiento hacia abajo
            });

            // Aparecer elementos suavemente
            const sections = document.querySelectorAll("section");
            sections.forEach((sec) => {
                gsap.from(sec, {
                    scrollTrigger: {
                        trigger: sec,
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }

        // --- 3. CONTADOR REGRESIVO ---
        const countdownDate = new Date("Jul 25, 2026 15:00:00").getTime();
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById("days").innerHTML = "00";
                document.getElementById("hours").innerHTML = "00";
                document.getElementById("mins").innerHTML = "00";
                document.getElementById("secs").innerHTML = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML = String(days).padStart(2, '0');
            document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
            document.getElementById("mins").innerHTML = String(mins).padStart(2, '0');
            document.getElementById("secs").innerHTML = String(secs).padStart(2, '0');
        }, 1000);

        // --- 5. LÓGICA DE CALENDARIO APPLE (.ics) ---
        function downloadICS() {
            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:https://maps.google.com/maps?q=16.7064658,-92.6267188
DTSTART:20260725T210000Z
DTEND:20260726T030000Z
SUMMARY:Cumpleaños 46 de Vicente Díaz Jiménez
DESCRIPTION:Acompáñanos a celebrar los 46 años de Vicente.
LOCATION:1RA CERRADA DE LA CALLE MIGUEL RUA #3, COLONIA MAYA, San Cristobal de las Casas
END:VEVENT
END:VCALENDAR`;
            
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'Cumple_Vicente_46.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // --- 6. LÓGICA RSVP & CONFETI ---
        function confirmRSVP() {
            const name = document.getElementById('rsvp-name').value;
            const msg = document.getElementById('rsvp-msg').value;
            
            if(!name) {
                // Pequeña vibración visual si no pone nombre
                gsap.to("#rsvp-name", {x: [-10, 10, -10, 10, 0], duration: 0.4});
                document.getElementById('rsvp-name').style.borderColor = "#ef4444";
                return;
            }

            // Confeti Dorado Faraónico
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#F4C430', '#D4AF37', '#ffffff']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#F4C430', '#D4AF37', '#ffffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());

            // Generar Link de WhatsApp
            const phone = "529671954562";
            let text = `¡Hola! Confirmo mi asistencia al cumpleaños 46 de Vicente el 25 de julio.%0A%0AAtentamente: *${name}*`;
            if (msg) {
                text += `%0A%0AMensaje: _${msg}_`;
            }
            
            // Retrasar redirección 1.5s para ver el confeti
            setTimeout(() => {
                window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
            }, 1500);
        }
