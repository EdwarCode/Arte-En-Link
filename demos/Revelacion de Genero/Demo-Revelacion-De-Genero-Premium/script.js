
document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER Y AUTOPLAY INTELIGENTE
    const preloader = document.getElementById('preloader');
    const musicaFondo = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');
    const iconoMusica = document.getElementById('icono-musica');
    let musicaReproduciendo = false;
    let interaccionIniciada = false;
    let intentoPlay = false;

    window.addEventListener('load', () => { setTimeout(() => { preloader.classList.add('oculto'); }, 1500); });

    function iniciarAudioInteraccion() {
        if(interaccionIniciada || intentoPlay) return;
        intentoPlay = true; 
        const playPromise = musicaFondo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                iconoMusica.classList.add('girar');
                iconoMusica.classList.replace('ph-play-circle', 'ph-pause-circle');
                musicaReproduciendo = true; interaccionIniciada = true;
                window.removeEventListener('scroll', iniciarAudioInteraccion);
                window.removeEventListener('touchstart', iniciarAudioInteraccion);
                window.removeEventListener('click', iniciarAudioInteraccion);
            }).catch(e => {
                console.log("Autoplay bloqueado. Se requiere toque o clic.");
                intentoPlay = false; 
                window.removeEventListener('scroll', iniciarAudioInteraccion);
            });
        }
    }
    
    window.addEventListener('scroll', iniciarAudioInteraccion, { passive: true });
    window.addEventListener('touchstart', iniciarAudioInteraccion, { passive: true });
    window.addEventListener('click', iniciarAudioInteraccion);

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
        interaccionIniciada = true; 
    });

    // 2. PARALLAX DE FONDO (Giroscopio para móvil y Mouse para PC)
    const fondoAnimado = document.getElementById('fondo-parallax');
    
    // Parallax para Computadoras (Mouse)
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30; // Max 15px
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        fondoAnimado.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    // Parallax para Celulares (Giroscopio)
    window.addEventListener('deviceorientation', (e) => {
        if(!e.gamma && !e.beta) return;
        let gamma = e.gamma; // Izq a Der
        let beta = e.beta;   // Adelante a Atrás
        // Limitar valores para que no se vuelva loco
        if(gamma > 45) gamma = 45; if(gamma < -45) gamma = -45;
        if(beta > 45) beta = 45; if(beta < -45) beta = -45;
        
        const moveX = (gamma / 45) * 20; 
        const moveY = (beta / 45) * 20;
        fondoAnimado.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    // 3. ANIMACIONES SCROLL VARIADAS
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-up, .zoom-in, .slide-left, .slide-right').forEach(el => observer.observe(el));

    // 4. EFECTO FIESTA DE 4 SEGUNDOS
    const seccionGaleria = document.getElementById('seccion-galeria');
    let fiestaDisparada = false;

    const observerGaleria = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !fiestaDisparada) {
            fiestaDisparada = true; lanzarFiesta4Segundos();
        }
    }, { threshold: 0.3 });
    if(seccionGaleria) observerGaleria.observe(seccionGaleria);

    function lanzarFiesta4Segundos() {
        const duracion = 4000; const fin = Date.now() + duracion;
        const frameConfeti = () => {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#F4C2C2', '#89CFF0', '#D4AF37'], zIndex: 9999 });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#F4C2C2', '#89CFF0', '#D4AF37'], zIndex: 9999 });
            if (Date.now() < fin) requestAnimationFrame(frameConfeti);
        };
        frameConfeti();

        const svgsFiesta = [
            `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5,2A3.5,3.5 0 0,0 14,5.5C14,6.04 14.12,6.55 14.33,7.03C13.6,6.7 12.83,6.5 12,6.5C11.17,6.5 10.4,6.7 9.67,7.03C9.88,6.55 10,6.04 10,5.5A3.5,3.5 0 0,0 6.5,2A3.5,3.5 0 0,0 3,5.5C3,7.18 4.18,8.58 5.75,8.91C5.27,9.81 5,10.87 5,12C5,15.86 8.14,19 12,19C15.86,19 19,15.86 19,12C19,10.87 18.73,9.81 18.25,8.91C19.82,8.58 21,7.18 21,5.5A3.5,3.5 0 0,0 17.5,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17Z"/></svg>`,
            `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A2,2 0 0,0 10,4A2,2 0 0,0 12,6A2,2 0 0,0 14,4A2,2 0 0,0 12,2M8,8A2,2 0 0,0 6,10C6,12.21 7.79,14 10,14V17A2,2 0 0,0 8,19A1,1 0 0,0 7,20A1,1 0 0,0 8,21A3,3 0 0,1 11,18V14C13.21,14 15,12.21 15,10A2,2 0 0,0 13,8H8M16,8A2,2 0 0,0 14,10C14,12.21 15.79,14 18,14V17A2,2 0 0,0 16,19A1,1 0 0,0 15,20A1,1 0 0,0 16,21A3,3 0 0,1 19,18V14C21.21,14 23,12.21 23,10A2,2 0 0,0 21,8H16Z"/></svg>`,
            `<svg viewBox="0 0 24 36" fill="currentColor"><path d="M12,0 C5.373,0 0,5.373 0,12 C0,19.925 12,28 12,28 C12,28 24,19.925 24,12 C24,5.373 18.627,0 12,0 Z"/><path d="M11,28 L13,28 L14,31 L10,31 Z"/><path d="M12,31 C12,31 10,34 14,36" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`
        ];

        const intervalSVGs = setInterval(() => {
            if(Date.now() > fin) { clearInterval(intervalSVGs); return; }
            const el = document.createElement('div'); el.className = 'shape-fiesta';
            el.innerHTML = svgsFiesta[Math.floor(Math.random() * svgsFiesta.length)];
            el.style.color = Math.random() > 0.5 ? '#F4C2C2' : '#89CFF0';
            const size = Math.random() * 30 + 25; el.style.width = size + 'px'; el.style.height = size + 'px';
            el.style.left = (Math.random() * 100) + 'vw';
            el.style.setProperty('--desplazamiento-x', (Math.random() * 200 - 100) + 'px');
            el.style.setProperty('--rotacion', (Math.random() * 360 - 180) + 'deg');
            document.body.appendChild(el);
            setTimeout(() => { el.remove(); }, 4000);
        }, 150);
    }

    // 5. CUENTA REGRESIVA
    const targetDate = new Date(); targetDate.setDate(targetDate.getDate() + 30); targetDate.setHours(16, 0, 0, 0);
    function updateCountdown() {
        const distance = targetDate.getTime() - new Date().getTime();
        if (distance < 0) return;
        document.getElementById("dias").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("horas").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutos").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("segundos").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
    setInterval(updateCountdown, 1000); updateCountdown();

    // 6. LÓGICA DEL FORMULARIO VIP (Buzón + Canciones + Confirmación)
    document.getElementById('form-pase-vip').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los datos del formulario
        const nombre = document.getElementById('vip-nombre').value;
        const asistencia = document.querySelector('input[name="asistencia"]:checked').value;
        let cancion = document.getElementById('vip-cancion').value.trim();
        let deseo = document.getElementById('vip-deseo').value.trim();
        
        // Textos por defecto si los dejan vacíos
        if(!cancion) cancion = "¡La que ponga el DJ!";
        if(!deseo) deseo = "¡Les deseo toda la felicidad del mundo en esta nueva etapa!";
        
        // Armar el mensaje consolidado para WhatsApp
        const mensaje = `*¡Hola! Ya tengo mi Pase VIP para la Revelación de Género.* 🎉\n\n👤 *Invitado:* ${nombre}\n✔️ *Asistencia:* ${asistencia}\n💌 *Deseo para el bebé:* ${deseo}\n🎵 *Mi canción sugerida:* ${cancion}`;
        
        // Redirigir a WhatsApp
        const numeroWhatsApp = "520000000000"; // Cambiar por el tuyo en producción
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');
    });

    // 7. LÓGICA MODAL LOOKBOOK
    const modalLookbook = document.getElementById('modal-lookbook');
    document.getElementById('btn-lookbook').addEventListener('click', () => { modalLookbook.classList.add('activo'); });
    document.getElementById('cerrar-modal').addEventListener('click', () => { modalLookbook.classList.remove('activo'); });
    modalLookbook.addEventListener('click', (e) => { if(e.target === modalLookbook) modalLookbook.classList.remove('activo'); });

});

// LÓGICA DE VOTACIÓN DE EQUIPOS
function emitirVoto(equipo, botonElement) {
    if(botonElement.classList.contains('votado')) return;
    botonElement.classList.add('votado');
    const colorConfetti = equipo === 'niña' ? '#F4C2C2' : '#89CFF0';
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: [colorConfetti, '#ffffff', '#D4AF37'], disableForReducedMotion: true });
    
    const icono = equipo === 'niña' ? '🎀' : '🧢';
    const numeroWhatsApp = "520000000000"; 
    const mensaje = `¡Ya estoy listo! Mi voto es para Team ${equipo.charAt(0).toUpperCase() + equipo.slice(1)} ${icono}`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    setTimeout(() => { window.open(urlWhatsApp, '_blank'); botonElement.classList.remove('votado'); }, 1500);
}
