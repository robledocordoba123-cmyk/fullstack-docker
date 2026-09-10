import { useState, useEffect } from 'react';

// En producción, Nginx redirige "/api" hacia el backend (ver nginx.conf),
// así que usamos una ruta relativa en vez de "http://localhost:3000".
// Esto evita problemas de CORS cuando todo corre dentro de Docker.
const API_URL = '/api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    load();
  };

  const toggleComplete = async (task) => {
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task.title, completed: !task.completed }),
    });
    load();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.subtitle}>Mis tareas</h2>

      <form onSubmit={addTask} style={styles.form}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea"
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Agregar
        </button>
      </form>

      <ul style={styles.list}>
        {tasks.map((t) => (
          <li key={t.id} style={styles.item}>
            <span
              onClick={() => toggleComplete(t)}
              style={{
                ...styles.taskText,
                textDecoration: t.completed ? 'line-through' : 'none',
                color: t.completed ? '#a3a3c2' : '#2d2d4d',
              }}
            >
              {t.completed ? '✅' : '⬜'} {t.title}
            </span>
            <button onClick={() => deleteTask(t.id)} style={styles.deleteButton}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '2rem auto',
    fontFamily: 'sans-serif',
    background: 'linear-gradient(135deg, #f5f3ff, #eef2ff)',
    borderRadius: 16,
    padding: '2rem',
    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.15)',
  },
  subtitle: {
    color: '#4c1d95',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    gap: 8,
    marginBottom: '1.5rem',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #c4b5fd',
    outline: 'none',
    fontSize: 14,
  },
  addButton: {
    padding: '10px 18px',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    borderRadius: 10,
    padding: '10px 14px',
    marginBottom: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  },
  taskText: {
    cursor: 'pointer',
    fontSize: 15,
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
  },
};