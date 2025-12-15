// --- FAQ accordion ---
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function() {
        const item = this.parentElement;
        item.classList.toggle('open');
    });
});

// --- Responsive Carousel Slider (with Dots) ---
const initCarousel = () => {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = carousel.querySelectorAll('.carousel-item');
    const totalCards = cards.length;
    let currentPosition = 0;

    let dots = [];

    const setupDots = () => {
        dotsContainer.innerHTML = '';
        const visibleCards = window.innerWidth <= 768 ? 1 : 3; // Adjust visible cards for mobile
        const step = window.innerWidth <= 768 ? 1 : 1; // Move one card at a time
        const maxPosition = totalCards - visibleCards;
        
        const numDots = Math.ceil(totalCards / step);
        if (totalCards <= visibleCards) {
             dotsContainer.style.display = 'none';
             return;
        }
        dotsContainer.style.display = 'block';

        // One dot per page/step
        const totalPages = Math.ceil((totalCards - visibleCards) / step) + 1;

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentPosition = i * step;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
        dots = dotsContainer.querySelectorAll('.dot');
    }


    const updateCarousel = () => {
        const visibleCards = window.innerWidth <= 768 ? 1 : 3; // Adjust visible cards
        const step = 1;
        const maxPos = totalCards - visibleCards;

        if (currentPosition > maxPos) currentPosition = maxPos;
        if (currentPosition < 0) currentPosition = 0;

        const cardWidth = cards[0].offsetWidth;
        const gap = parseFloat(window.getComputedStyle(carousel).gap);
        const transformValue = currentPosition * (cardWidth + gap);

        carousel.style.transform = `translateX(-${transformValue}px)`;

        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition >= maxPos;

        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        const activeDotIndex = Math.floor(currentPosition / step);
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.add('active');
        }
    };

    prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const visibleCards = window.innerWidth <= 768 ? 1 : 3;
        const maxPos = totalCards - visibleCards;
        if (currentPosition < maxPos) {
            currentPosition++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', () => {
        setupDots();
        updateCarousel();
    });

    setupDots();
    updateCarousel(); // Initial call
};


// --- Scroll-based Slider Dots ---
const setupScrollDots = (sliderSelector, dotsSelector) => {
    const slider = document.querySelector(sliderSelector);
    const dotsContainer = document.querySelector(dotsSelector);
    if (!slider || !dotsContainer) return;
    
    const items = slider.children;
    if (items.length === 0) return;

    // Only show dots if the slider is scrollable
    if (slider.scrollWidth <= slider.clientWidth) {
        dotsContainer.style.display = 'none';
        return;
    }
     dotsContainer.style.display = 'block';

    // Create dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('.dot');
    dots[0]?.classList.add('active'); // Activate first dot initially

    // Update dots on scroll
    slider.addEventListener('scroll', () => {
        const itemWidth = items[0].offsetWidth + parseFloat(window.getComputedStyle(slider).gap);
        const scrollLeft = slider.scrollLeft;
        const currentIndex = Math.round(scrollLeft / itemWidth);

        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }, { passive: true }); // Use passive listener for better scroll performance
};

// --- Form Submission Handler ---
const initFormHandler = () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            // Redirect to the thank you page
            window.location.href = 'thankyou.html';
        });
    }
};

// --- Initialize all scripts on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initFormHandler();
    setupScrollDots('.skills-cards-row', '.skills-dots');
});


// --- Open Popup Form on Button Clicks ---
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popupFormOverlay');
    const closeBtn = document.getElementById('closePopupForm');
  
    const triggerButtons = [
      'Enquire Now',
      'Start My Cinema Makeup Journey',
      'Speak with a Course Expert',
      'Get Course Details from Our Expert',
      'Enroll Now →',
      'Enroll in a Course',
      'Schedule a Call with Ena →',
      'Discuss Your Goals with Our Expert →',
      'Reserve Your Seat - Speak to Expert Now →'
    ];
  
    document.querySelectorAll('button, .enroll-btn, .cta-btn, .skills-btn, .learn-artist-btn, .classes-cta-btn').forEach(btn => {
      if (triggerButtons.includes(btn.textContent.trim())) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          popup.style.display = 'flex';
        });
      }
    });
  
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
  

  function openPopup() {
    document.getElementById('popupFormOverlay').style.display = 'flex';
  }

  document.getElementById('closePopupForm').addEventListener('click', function () {
    document.getElementById('popupFormOverlay').style.display = 'none';
  });

  



document.querySelectorAll(".open-popup-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.getElementById("popupFormOverlay").style.display = "flex";
  });
});





    // Function to show popup
  function showPopup() {
    document.getElementById('popupFormOverlay').style.display = 'block';
  }

  // Function to hide popup
  function hidePopup() {
    document.getElementById('popupFormOverlay').style.display = 'none';
  }

  // Attach click events to all popup-triggering buttons
  document.getElementById('openPopupForm').addEventListener('click', showPopup);
  document.getElementById('openPopupExpert').addEventListener('click', showPopup);
  document.getElementById('openPopupReserve').addEventListener('click', showPopup);

  // Close button
  document.getElementById('closePopupForm').addEventListener('click', hidePopup);

  // Optional: Click outside form to close
  document.getElementById('popupFormOverlay').addEventListener('click', function (e) {
    if (e.target === this) hidePopup();
  });


