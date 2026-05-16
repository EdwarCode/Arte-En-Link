
document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => { preloader.classList.add('oculto'); }, 1200);
    });

    // 2. MÚSICA DE FONDO
    const musicaFondo = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');
    const iconoMusica = document.getElementById('icono-musica');
    let musicaReproduciendo = false;

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

    // 3. ANIMACIONES SCROLL (Intersection Observer)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 4. CUENTA REGRESIVA
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

