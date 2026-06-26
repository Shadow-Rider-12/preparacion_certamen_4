<template>
  <div class="card">
    <div class="card-img-wrapper">
      <img
        :src="imgUrl"
        :alt="juego.nombre"
        class="card-img"
        @error="onImgError"
      />
    </div>

    <div class="card-body">
      <span class="card-genre">{{ juego.genero }}</span>
      <h3 class="card-title">{{ juego.nombre }}</h3>
      <p class="card-id">ID: {{ juego.id }}</p>
      <p class="card-descipcion">Descripcion: {{ juego.descripcion }}</p>
    </div>

    <div class="card-actions">
      <button class="btn btn-edit"   @click="$emit('editar', juego)">Editar</button>
      <button class="btn btn-delete" @click="$emit('eliminar', juego.id)">Eliminar</button>
    </div>
  </div>
</template>

<script>
const BASE_URL = 'http://localhost:3500';

export default {
  name: 'JuegoCard',

  props: {
    juego: {
      type: Object,
      required: true,
    },
  },

  emits: ['editar', 'eliminar'],

  computed: {
    imgUrl() {
      if (!this.juego.imagen) return '';
      return `${BASE_URL}/img/${this.juego.imagen}`;
    },
  },

  methods: {
    onImgError(e) {
      e.target.style.display = 'none';
    },
  },
};
</script>