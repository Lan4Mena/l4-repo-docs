---
layout: default
title: README
nav_order: 2
permalink: /readme/
---

# Portfolio Docs

Este repositorio contiene mi portal personal de documentación y referencia técnica. El sitio se construye con **Jekyll**, utiliza el tema **Just the Docs** y se publica automáticamente con **GitHub Pages**.

La documentación sigue un modelo Docs-as-Code: se versiona en Git, se revisa mediante Pull Requests y mantiene separadas la entrada del repositorio y las páginas publicadas dentro de `docs-repo/`.

## Navegación

*   **[Inicio](/l4-repo-docs/):** Punto de entrada del portal.
*   **[¿Cómo Documentar?](/l4-repo-docs/como-documentar.html):** Convenciones para documentar repositorios personales.
*   **[Documentación Técnica](/l4-repo-docs/docs/):** Arquitectura, despliegue y catálogo de proyectos.
    *   [Arquitectura](/l4-repo-docs/docs/arquitectura.html)
    *   [Despliegue](/l4-repo-docs/docs/despliegue.html)
    *   [Catálogo de Repositorios](/l4-repo-docs/docs/repositorios/)
    *   [Inteligencia Artificial](/l4-repo-docs/docs/inteligencia-artificial/)
    *   [Plantillas de Pull Request](/l4-repo-docs/docs/pr-templates/)
*   **[Procesos](/l4-repo-docs/procesos/):** Flujos de trabajo reutilizables.
*   **[Requerimientos](/l4-repo-docs/req/):** Guías para historias, casos de uso y criterios de aceptación.
*   **[Onboarding](/l4-repo-docs/onboarding/):** Configuración inicial para reutilizar este portal.

## Desarrollo local

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
docker compose -f docs-repo/docker-compose.yml up docs
```

El sitio local queda disponible en `http://localhost:4003/l4-repo-docs/`.

## Despliegue

Los cambios fusionados en `main` ejecutan `.github/workflows/docs.yml` y publican el sitio en GitHub Pages. La operación detallada vive en [Despliegue](/l4-repo-docs/docs/despliegue.html).
