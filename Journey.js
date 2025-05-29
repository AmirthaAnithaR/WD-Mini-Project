document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Book Now button in hero section
    const bookNowButton = document.querySelector('.cta-button');
    if (bookNowButton) {
        bookNowButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: document.getElementById('destinations').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }

    // Modal functionality
    const modal = document.getElementById('detailsModal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalPrice = document.getElementById('modal-price');
    const modalPriceButton = document.getElementById('modal-price-button');
    const modalDuration = document.getElementById('modal-duration');
    const modalIncludes = document.getElementById('modal-includes');
    const closeBtn = document.querySelector('.close');
    const bookTicketBtn = document.getElementById('book-ticket');

    // View Details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            modalTitle.textContent = this.dataset.title;
            modalImage.src = this.dataset.image;
            modalImage.alt = this.dataset.title;
            modalPrice.textContent = this.dataset.price;
            modalPriceButton.textContent = this.dataset.price;
            modalDuration.textContent = this.dataset.duration;
            
            // Format includes as list items
            const includesItems = this.dataset.includes.split(',');
            modalIncludes.innerHTML = includesItems.map(item => 
                `<li>${item.trim()}</li>`
            ).join('');
            
            // Set data attributes for booking
            bookTicketBtn.dataset.package = this.dataset.title;
            bookTicketBtn.dataset.price = this.dataset.price;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Book Ticket button in modal
    bookTicketBtn.addEventListener('click', function() {
        const packageName = this.dataset.package;
        const packagePrice = this.dataset.price;
        
        // Show booking confirmation with package details
        const confirmation = confirm(`Confirm booking for:\n\n${packageName}\nPrice: ${packagePrice}\n\nProceed to payment?`);
        
        if (confirmation) {
            alert(`Thank you! Your booking for ${packageName} is being processed.\nOur travel consultant will contact you shortly for payment of ${packagePrice}.`);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Special offers functionality
    document.querySelectorAll('.view-offer').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const offerTitle = this.closest('.offer-item').querySelector('h3').textContent;
            alert(`Special Offer: ${offerTitle}\nOur travel consultant will contact you with more details.`);
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            alert(`Thank you ${name}! We have received your message and will contact you at ${email} shortly.`);
            this.reset();
        });
    }
});
