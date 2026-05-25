---
layout: default
title: README
nav_order: 2
permalink: /readme/
---

# l4 repo docs - Portal

Este repositorio aloja el portal central de documentación y conocimiento de la organización. El sitio web está compilado con **Jekyll** y utiliza el tema **Just the Docs**, desplegándose automáticamente a través de **GitHub Pages**.

Este repositorio implementa las prácticas de documentación: usa `README.md` como entrada del repositorio en GitHub, `index.md` como Inicio del portal publicado, `/docs` para documentación técnica, `/procesos` para flujos de trabajo y `/req` para documentación de negocio.
La intención es que sirva como referencia replicable para otros repositorios l4 repo docs.

## Índice del repositorio

Este índice refleja la jerarquía del menú principal del portal publicado:

*   **[Inicio](/):** Punto de entrada del portal publicado e índice principal.
*   **[¿Cómo Documentar?](/como-documentar.html):** Estándar para documentar repositorios l4 repo docs.
*   **[Documentación Técnica](/docs):** Entrada a la documentación técnica propia del portal.
    *   [Arquitectura](/docs/arquitectura.html): Modelo centralizado y distribuido, componentes, flujo de publicación y decisiones técnicas.
    *   [Despliegue](/docs/despliegue.html): Validación local, ambientes y despliegue en GitHub Pages.
    *   [Catálogo de Repositorios](/docs/repositorios): Inventario central de repositorios l4 repo docs y enlaces a sus GitHub Pages.
    *   [Inteligencia Artificial](/docs/inteligencia-artificial/): Implementación organizacional basada en estándares abiertos para `AGENTS.md` y Agent Skills.
*   **[Procesos](/procesos):** Procesos transversales de colaboración entre Producto y TI.
    *   [GitHub Flow](/procesos/github-flow.html): Flujo de trabajo para ramas, commits, Pull Requests y merges.
*   **[Requerimientos de Negocio](/req):** Guías para documentar requerimientos funcionales.
    *   [Plantilla de Caso de Uso](/req/CASO_USO_TEMPLATE.html): Estructura base para casos de uso.
    *   [Criterios de Aceptación](/req/criterios-aceptacion.html): Guía para definir validaciones de negocio.
    *   [Historia de Usuario](/req/historia-usuario.html): Estructura y estados de una historia de usuario.
*   **[Onboarding](/onboarding/):** Guía inicial para accesos, herramientas y entorno local.

---

## Desarrollo local

La validación local se ejecuta con el servicio `docs` definido en `docker-compose.yml`:

```bash
docker compose run --rm docs bundle install
docker compose run --rm docs bundle exec jekyll build
docker compose up docs
```

El detalle operativo se documenta como parte del ambiente **Local** en la guía de **[Despliegue](/docs/despliegue.html)**.

---

## Despliegue

Cualquier cambio fusionado en la rama `main` iniciará automáticamente el workflow de GitHub Actions (`.github/workflows/pages.yml`), compilando y desplegando el nuevo sitio estático en el entorno de GitHub Pages.

La guía operativa de este repositorio vive en **[docs/despliegue.md](/docs/despliegue.html)**. Si cambia el workflow, la configuración de Jekyll, los ambientes, los assets requeridos por el build o la forma de validar localmente, esa guía debe actualizarse en el mismo Pull Request.

---

## Colaboración

1. Realiza tus cambios en una nueva rama en este repositorio.
2. Envía un **Pull Request**.
3. Al aprobarse y fusionarse en la rama `main`, los cambios se compilarán y desplegarán automáticamente.
