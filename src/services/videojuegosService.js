// Centraliza todas las llamadas al backend.
// Si cambia el puerto o la URL, solo tocas este archivo.

const BASE_URL = 'http://localhost:3500/catalogo';

export const videojuegosService = {

  async getAll() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener los juegos');
    return res.json();
  },

  async getById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Juego no encontrado');
    return res.json();
  },

  async create(juego) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(juego),
    });
    if (!res.ok) throw new Error('Error al crear el juego');
    return res.json();
  },

  async update(id, juego) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(juego),
    });
    if (!res.ok) throw new Error('Error al actualizar el juego');
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar el juego');
    return res.json();
  },
};