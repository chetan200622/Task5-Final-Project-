document.addEventListener('DOMContentLoaded', () => {
    // Lazy Load Images
    const lazyImages = document.querySelectorAll('img.lazyload');

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Check if data-src exists to prevent errors on images without it
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.remove('lazyload');
                observer.unobserve(img);
            }
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(lazyLoad, {
            rootMargin: '0px 0px 100px 0px' // Load images when they are 100px from viewport
        });

        lazyImages.forEach(img => {
            observer.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.remove('lazyload');
        });
    }

    // Example of a simple "Read More" button interaction (for demonstration)
     const readMoreButtons = document.querySelectorAll('.read-more-btn'); // Note the updated class name
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Find the parent .post-content-wrapper for this specific button
            const postContentWrapper = button.previousElementSibling; // This should be the .post-content-wrapper div

            if (postContentWrapper) {
                // Toggle the 'expanded' class on the wrapper
                postContentWrapper.classList.toggle('expanded');

                // Change the button text based on the new state
                if (postContentWrapper.classList.contains('expanded')) {
                    button.textContent = 'Read Less';
                } else {
                    button.textContent = 'Read More';
                }
            }
        });
    });

    // Contact Form Submission Handler (Client-side only for demonstration)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you'd send this data to a server
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            console.log('Form Submitted:', formObject);
            alert('Thank you for your message! We will get back to you soon.');

            contactForm.reset(); // Clear the form
        });
    }

    // Smooth Scrolling for anchor links (e.g., categories, authors in sidebar)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});