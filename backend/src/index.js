require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Pool de conexiones: es más eficiente que abrir/cerrar una conexión
// por cada petición, porque reutiliza conexiones ya abiertas.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'app_db',
  waitForConnections: true,
});

// --- Health check ---
// Ruta usada por Docker (y por nosotros) para confirmar que la API
// está viva Y que además logra hablar con la base de datos.
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', db: error.message });
  }
});

// --- Obtener todas las tareas ---
app.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM task ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// --- Crear una tarea nueva ---
app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const [result] = await pool.query(
      'INSERT INTO task (title) VALUES (?)',
      [title]
    );
    res.status(201).json({ id: result.insertId, title });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ============================================================
// TAREA (asignada por el profe en el video, min 23:05):
// Implementar aquí:
//   1) PUT  /api/tasks/:id   -> actualizar título y/o "completed"
//   2) DELETE /api/tasks/:id -> eliminar una tarea
//
// Pista para PUT:
//   const { id } = req.params;
//   const { title, completed } = req.body;
//   await pool.query('UPDATE task SET title = ?, completed = ? WHERE id = ?',
//                     [title, completed, id]);
//
// Pista para DELETE:
//   const { id } = req.params;
//   await pool.query('DELETE FROM task WHERE id = ?', [id]);
//
// Recuerda: siempre usa "?" (parámetros preparados) y nunca concatenes
// el valor directo en el SQL, para evitar inyección SQL.
// ============================================================

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API en http://localhost:${port}`);
});
