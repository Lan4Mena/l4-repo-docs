---
layout: default
title: Catálogo de Repositorios
parent: Documentación Técnica
nav_order: 3
permalink: /docs/repositorios
---

# Catálogo de Repositorios

Este archivo registra los repositorios relacionados con el repositorio actual y sus accesos directos a la **documentación publicada**.

En un repositorio de producto, API, frontend, servicio o librería, este catálogo debe registrar los repositorios de los que depende o con los que se integra.

En este portal central, el alcance es distinto: `l4-repo-docs` registra todos los repositorios l4 repo docs porque funciona como punto central de consulta de la organización.

La documentación técnica detallada vive dentro de cada repositorio individual para asegurar que evolucione junto con el código. Este catálogo debe enlazar a la documentación publicada de cada repositorio relacionado, no a archivos Markdown crudos.

---

## Inventario de repositorios

| Sistema / Proyecto | Repositorio | Tipo | Descripción | Documentación publicada | Responsable | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **l4 repo docs Knowledge** | [l4-repo-docs](https://github.com/Lan4Mena/l4-repo-docs) | Portal de documentación | Portal central de documentación, procesos y estándares l4 repo docs. | [Ver documentación](https://lan4mena.github.io/l4-repo-docs/) | l4 repo docs | Activo |

---

## Campos obligatorios

Cada fila del catálogo debe completar:

*   **Sistema / Proyecto:** nombre funcional o técnico del sistema.
*   **Repositorio:** enlace al repositorio GitHub.
*   **Tipo:** API, backend, frontend, mobile, infraestructura, documentación, librería, worker, integración u otro tipo claro.
*   **Descripción:** resumen breve de la responsabilidad del sistema.
*   **Documentación publicada:** enlace a la GitHub Page del repositorio. No debe apuntar a Markdown crudo.
*   **Responsable:** equipo, área o persona responsable del mantenimiento.
*   **Estado:** `Activo`, `En desarrollo`, `Archivado`, `Deprecado` o `Pendiente de documentación`.

---

## Reglas de mantenimiento

*   En repositorios de producto, API, frontend, servicio o librería, registra aquí los repositorios de los que depende o con los que se integra.
*   En el portal central `l4-repo-docs`, registra aquí todos los repositorios l4 repo docs.
*   El registro debe agregarse en el mismo Pull Request que habilita o actualiza la documentación publicada del repositorio relacionado.
*   La documentación publicada debe cumplir el estándar definido en **[¿Cómo Documentar?](../como-documentar.md)**.
*   Si un repositorio cambia de nombre, responsable, estado o URL publicada, este catálogo debe actualizarse en el mismo Pull Request o en un Pull Request de mantenimiento.
*   Este catálogo no reemplaza la arquitectura propia del sistema. Si la relación con otro repositorio requiere detalle técnico, documenta esa dependencia en `docs/arquitectura.md` del repositorio correspondiente.

---

## Cómo agregar un repositorio relacionado

Si necesitas registrar un repositorio relacionado:

1. Asegúrate de que el repositorio tenga `README.md`, `index.md`, `/docs` y la documentación mínima aplicable.
2. Publica la documentación del repositorio con GitHub Pages.
3. Agrega una fila al inventario de este archivo.
4. Verifica que el enlace de documentación publicada cargue correctamente.
5. En repositorios que no sean el portal central, registra solo repositorios relacionados con ese sistema.
6. En el portal central, registra cualquier repositorio l4 repo docs que deba aparecer en el inventario organizacional.
7. Envía el Pull Request de actualización del catálogo.
