console.log('script.js завантажений і виконується');

document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // Ініціалізація AOS
  // ============================
  AOS.init();

  // ============================
  // Модальне вікно "Book Now"
  // ============================
  const bookNowBtnNavbar = document.querySelectorAll("#bookNowBtnNavbar");
  const modal = document.getElementById("bookingModal");
  const closeModalBtn = document.getElementById("closeModal");

  bookNowBtnNavbar.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });

  window.addEventListener("load", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  });

  // ============================
  // Плавний скрол для навігації
  // ============================
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (href === "#") return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ============================
  // Карусель для галереї
  // ============================
  const carousel = document.getElementById('carousel');
  const items = document.querySelectorAll('.carousel-item');
  const galleryBtnPrev = document.getElementById('galleryBtn');
  const galleryBtnNext = document.getElementById('galleryBtn2');

  let currentIndexGallery = 0;

  function showSlideGallery(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    // Скидання прокрутки при досягненні останнього слайда (опційно)
    if (index === 7) {
      setTimeout(() => {
        carousel.style.transition = 'transform 0.3s ease-in-out';
        carousel.style.transform = `translateX(0%)`;
        currentIndexGallery = 0;
      }, 300);
    } else {
      carousel.style.transition = 'transform 0.3s ease-in-out';
      carousel.style.transform = `translateX(-${index * 33.33}%)`;
      currentIndexGallery = index;
    }
  }

  galleryBtnPrev.addEventListener('click', () => {
    showSlideGallery(currentIndexGallery - 1);
  });

  galleryBtnNext.addEventListener('click', () => {
    showSlideGallery(currentIndexGallery + 1);
  });

  setInterval(() => {
    showSlideGallery(currentIndexGallery + 1);
  }, 5000);

  // ============================
  // Карусель для команди
  // ============================
  const btnPrevTeam = document.getElementById('teamBtn');
  const btnNextTeam = document.getElementById('teamBtn2');
  const teamTrack = document.querySelector('#team .team-track');
  const teamMembers = document.querySelectorAll('#team .team-member');

  if (btnPrevTeam && btnNextTeam && teamTrack && teamMembers.length > 0) {
    let currentTeamIndex = 0;
    const visibleTeamCount = 3;

    function updateTeamCarousel() {
      teamTrack.style.transform = `translateX(-${(currentTeamIndex * 100) / visibleTeamCount}%)`;
    }

    btnPrevTeam.addEventListener('click', () => {
      currentTeamIndex = (currentTeamIndex - 1 + (teamMembers.length - visibleTeamCount + 1)) % (teamMembers.length - visibleTeamCount + 1);
      updateTeamCarousel();
    });

    btnNextTeam.addEventListener('click', () => {
      currentTeamIndex = (currentTeamIndex + 1) % (teamMembers.length - visibleTeamCount + 1);
      updateTeamCarousel();
    });

    updateTeamCarousel();

    setInterval(() => {
      currentTeamIndex = (currentTeamIndex + 1) % (teamMembers.length - visibleTeamCount + 1);
      updateTeamCarousel();
    }, 3000);
  } else {
    console.warn('Елементи каруселі команди не знайдені!');
  }

  // ============================
  // Логіка форми відгуків
  // ============================
  const form = document.getElementById("reviewForm");
  const ratingStars = document.querySelectorAll(".rating span");
  const ratingInput = document.getElementById("reviewRating");

  ratingStars.forEach(star => {
    star.addEventListener("click", () => {
      const rating = star.getAttribute("data-value");
      ratingInput.value = rating;
      ratingStars.forEach(s => s.classList.toggle("selected", s.getAttribute("data-value") <= rating));
    });
  });

  const reviewsList = document.getElementById("reviewsList");
  const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  savedReviews.forEach(addReviewToPage);

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

  // ============================
  // FAQ toggle logic
  // ============================
  document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      answer.classList.toggle("show");
    });
  });

  // ============================
  // Smooth scroll для FAQ кнопки і всіх якорів
  // ============================
  // Якщо є кнопка з класом faq-button, то можна раскоментувати і використовувати:
  /*
  const faqButton = document.querySelector('.faq-button');
  if (faqButton) {
    faqButton.addEventListener('click', (e) => {
      e.preventDefault();
      const faqHeader = document.getElementById('faq-header');
      window.scrollTo({
        top: faqHeader.offsetTop - 20,
        behavior: 'smooth'
      });
    });
  }
  */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  document.querySelectorAll('a[href="#faq"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const faqHeader = document.getElementById('faq-header');
      if (faqHeader) {
        window.scrollTo({
          top: faqHeader.offsetTop - 10,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================
  // Логіка оновлення цін на послуги
  // ============================
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

  const serviceSelect = document.getElementById('service');
  const priceDisplay = document.getElementById('price-value');

  function updatePrice() {
    const selectedService = serviceSelect.value;
    const price = prices[selectedService];
    priceDisplay.textContent = price ? `${price} USD` : '-';
  }

  serviceSelect.addEventListener('change', updatePrice);

  updatePrice();
});
