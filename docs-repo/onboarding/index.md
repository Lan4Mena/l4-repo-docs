---
layout: default
title: Onboarding
nav_order: 7
has_children: false
permalink: /onboarding/
---

# Onboarding

Esta guía resume la configuración mínima para reutilizar el portal en otro repositorio personal.

## Requisitos

- Git.
- Docker Desktop con Docker Compose.
- Node.js compatible con `--experimental-strip-types`.
- Una cuenta de GitHub con Pages habilitado para el repositorio.

## Configuración local

1. Clona el repositorio.
2. Genera la documentación derivada:

   ```bash
   node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
   ```

3. Instala las dependencias Jekyll dentro del contenedor:

   ```bash
   docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
   ```

4. Compila y levanta el portal:

   ```bash
   docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
   docker compose -f docs-repo/docker-compose.yml up docs
   ```

5. Abre [http://localhost:4003/l4-repo-docs/](http://localhost:4003/l4-repo-docs/).

## Siguiente paso

Consulta el [Catálogo de Repositorios](../docs/repositorios/) y la guía [¿Cómo Documentar?](../como-documentar.html) para adaptar el contenido.
