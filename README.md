# Full Stack Docker

Proyecto full-stack con Docker: backend en Express/MySQL, frontend en Astro/React
y orquestación con Docker Compose. Próximo paso: CI/CD con GitHub Actions.

## Estructura
```
fullstack-docker/
├── backend/       # API REST (Express + MySQL2)
├── frontend/      # Interfaz (Astro + React)
├── db/            # Script de inicialización de la base de datos
└── docker-compose.yml
```

## Cómo levantar el proyecto

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- API: http://localhost:3000/api/tasks
- Health check: http://localhost:3000/api/health

## Variables de entorno

Ver `backend/.env.example`. En Docker Compose ya vienen definidas
directamente en el servicio `backend`.
