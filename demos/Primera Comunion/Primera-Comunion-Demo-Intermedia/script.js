
        document.addEventListener('DOMContentLoaded', () => {

            // 1. PRELOADER Y SOBRE INTERACTIVO
            const preloader = document.getElementById('preloader');
            const pantallaSobre = document.getElementById('pantalla-sobre');
            const sobreInteractivo = document.getElementById('sobre-interactivo');
            const btnMusica = document.getElementById('btn-musica');
            const musicaFondo = document.getElementById('musica-fondo');

            // Ocultar preloader inicial
            window.addEventListener('load', () => {
                setTimeout(() => { preloader.classList.add('oculto'); }, 800);
            });

            // Lógica de apertura del sobre
            sobreInteractivo.addEventListener('click', () => {
                sobreInteractivo.classList.add('animar-apertura');
                
                // Desaparecer la pantalla del sobre después de la animación
                setTimeout(() => {
                    pantallaSobre.classList.add('abierto');
                    document.body.classList.remove('no-scroll');
                    
                    // Iniciar Música
                    musicaFondo.play().then(() => {
                        btnMusica.classList.add('visible');
                        btnMusica.classList.add('musica-reproduciendo');
                    }).catch(error => {
                        console.log("Auto-play bloqueado, mostrando botón de todas formas.");
                        btnMusica.classList.add('visible');
                    });

                    // Disparar las animaciones de la portada
                    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

                }, 1200); // Esperar a que la tapa gire
            });

            // 2. ANIMACIONES SCROLL (INTERSECTION OBSERVER)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
        });

        // 3. FUNCIONES GLOBALES
        function toggleMusica() {
            const musicaFondo = document.getElementById('musica-fondo');
            const btnMusica = document.getElementById('btn-musica');
            
            if (musicaFondo.paused) {
                musicaFondo.play();
                btnMusica.classList.add('musica-reproduciendo');
            } else {
                musicaFondo.pause();
                btnMusica.classList.remove('musica-reproduciendo');
            }
        }

        function toggleBanco() {
            const info = document.getElementById('info-bancaria');
            info.classList.toggle('visible');
        }
