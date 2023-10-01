const body = document.body;

// Inicializa el Swiper
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 15,
    strech: 0,
    depth: 300,
    modifier: 1,
    slideShadows: true
  },
  on: {
    // La función onSlideChange se ejecuta cuando se cambia de slide
    slideChange: function () {
      // Obtén el índice del slide actual
      const currentIndex = swiper.activeIndex;

      // Define un array de colores de fondo para cada slide (ajusta según tus necesidades)
      const slideColors = ["#001938", "#331d0f", "#0f2404", "#35111d", "#3d1403"];

      // Verifica si el índice está dentro del rango de colores disponibles
      if (currentIndex >= 0 && currentIndex < slideColors.length) {
        // Obtén el color de fondo correspondiente al índice actual
        const backgroundColor = slideColors[currentIndex];

        // Cambia el color de fondo del body
        body.style.backgroundColor = backgroundColor;
      }
    }
  }
});

const modals = document.querySelectorAll(".modal");
const closeModalBtns = document.querySelectorAll(".close-modal");
const images = document.querySelectorAll(".swiper-slide img");

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
