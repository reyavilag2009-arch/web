document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#ffffff';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            
            // Adjust individual links for mobile menu
            const links = navLinks.querySelectorAll('li');
            links.forEach(li => {
                li.style.margin = '10px 0';
                li.style.textAlign = 'center';
            });
        }
    });

    // Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;
            
            // Collect Form Data
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                service: contactForm.querySelector('select').value,
                message: contactForm.querySelector('textarea').value,
                date: new Date().toISOString()
            };

            btn.textContent = 'Enviando...';
            btn.disabled = true;

            // Save to Firebase Firestore
            db.collection("solicitudes").add(formData)
                .then(() => {
                    alert('¡Gracias! Hemos recibido tu solicitud correctamente.');
                    contactForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                })
                .catch((error) => {
                    console.error("Error al enviar: ", error);
                    alert('Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.');
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        });
    }

    // Smooth Scrolling for Nav Links (Already handled by CSS scroll-behavior, but good for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Scroll Reveal Effect (Simple Implementation)
    const revealElements = document.querySelectorAll('.service-card, .price-card');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('animate__animated', 'animate__fadeInUp');
                el.style.opacity = '1';
            }
        });
    };

    // Initial styles for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Cursor Glow Tracking
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Hover effect on buttons for cursor glow
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .price-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '800px';
            cursorGlow.style.height = '800px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0) 70%)';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '600px';
            cursorGlow.style.height = '600px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 70%)';
        });
    });
});
