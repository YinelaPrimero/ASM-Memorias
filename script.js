document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const swiperContainer = document.querySelector('.swiper-container');
  const pegman = document.getElementById('pegman');
  const pegmanContainer = document.getElementById('pegman-container');

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
        const slideColors = ["#131547", "#835232", "#0f2404", "#8D2527", "#983B27"];

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
  pegmanContainer.addEventListener('mousedown', (e) => {
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
    pegmanContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // Check if Pegman is over a different slide and change the centered slide accordingly
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach((slide, index) => {
      const slideBounds = slide.getBoundingClientRect();
      if (
        pegmanContainer.getBoundingClientRect().left >= slideBounds.left &&
        pegmanContainer.getBoundingClientRect().right <= slideBounds.right
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

    // Restablecer la posición de Pegman de acuerdo a la página
    pegman.style.top = '61%';
    pegman.style.left = '39%';

    // Restablecer la transformación del contenedor
    pegmanContainer.style.transform = 'translate(0, 0)';
  });

  pegmanContainer.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // Agrega un manejador de eventos para las teclas de flecha
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      // Mueve el personaje hacia la izquierda
      pegmanContainer.style.transform = `translateX(${parseInt(pegmanContainer.style.transform.split("(")[1]) - 10}px)`;
    } else if (e.key === 'ArrowRight') {
      // Mueve el personaje hacia la derecha
      pegmanContainer.style.transform = `translateX(${parseInt(pegmanContainer.style.transform.split("(")[1]) + 10}px)`;
    }
  });
  // Función para mover el personaje con las flechas del teclado
  function moveCharacter(direction) {
    const character = document.getElementById('pegman');
    const currentPosition = getComputedStyle(character).transform;
    const currentX = parseInt(currentPosition.split(',')[4]) || 0;
    const currentY = parseInt(currentPosition.split(',')[5]) || 0;
    const step = 10; // Ajusta la cantidad de movimiento según lo necesites

    switch (direction) {
      case 'left':
        character.style.transform = `translate(${currentX - step}px, ${currentY}px)`;
        break;
      case 'right':
        character.style.transform = `translate(${currentX + step}px, ${currentY}px)`;
        break;
      // Agrega más casos para otras direcciones si es necesario
    }
  }

  // Agrega un manejador de eventos para las teclas de flecha
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      moveCharacter('left');
    } else if (e.key === 'ArrowRight') {
      moveCharacter('right');
    }
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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      swiper.slidePrev(); // Cambiar a la diapositiva anterior
    } else if (e.key === 'ArrowRight') {
      swiper.slideNext(); // Cambiar a la siguiente diapositiva
    }
    // Verifica si la tecla "m" se presionó y el Swiper está centrado en una diapositiva
    if (e.key === 'm') {
      // Espera a que el Swiper se actualice después del cambio de diapositiva
      setTimeout(function () {
        const centeredSlideIndex = swiper.realIndex;
        const decadeUrls = ['1970.html', '1980.html', '1990.html', '2000.html', '2010.html'];

        if (centeredSlideIndex >= 0 && centeredSlideIndex < decadeUrls.length) {
          window.location.href = decadeUrls[centeredSlideIndex];
        }
      }, 100); // Ajusta este valor si es necesario para dar tiempo al Swiper a actualizarse
    }


  });


});

function cambiarImagen(opcion) {
  const pegman = document.getElementById('pegman');

  if (opcion === 'estudiante') {
    pegman.src = '/Imagenes/normi.pg'; // Ruta de la imagen de estudiante
  } else if (opcion === 'colaborador') {
    pegman.src = '/Imagenes/owl.png'; // Ruta de la imagen de colaborador
  }
}
