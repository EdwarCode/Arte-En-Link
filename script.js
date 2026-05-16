
        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');

            // Abrir/Cerrar menú al tocar la hamburguesa
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                
                // Cambia el ícono de hamburguesa a "X"
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.replace('ph-list', 'ph-x');
                } else {
                    menuToggle.classList.replace('ph-x', 'ph-list');
                }
            });

            // Cerrar el menú automáticamente al hacer clic en cualquier enlace
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.replace('ph-x', 'ph-list');
                });
            });

            // Lógica del Preloader
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.classList.add('oculto');
                }, 600); // 600ms extra para que se vea la animación inicial
            });

            // Lógica de Animaciones al hacer Scroll (Intersection Observer)
            // Primero, preparamos los elementos agregándoles las clases iniciales dinámicamente
            const elementosAAnimar = [
                { selector: '.titulo-seccion', delay: '' },
                { selector: '.hero-texto', delay: 'delay-1' },
                { selector: '.hero-imagen', delay: 'delay-3' },
                { selector: '.garantia-card:nth-child(1)', delay: 'delay-1' },
                { selector: '.garantia-card:nth-child(2)', delay: 'delay-2' },
                { selector: '.garantia-card:nth-child(3)', delay: 'delay-3' },
                { selector: '.categoria-card', delay: '' }, // A estos no les ponemos delay porque son muchos
                { selector: '.paso-izquierda', delay: 'delay-1' },
                { selector: '.paso-derecha', delay: 'delay-2' },
                { selector: '.precio-card:nth-child(1)', delay: 'delay-1' },
                { selector: '.precio-card:nth-child(2)', delay: 'delay-2' },
                { selector: '.precio-card:nth-child(3)', delay: 'delay-3' },
                { selector: '.footer-col:nth-child(1)', delay: '' },
                { selector: '.footer-col:nth-child(2)', delay: 'delay-1' },
                { selector: '.footer-col:nth-child(3)', delay: 'delay-2' }
            ];

            elementosAAnimar.forEach(grupo => {
                document.querySelectorAll(grupo.selector).forEach(el => {
                    el.classList.add('animar-oculto');
                    if(grupo.delay) el.classList.add(grupo.delay);
                });
            });

            // Creamos el observador
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15 // Se activa cuando el 15% del elemento es visible
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animar-visible');
                        observer.unobserve(entry.target); // Animamos solo una vez al entrar a pantalla
                    }
                });
            }, observerOptions);

            // Observamos todos los elementos preparados
            document.querySelectorAll('.animar-oculto').forEach(el => observer.observe(el));
        });