---
layout: default
title: Despliegue
parent: Documentación Técnica
nav_order: 2
---

# 🚀 Despliegue del Portal

Este repositorio publica el portal central de documentación de l4 repo docs con **Jekyll**, **Just the Docs** y **GitHub Pages**.

El portal aplica, dentro de su propio alcance, el estándar que documenta para otros repositorios: mantiene `README.md`, `/docs`, procesos y validación local versionados junto al código fuente de la documentación.

---

## Ambientes

| Ambiente | Propósito | Implementación | URL / acceso |
| :--- | :--- | :--- | :--- |
| **Local** | Validar cambios antes del Pull Request. | Docker Compose + Ruby 3.3 + Jekyll. | [http://localhost:4000](http://localhost:4000) |
| **CI** | Compilar el sitio y detectar errores antes de publicar. | GitHub Actions con `.github/workflows/pages.yml`. | Pestaña **Actions** del repositorio. |
| **Producción** | Publicar el portal central para consulta del equipo. | GitHub Pages después de fusionar en `main`. | [https://lan4mena.github.io/l4-repo-docs/](https://lan4mena.github.io/l4-repo-docs/) |

Actualmente este portal no define un ambiente separado de staging. Si se agrega uno, el cambio debe incluir la configuración técnica y la actualización de esta guía.

---

## Requerimientos

Para validar cambios localmente se usa `docker-compose.yml`, porque deja versionado el contenedor local y evita depender de la versión de Ruby instalada en la máquina. Para desplegar en GitHub Pages se requiere que el repositorio tenga Pages habilitado y que el workflow cuente con los permisos definidos en `.github/workflows/pages.yml`.

| Requerimiento | Uso | Observaciones |
| :--- | :--- | :--- |
| Docker Desktop con Docker Compose | Ambiente local | Permite ejecutar Ruby 3.3 y Jekyll sin instalar Ruby en la máquina. |
| Git | Ambiente local | Necesario para trabajar por ramas y Pull Requests. |
| Node.js (con npx y tsx) | Local y CI | Requerido para ejecutar el script `scripts/generate-skills-docs.ts` que compila la documentación de las skills. |
| Acceso a internet | Ambiente local y CI | Requerido para descargar la imagen `ruby:3.3`, gems y acciones de GitHub. |
| `Gemfile` y `Gemfile.lock` | Local y CI | Mantienen dependencias reproducibles para Jekyll y el tema. |
| GitHub Pages habilitado | Producción | Debe publicar desde GitHub Actions. |
| Permisos del workflow | Producción | `contents: read`, `pages: write`, `id-token: write`. |

Este despliegue no requiere secretos personalizados ni variables de entorno sensibles. El token usado por GitHub Actions es el `GITHUB_TOKEN` administrado por GitHub y limitado por los permisos del workflow.

---

## Validación local

El ambiente **Local** permite compilar y previsualizar el portal antes de abrir o fusionar un Pull Request.

### Requisitos del ambiente local

*   Docker Desktop con Docker Compose.
*   Git.
*   Acceso a internet la primera vez que se descargan la imagen `ruby:3.3` y las gems.
*   Puerto `4000` disponible si se quiere levantar el servidor local.

El contenedor local está definido en `docker-compose.yml` con el servicio `docs`.

### Pasos

1. Instala dependencias dentro del contenedor:

   ```bash
   docker compose run --rm docs bundle install
   ```

2. Ejecuta el generador de documentación para las skills (requiere tener Node.js instalado):

   ```bash
   npx tsx scripts/generate-skills-docs.ts
   ```

3. Compila el sitio:

   ```bash
   docker compose run --rm docs bundle exec jekyll build
   ```

4. Levanta el servidor local:

   ```bash
   docker compose up docs
   ```

5. Abre el portal en:

   [http://localhost:4000](http://localhost:4000)

### Validaciones mínimas

Antes de abrir un Pull Request, valida:

*   El script `npx tsx scripts/generate-skills-docs.ts` se ejecuta correctamente y genera/actualiza la documentación de las skills en `docs/inteligencia-artificial/skills.md`.
*   El comando `docker compose run --rm docs bundle exec jekyll build` termina sin errores.
*   La página principal carga localmente.
*   La navegación muestra las páginas nuevas o modificadas.
*   Los enlaces agregados funcionan.
*   Los assets nuevos cargan correctamente.

---

## Despliegue en GitHub Pages

El despliegue productivo se ejecuta automáticamente con GitHub Actions.

### Pipeline CI/CD

| Campo | Valor |
| :--- | :--- |
| Workflow | `.github/workflows/pages.yml` |
| Disparadores | `push` a `main` y ejecución manual con `workflow_dispatch` |
| Concurrencia | Grupo `pages`, con `cancel-in-progress: true` |
| Runner | `ubuntu-latest` |
| Ambiente GitHub | `github-pages` |
| Source | `./` |
| Destination | `./_site` |
| Build | `actions/jekyll-build-pages@v1` |
| Publicación | `actions/upload-pages-artifact@v3` y `actions/deploy-pages@v4` |
| Ambiente destino | GitHub Pages |

### Pasos de despliegue

1. Un Pull Request aprobado se fusiona en `main`.
2. GitHub ejecuta `.github/workflows/pages.yml`.
3. `actions/checkout@v4` descarga el contenido del repositorio.
4. Se configura Node.js y se ejecuta `npx -y tsx scripts/generate-skills-docs.ts` para compilar la documentación de las skills.
5. `actions/jekyll-build-pages@v1` compila el sitio desde `./` hacia `./_site`.
6. `actions/upload-pages-artifact@v3` empaqueta el sitio generado.
7. `actions/deploy-pages@v4` publica el artefacto en GitHub Pages.
8. GitHub actualiza la URL productiva del portal.

Si el build falla, revisa la pestaña **Actions** del repositorio y corrige el error en una nueva rama antes de intentar desplegar de nuevo.

---

## Verificación posterior al despliegue

Después de un despliegue exitoso, valida:

*   El workflow de GitHub Actions terminó en estado exitoso.
*   La página principal carga correctamente en [https://lan4mena.github.io/l4-repo-docs/](https://lan4mena.github.io/l4-repo-docs/).
*   La navegación lateral muestra las secciones principales.
*   El buscador del portal responde.
*   Los assets de marca, como `assets/images/L4.png`, cargan correctamente.
*   Los enlaces modificados en el Pull Request funcionan en el sitio publicado.
*   Las páginas técnicas principales cargan correctamente:
    *   [Arquitectura](https://lan4mena.github.io/l4-repo-docs/docs/arquitectura)
    *   [Despliegue](https://lan4mena.github.io/l4-repo-docs/docs/despliegue)
    *   [Catálogo de Repositorios](https://lan4mena.github.io/l4-repo-docs/docs/repositorios)

---

## Rollback o recuperación

GitHub Pages publica el contenido generado desde la rama `main`. Si un despliegue introduce un error:

1. Identifica el Pull Request o commit que causó el problema.
2. Abre una rama de corrección o un Pull Request de revert.
3. Valida localmente con `docker compose run --rm docs bundle exec jekyll build`.
4. Fusiona la corrección a `main` para disparar un nuevo despliegue.
5. Verifica el sitio publicado después de que GitHub Actions termine.

Si el problema impide navegar el portal o afecta assets críticos, prioriza revertir el cambio antes de agregar nueva funcionalidad.

---

## Relación implementación-documentación

Todo cambio que modifique el despliegue debe actualizar esta guía en el mismo Pull Request. Esto incluye:

*   Cambios en `.github/workflows/pages.yml`.
*   Cambios en `_config.yml`.
*   Cambios en dependencias de Jekyll, `Gemfile` o `Gemfile.lock`.
*   Cambios en `docker-compose.yml`.
*   Cambios en ambientes, dominios, rutas base o configuración de GitHub Pages.
*   Cambios en assets requeridos por el build o por la navegación del portal.
*   Cambios en comandos de validación local.

---

## Archivos generados localmente

Estos directorios son artefactos locales y no deben subirse a Git:

*   `.bundle/`
*   `.jekyll-cache/`
*   `_site/`
*   `vendor/`

Están excluidos en `.gitignore`.
