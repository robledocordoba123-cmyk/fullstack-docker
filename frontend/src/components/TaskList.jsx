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

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Mis tareas</h2>
      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea"
          style={{ padding: 8, width: '70%' }}
        />
        <button type="submit" style={{ padding: 8 }}>
          Agregar
        </button>
      </form>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} {t.completed ? '✅' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
