const express = require('express');
const router  = express.Router();

let videojuegos = [
  { id: 1, nombre: 'Albion',     genero: 'MMO RPG',            imagen: 'a.png', descripcion: 'Es un juego muy activo'},
  { id: 2, nombre: 'Arc Riders', genero: 'Extraction Shooter', imagen: 'b.png', descripcion: 'Es otro juego muuy activo'},
  { id: 3, nombre: 'Stray',      genero: 'Aventura',           imagen: 'c.png', descripcion: 'Es un juego para pasar el rato'},
];

// GET /catalogo
router.get('/', (req, res) => {
  res.json(videojuegos);
});

// GET /catalogo/:id
router.get('/:id', (req, res) => {
  const juego = videojuegos.find(j => j.id === parseInt(req.params.id));
  if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
  res.json(juego);
});

// POST /catalogo
router.post('/', (req, res) => {
  const { nombre, genero, imagen, descripcion} = req.body;
  const nuevoId = videojuegos.length > 0
    ? videojuegos[videojuegos.length - 1].id + 1
    : 1;
  const nuevoJuego = { id: nuevoId, nombre, genero, imagen: imagen || '', descripcion };
  videojuegos.push(nuevoJuego);
  res.status(201).json(nuevoJuego);
});

// PUT /catalogo/:id
router.put('/:id', (req, res) => {
  const juego = videojuegos.find(j => j.id === parseInt(req.params.id));
  if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
  const { nombre, genero, imagen, descripcion} = req.body;
  if (nombre !== undefined) juego.nombre = nombre;
  if (genero !== undefined) juego.genero = genero;
  if (imagen !== undefined) juego.imagen = imagen;
  if (descripcion !== undefined) juego.descripcion = descripcion;
  res.json(juego);
});

// DELETE /catalogo/:id
router.delete('/:id', (req, res) => {
  const index = videojuegos.findIndex(j => j.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Juego no encontrado' });
  const eliminado = videojuegos.splice(index, 1)[0];
  res.json({ mensaje: 'Juego eliminado', juego: eliminado });
});

module.exports = router;