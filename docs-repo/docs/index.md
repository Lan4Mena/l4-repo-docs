---
layout: default
title: Documentación Técnica
nav_order: 4
has_children: true
permalink: /docs/
---

# Documentación Técnica

Esta sección documenta la arquitectura, publicación y mantenimiento del portal.

## Contenido

*   **[Arquitectura](arquitectura.html):** componentes, decisiones y flujo de publicación.
*   **[Despliegue](despliegue.html):** validación local, CI/CD, publicación y rollback.
*   **[Catálogo de Repositorios](repositorios/):** proyectos personales documentados.
*   **[Inteligencia Artificial](inteligencia-artificial/):** `AGENTS.md` y Agent Skills.
*   **[Casos de Prueba](casos-prueba.html):** guía para traducir criterios de aceptación en verificaciones.
*   **[Plantillas de Pull Request](pr-templates/):** vista navegable de las plantillas operativas.

## Separación de responsabilidades

| Ruta | Responsabilidad |
| :--- | :--- |
| `README.md` | Entrada del repositorio en GitHub. |
| `AGENTS.md` | Instrucciones para agentes. |
| `docs-repo/index.md` | Inicio publicado del portal. |
| `docs-repo/docs/` | Documentación técnica. |
| `docs-repo/req/` | Guías y plantillas de requerimientos. |
| `docs-repo/procesos/` | Procesos reutilizables. |
