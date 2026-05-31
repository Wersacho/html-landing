// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Close mobile menu if open
    const navMobile = document.getElementById('navMobile');
    const burgerBtn = document.getElementById('burgerBtn');
    if (navMobile.classList.contains('active')) {
        navMobile.classList.remove('active');
        burgerBtn.classList.remove('active');
    }
}

// Burger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const navMobile = document.getElementById('navMobile');

    burgerBtn.addEventListener('click', function() {
        burgerBtn.classList.toggle('active');
        navMobile.classList.toggle('active');
    });

    // Close mobile menu when clicking on link
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Desktop navigation smooth scroll
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Open first accordion item by default
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].parentElement.classList.add('active');
    }

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // Form validation and submission
    const registrationForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset errors
        nameError.textContent = '';
        emailError.textContent = '';
        nameError.classList.remove('show');
        emailError.classList.remove('show');
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        successMessage.classList.remove('show');

        let hasError = false;

        // Validate name
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Введите ваше имя';
            nameError.classList.add('show');
            nameInput.classList.add('error');
            hasError = true;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Введите email';
            emailError.classList.add('show');
            emailInput.classList.add('error');
            hasError = true;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Введите корректный email';
            emailError.classList.add('show');
            emailInput.classList.add('error');
            hasError = true;
        }

        // If no errors, show success message
        if (!hasError) {
            const submitBtn = registrationForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 10 9 13 14 8"></polyline></svg>Заявка отправлена!</span>';

            successMessage.classList.add('show');

            // Reset form after 3 seconds
            setTimeout(() => {
                registrationForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
                successMessage.classList.remove('show');
            }, 3000);
        }
    });

    // Add hover animations to benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
