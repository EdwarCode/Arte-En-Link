
        document.addEventListener('DOMContentLoaded', () => {
            
            // Lógica del Preloader
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => { 
                setTimeout(() => { preloader.classList.add('oculto'); }, 600); 
            });

            // Intersection Observer para Animaciones de Scroll Suave
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animar-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.animar-oculto').forEach(el => observer.observe(el));
        });
    