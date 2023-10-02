const body = document.body;
const swiperContainer = document.querySelector('.swiper-container');
const pegman = document.getElementById('pegman');

const modals = document.querySelectorAll(".modal");
const closeModalBtns = document.querySelectorAll(".close-modal");
const images = document.querySelectorAll(".swiper-slide img");


// Define Swiper configuration
const swiperConfig = {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 15,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
  on: {
    slideChange: function () {
      const currentIndex = swiper.activeIndex;
      const slideColors = ["#001938", "#331d0f", "#0f2404", "#35111d", "#3d1403"];

      if (currentIndex >= 0 && currentIndex < slideColors.length) {
        const backgroundColor = slideColors[currentIndex];
        body.style.backgroundColor = backgroundColor;
      }
    },
  },
};

// Initialize Swiper
var swiper = new Swiper('.mySwiper', swiperConfig);

// Pegman Movement Variables
let isDragging = false;
let initialX = 0;
let initialY = 0;
let offsetX = 0;
let offsetY = 0;

// Pegman Event Listeners
pegman.addEventListener('mousedown', (e) => {
  isDragging = true;
  initialX = e.clientX - offsetX;
  initialY = e.clientY - offsetY;
  pegman.style.opacity = '0.5';
  pegman.style.cursor = 'grabbing';
  pegman.style.transition = 'none';
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  offsetX = e.clientX - initialX;
  offsetY = e.clientY - initialY;
  pegman.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

  // Check if Pegman is over a different slide and change the centered slide accordingly
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach((slide, index) => {
    const slideBounds = slide.getBoundingClientRect();
    if (
      pegman.getBoundingClientRect().left >= slideBounds.left &&
      pegman.getBoundingClientRect().right <= slideBounds.right
    ) {
      swiper.slideTo(index);
    }
  });
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  pegman.style.opacity = '1';
  pegman.style.cursor = 'grab';
  pegman.style.transition = 'all 0.3s';
});

pegman.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Function to update Swiper config based on viewport width
function updateSwiperConfig() {
  if (window.innerWidth < 576) {
    // Adjust swiperConfig for smaller screens
    swiperConfig.effect = 'slide'; // Change the effect for small screens, e.g., to 'slide'
    swiperConfig.slidesPerView = 1; // Adjust the number of slides per view
    // Add more adjustments as needed
  } else {
    // Restore the original swiperConfig for larger screens
    swiperConfig.effect = 'coverflow';
    swiperConfig.slidesPerView = 'auto';
    // Add more adjustments as needed
  }

  // Destroy the existing Swiper instance
  swiper.destroy();

  // Initialize a new Swiper instance with the updated config
  swiper = new Swiper('.mySwiper', swiperConfig);
}

// Initial call to set up Swiper based on viewport width
updateSwiperConfig();

// Listen for window resize events to update Swiper config
window.addEventListener('resize', updateSwiperConfig);







// Función para mostrar una ventana emergente por año
function showModal(year) {
  const modalId = `modal${year}`;
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
  }
}

// Evento para abrir la ventana emergente cuando se hace clic en la imagen
images.forEach((image, index) => {
  image.addEventListener("click", () => {
    const years = [1970, 1980, 1990, 2000, 2010];
    showModal(years[index]);
  });
});

// Evento para cerrar la ventana emergente al hacer clic en el botón de cierre
closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  });
});

// Evento para cerrar la ventana emergente al hacer clic fuera de ella
window.addEventListener("click", (event) => {
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
