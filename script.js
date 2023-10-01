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