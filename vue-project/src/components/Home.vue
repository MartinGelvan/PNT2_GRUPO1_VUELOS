<template>
  <div class="home-container">
    <!-- Carrusel de imágenes -->
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="carouselImages[0]" class="d-block w-100" alt="Vuelo en familia">
          <div class="carousel-caption d-none d-md-block">
            <h5>Vuela con tu familia</h5>
            <p>Disfruta de momentos inolvidables juntos en el aire.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="carouselImages[1]" class="d-block w-100" alt="Destino de playa">
          <div class="carousel-caption d-none d-md-block">
            <h5>Escapada a la playa</h5>
            <p>Relájate en las mejores playas del mundo.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="carouselImages[2]" class="d-block w-100" alt="Vuela a nuevos destinos">
          <div class="carousel-caption d-none d-md-block">
            <h5>Explora nuevos destinos</h5>
            <p>Viaja a lugares increíbles que nunca imaginaste.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- Sección de Tarjetas -->
    <div class="container mt-5">
      <h2 class="text-center mb-4">Nuestras Propuestas de Viaje</h2>
      <div class="row">
        <!-- Tarjetas dinámicas -->
        <div class="col-md-4 mb-4" v-for="(card, index) in cards" :key="index">
          <div class="card h-100">
            <!-- Usamos la imagen importada -->
            <img :src="card.image" class="card-img-top" :alt="card.title">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.description }}</p>

              <!-- Botón para expandir -->
              <button @click="toggleDetails(index)" class="btn btn-primary">
                {{ card.showDetails ? 'Ver menos' : 'Saber más' }}
              </button>

              <!-- Información adicional -->
              <transition name="fade">
                <div v-if="card.showDetails" class="expanded-info mt-3">
                  <p>{{ card.fullDetails }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Importar las imágenes para el carrusel
import carouselImage1 from '@/assets/1.jpg';
import carouselImage2 from '@/assets/2.jpg';
import carouselImage3 from '@/assets/3.jpg';

// Importar las imágenes de las tarjetas
import cardImage1 from '@/assets/t1.jpg';
import cardImage2 from '@/assets/t2.jpg';
import cardImage3 from '@/assets/t3.jpg';

// Datos de las tarjetas
const cards = ref([
  {
    title: 'Tour por Argentina',
    description: 'Visita las principales ciudades de Europa y descubre su cultura e historia.',
    image: cardImage1, // Usamos la imagen importada
    fullDetails: 'Este tour te lleva por las ciudades más famosas de Europa, como París, Roma, Londres, y más. Disfruta de tours guiados, actividades locales, y mucho más.',
    showDetails: false,
  },
  {
    title: 'Viaje a Brasil',
    description: 'Sumérgete en la rica cultura asiática con visitas a Japón, China y más.',
    image: cardImage2, // Usamos la imagen importada
    fullDetails: 'Explora los templos antiguos de China, disfruta de la modernidad de Tokio, y relájate en las playas de Tailandia. Vive una experiencia única en Asia.',
    showDetails: false,
  },
  {
    title: 'Vuelos Internacionales',
    description: 'Encuentra vuelos internacionales baratos a cualquier destino del mundo.',
    image: cardImage3, // Usamos la imagen importada
    fullDetails: 'Encuentra las mejores ofertas de vuelos a destinos internacionales. Conectamos los mejores aeropuertos y aerolíneas para tu comodidad.',
    showDetails: false,
  }
]);

// Imágenes del carrusel
const carouselImages = [carouselImage1, carouselImage2, carouselImage3];

// Función para alternar la visibilidad de los detalles
const toggleDetails = (index) => {
  cards.value[index].showDetails = !cards.value[index].showDetails;
};
</script>

<style scoped>
/* Estilo general del contenedor */
.home-container {
  background-color: #f4f7fc;
  padding: 20px;
}

/* Estilo para la tarjeta */
.card {
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

/* Asegurando que las imágenes de las tarjetas tengan el mismo tamaño */
.card-img-top {
  height: 200px; /* Esto asegurará que todas las imágenes tengan la misma altura */
  object-fit: cover; /* La imagen se ajustará para cubrir el área sin distorsionarse */
}

/* Estilo para el botón */
.card .btn {
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.card .btn:hover {
  background-color: #0056b3;
}

/* Transición para los detalles adicionales */
.expanded-info {
  font-size: 1rem;
  color: #555;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Transición suave para la expansión */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
