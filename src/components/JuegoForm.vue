<template>
  <div class="modal-overlay" @click.self="$emit('cerrar')">
    <div class="modal">

      <div class="modal-header">
        <h2 class="modal-title">{{ modoEdicion ? 'Editar juego' : 'Nuevo juego' }}</h2>
        <button class="modal-close" @click="$emit('cerrar')">✕</button>
      </div>

      <div class="modal-body">
        <div class="field">
          <label class="field-label">Nombre</label>
          <input v-model="form.nombre" class="field-input" type="text" placeholder="Ej: The Witcher 3" />
        </div>

        <div class="field">
          <label class="field-label">Género</label>
          <input v-model="form.genero" class="field-input" type="text" placeholder="Ej: RPG" />
        </div>

        <div class="field">
          <label class="field-label">Nombre del archivo de imagen</label>
          <input v-model="form.imagen" class="field-input" type="text" placeholder="Ej: witcher3.png" />
          <span class="field-hint">El archivo debe existir en src/img/ del backend</span>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="$emit('cerrar')">Cancelar</button>
        <button class="btn btn-primary"   @click="guardar">
          {{ modoEdicion ? 'Guardar cambios' : 'Crear juego' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'JuegoForm',

  props: {
    juegoEditar: {
      type: Object,
      default: null,
    },
  },

  emits: ['guardar', 'cerrar'],

  data() {
    return {
      form: { nombre: '', genero: '', imagen: '' },
    };
  },

  computed: {
    modoEdicion() {
      return this.juegoEditar !== null;
    },
  },

  watch: {
    juegoEditar: {
      immediate: true,
      handler(nuevoJuego) {
        if (nuevoJuego) {
          this.form = { ...nuevoJuego };
        } else {
          this.form = { nombre: '', genero: '', imagen: '' };
        }
      },
    },
  },

  methods: {
    guardar() {
      if (!this.form.nombre.trim() || !this.form.genero.trim()) {
        alert('El nombre y el género son obligatorios');
        return;
      }
      this.$emit('guardar', { ...this.form });
    },
  },
};
</script>