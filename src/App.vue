<template>
  <div class="app">

    <header class="header">
      <div class="header-inner">
        <div class="header-brand">
          <div>
            <h1 class="header-title">Catálogo de Videojuegos</h1>
            <p class="header-sub">Para la preparación del certamen N° 4</p>
          </div>
        </div>
        <button class="btn btn-primary" @click="abrirModalCrear">+ Agregar juego</button>
      </div>
    </header>

    <main class="main">

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="cargando" class="loading">
        <div class="spinner"></div>
        <p>Cargando juegos...</p>
      </div>

      <div v-else-if="juegos.length === 0 && !error" class="empty">
        <p>No hay juegos en el catálogo.</p>
        <button class="btn btn-primary" @click="abrirModalCrear">Agregar el primero</button>
      </div>

      <div v-else class="grid">
        <JuegoCard
          v-for="juego in juegos"
          :key="juego.id"
          :juego="juego"
          @editar="abrirModalEditar"
          @eliminar="eliminarJuego"
        />
      </div>

      <p v-if="juegos.length > 0" class="count">
        {{ juegos.length }} juego{{ juegos.length !== 1 ? 's' : '' }} en el catálogo
      </p>

    </main>

    <JuegoForm
      v-if="mostrarModal"
      :juegoEditar="juegoSeleccionado"
      @guardar="guardarJuego"
      @cerrar="cerrarModal"
    />

  </div>
</template>

<script>
import JuegoCard from './components/JuegoCard.vue'
import JuegoForm from './components/JuegoForm.vue'
import { videojuegosService } from './services/videojuegosService.js'

export default {
  name: 'App',
  components: { JuegoCard, JuegoForm },

  data() {
    return {
      juegos: [],
      cargando: false,
      error: null,
      mostrarModal: false,
      juegoSeleccionado: null,
    }
  },

  mounted() {
    this.cargarJuegos()
  },

  methods: {
    async cargarJuegos() {
      this.cargando = true
      this.error = null
      try {
        this.juegos = await videojuegosService.getAll()
      } catch (e) {
        this.error = 'No se pudo conectar con el backend. ¿Está corriendo en puerto 3500?'
      } finally {
        this.cargando = false
      }
    },

    abrirModalCrear() {
      this.juegoSeleccionado = null
      this.mostrarModal = true
    },

    abrirModalEditar(juego) {
      this.juegoSeleccionado = juego
      this.mostrarModal = true
    },

    async guardarJuego(datosFormulario) {
      try {
        if (this.juegoSeleccionado) {
          const actualizado = await videojuegosService.update(this.juegoSeleccionado.id, datosFormulario)
          const idx = this.juegos.findIndex(j => j.id === actualizado.id)
          if (idx !== -1) this.juegos[idx] = actualizado
        } else {
          const nuevo = await videojuegosService.create(datosFormulario)
          this.juegos.push(nuevo)
        }
        this.cerrarModal()
      } catch (e) {
        this.error = e.message
      }
    },

    async eliminarJuego(id) {
      if (!confirm('¿Seguro que quieres eliminar este juego?')) return
      try {
        await videojuegosService.remove(id)
        this.juegos = this.juegos.filter(j => j.id !== id)
      } catch (e) {
        this.error = e.message
      }
    },

    cerrarModal() {
      this.mostrarModal = false
      this.juegoSeleccionado = null
    },
  },
}
</script>