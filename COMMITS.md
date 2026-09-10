# Guía de commits sugerida

Sigue este orden (es el mismo que usó el profe en el video), ejecutando
cada `git add` + `git commit` desde la carpeta correspondiente.

```bash
# 1. Raíz del proyecto
git init
git add README.md
git commit -m "chore: inicializar repositorio del proyecto"

# 2. Backend
cd backend
git add .
git commit -m "feat(backend): crear API REST con Express y MySQL"
cd ..

# 3. Base de datos
git add db
git commit -m "feat(db): agregar script de inicialización con tabla y datos"

# 4. Frontend
git add frontend
git commit -m "feat(frontend): creación de interfaz con Astro y componentes React para las tareas"

# 5. Docker (Dockerfiles)
git add backend/Dockerfile frontend/Dockerfile frontend/nginx.conf
git commit -m "feat(docker): creación de Dockerfiles multistage para frontend y backend"

# 6. Docker Compose
git add docker-compose.yml
git commit -m "feat(docker): creación de configuración Docker Compose para MySQL, backend y frontend"

# 7. Subir a GitHub
git branch -M main
git remote add origin <URL_DE_TU_REPO>
git push -u origin main
```

## Convención usada
`tipo(alcance): descripción corta en minúscula`

- `feat` → nueva funcionalidad
- `fix` → corrección de un error
- `chore` → tareas de mantenimiento (config, dependencias)
- `docs` → documentación

Esta convención se llama **Conventional Commits** y es una práctica estándar
en la industria (no solo del SENA): facilita generar changelogs automáticos
y que cualquiera entienda el historial sin leer el código.
