---
layout: default
title: AGENTS.md
parent: Inteligencia Artificial
nav_order: 5
permalink: /docs/inteligencia-artificial/agents/
---

# AGENTS.md

Instrucciones para agentes de código que trabajen en este repositorio.

## Resumen

Este repositorio contiene un portal personal de documentación Docs-as-Code construido con Jekyll y Just the Docs, publicado con GitHub Pages.

La documentación publicada y su soporte técnico viven dentro de `docs-repo/`:

- `README.md`: entrada del repositorio en GitHub.
- `docs-repo/index.md`: página inicial publicada.
- `docs-repo/como-documentar.md`: estándar personal para documentar repositorios.
- `docs-repo/docs/`: documentación técnica.
- `docs-repo/procesos/`: procesos reutilizables.
- `docs-repo/req/`: requerimientos, historias y casos de uso.
- `docs-repo/onboarding/`: guía inicial.
- `docs-repo/_config.yml`, `docs-repo/Gemfile`, `docs-repo/docker-compose.yml`, `docs-repo/_sass/`, `docs-repo/assets/` y `docs-repo/scripts/`: soporte Jekyll.
- `.agents/skills/portafolio-documentation/SKILL.md`: skill local de documentación.

## Comandos

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
docker compose -f docs-repo/docker-compose.yml up docs
```

El sitio local queda disponible en `http://localhost:4003/l4-repo-docs/`. Si el puerto está ocupado, usa:

```bash
DOCS_PORT=4004 docker compose -f docs-repo/docker-compose.yml up docs
```

## Convenciones

- Mantén Markdown simple y compatible con Jekyll.
- Usa frontmatter YAML válido en páginas publicadas.
- Usa rutas relativas para enlaces internos cuando sea posible.
- No dupliques contenido; enlaza a la fuente principal.
- Actualiza `docs-repo/docs/despliegue.md` si cambias workflow, Docker, dependencias, rutas, assets o configuración Jekyll.
- Actualiza el índice correspondiente al agregar, renombrar o mover páginas publicadas.
- No edites manualmente `docs-repo/docs/inteligencia-artificial/skills.md`; se genera desde `.agents/skills/**/SKILL.md`.
- No edites manualmente `docs-repo/docs/pr-templates/`; se genera desde `.github/PULL_REQUEST_TEMPLATE/**`.

## Agent Skills

- Cada skill vive en `.agents/skills/<skill-name>/SKILL.md`.
- El `name` debe coincidir con la carpeta y usar minúsculas, números y guiones.
- Cada `SKILL.md` debe declarar `name` y `description`.
- Mantén los skills enfocados. Usa `references/`, `scripts/` y `assets/` cuando el contenido crezca.

## Seguridad

- No agregues secretos, tokens, contraseñas, `.env` reales ni credenciales.
- Usa `.env.example` cuando necesites documentar variables.
- No publiques datos personales sensibles.

## Verificación

Para cambios de estructura, configuración o navegación:

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
```

Revisa que:

- Las páginas aparezcan en la navegación esperada.
- Los enlaces internos, anchors y enlaces externos agregados resuelvan sin escapar de `/l4-repo-docs/`.
- Mermaid renderice sin errores.
- No se versionen `_site/`, `vendor/`, `.bundle/`, `.jekyll-cache/`, `.sass-cache/` ni páginas generadas.

## Pull Requests

- Mantén los cambios acotados al tema del Pull Request.
- Incluye documentación cuando cambies estructura, publicación o procesos.
- Indica qué validación ejecutaste.
