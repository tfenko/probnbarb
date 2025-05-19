console.log('script.js завантажений і виконується');
document.addEventListener("DOMContentLoaded", () => {

  // Initialize AOS animation library
  AOS.init();

  // Modal booking logic
  const bookNowBtnNavbar = document.querySelectorAll("#bookNowBtnNavbar");
  const modal = document.getElementById("bookingModal");
  const closeModalBtn = document.getElementById("closeModal");

  // Show modal on "Book Now" button click
  bookNowBtnNavbar.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal on close button click
  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });

  // Ensure modal is closed on page load
  window.addEventListener("load", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  });

  // Smooth scroll for navigation links
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (href === "#") return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Carousel logic
  const carousel = document.getElementById('carousel');
  const items = document.querySelectorAll('.carousel-item');
  const galleryBtn = document.getElementById('galleryBtn');
  const galleryBtn2 = document.getElementById('galleryBtn2');

  let currentIndex1 = 0;

  // Show carousel slide by index
  function showSlideCarousel(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    // Reset carousel if at the last slide
    if (index === 7) {
      setTimeout(() => {
        carousel.style.transition = 'transform 0.3s ease-in-out';
        carousel.style.transform = `translateX(0%)`;
        currentIndex1 = 0;
      }, 300);
    } else {
      carousel.style.transition = 'transform 0.3s ease-in-out';
      carousel.style.transform = `translateX(-${index * 33.33}%)`;
      currentIndex1 = index;
    }
  }

  // Carousel navigation buttons
  galleryBtn.addEventListener('click', () => {
    showSlideCarousel(currentIndex1 - 1);
  });
  galleryBtn2.addEventListener('click', () => {
    showSlideCarousel(currentIndex1 + 1);
  });

  // Auto-slide carousel every 5 seconds
  setInterval(() => {
    showSlideCarousel(currentIndex1 + 1);
  }, 5000);

  // Review form logic
  const form = document.getElementById("reviewForm");
  const ratingStars = document.querySelectorAll(".rating span");
  const ratingInput = document.getElementById("reviewRating");

  // Handle star rating selection
  ratingStars.forEach(star => {
    star.addEventListener("click", () => {
      const rating = star.getAttribute("data-value");
      ratingInput.value = rating;
      ratingStars.forEach(s => s.classList.toggle("selected", s.getAttribute("data-value") <= rating));
    });
  });

  // Load and display saved reviews from localStorage
  const reviewsList = document.getElementById("reviewsList");
  const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  savedReviews.forEach(addReviewToPage);

  // Handle review form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const text = document.getElementById("reviewText").value.trim();
    const rating = parseInt(ratingInput.value);

    if (name && text && rating > 0) {
      const date = new Date();
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      const review = { name, text, rating, date: formattedDate, time: formattedTime };
      addReviewToPage(review);

      savedReviews.push(review);
      localStorage.setItem("reviews", JSON.stringify(savedReviews));

      form.reset();
      ratingInput.value = 0;
      ratingStars.forEach(s => s.classList.remove("selected"));
    }
  });

  // Add a review to the page
  function addReviewToPage({ name, text, rating, date, time }) {
    const div = document.createElement("div");
    div.classList.add("review");
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    div.innerHTML = `
      <strong>${name} — ${stars}</strong>
      <p>${text}</p>
      <p class="date">${date} ${time}</p>
    `;
    reviewsList.prepend(div);
  }

  // FAQ toggle logic (show/hide answers)
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach(q => {
    q.addEventListener("click", function() {
      const answer = q.nextElementSibling;
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });

  // FAQ toggle logic with 'show' class
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      answer.classList.toggle('show');
    });
  });

  // Scroll to FAQ section on FAQ button click
  //document.querySelector('.faq-button').addEventListener('click', (e) => {
  //   e.preventDefault();
  //   const faqHeader = document.getElementById('faq-header');
  //   window.scrollTo({
  //     top: faqHeader.offsetTop - 20,
  //     behavior: 'smooth'
  //   });
  // });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Special scroll for FAQ anchor link
  document.querySelector('a[href="#faq"]').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: document.querySelector('#faq-header').offsetTop - 10,
      behavior: 'smooth'
    });
  });

 document.addEventListener('DOMContentLoaded', () => {
  const btnPrev = document.getElementById('teamBtn');
  const btnNext = document.getElementById('teamBtn2');
  const track = document.querySelector('#team .team-track');
  const members = document.querySelectorAll('#team .team-member');

  console.log('btnPrev:', btnPrev);
  console.log('btnNext:', btnNext);
  console.log('track:', track);
  console.log('members count:', members.length);

  if (!btnPrev || !btnNext || !track || members.length === 0) {
    console.error('Не всі елементи знайдені');
    return;
  }

  let current = 0;
  const visible = 3;

  function updateCarousel() {
    track.style.transform = `translateX(-${(current * 100) / visible}%)`;
  }

  btnPrev.addEventListener('click', () => {
    current = (current - 1 + (members.length - visible + 1)) % (members.length - visible + 1);
    updateCarousel();
  });

  btnNext.addEventListener('click', () => {
    current = (current + 1) % (members.length - visible + 1);
    updateCarousel();
  });

  updateCarousel();
});
  // Service prices
  const prices = {
    haircut: 430,
    clipperCut: 380,
    scissorCut: 590,
    hairStyling: 330,
    headShave: 480,
    greyHairToning: 480,
    beardTrim: 380,
    beardShave: 430,
    fatherSon: 550,
    haircutBeardTrim: 790,
    clipperCutBeardTrim: 590,
    hairlineOutline: 280
  };

  // Service price update logic
  const serviceSelect = document.getElementById('service');
  const priceDisplay = document.getElementById('price-value');

  function updatePrice() {
    const selectedService = serviceSelect.value;
    const price = prices[selectedService];
    priceDisplay.textContent = price ? `${price} USD` : '-';
  }

  // Update price on service selection change
  serviceSelect.addEventListener('change', updatePrice);

  // Set initial price
  updatePrice();

});

// Scroll to top on page load (after a short delay)
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     window.scrollTo(0, 0);
//   }, 100);
// });
