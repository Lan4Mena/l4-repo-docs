---
layout: default
title: Despliegue
parent: Documentación Técnica
nav_order: 2
permalink: /docs/despliegue.html
---

# 🚀 Despliegue del Portal

Este repositorio publica mi portal personal de documentación con **Jekyll**, **Just the Docs** y **GitHub Pages**.

La documentación publicada, los procesos y la validación local viven dentro de `docs-repo/`.

---

## Ambientes

| Ambiente | Propósito | Implementación | URL / acceso |
| :--- | :--- | :--- | :--- |
| **Local** | Validar cambios antes del Pull Request. | Docker Compose + Ruby 3.3 + Jekyll. | [http://localhost:4003/l4-repo-docs/](http://localhost:4003/l4-repo-docs/) |
| **CI** | Compilar el sitio y detectar errores antes de publicar. | GitHub Actions con `.github/workflows/docs.yml`. | Pestaña **Actions** del repositorio. |
| **Producción** | Publicar el portal personal. | GitHub Pages después de fusionar en `main`. | [https://lan4mena.github.io/l4-repo-docs/](https://lan4mena.github.io/l4-repo-docs/) |

Actualmente este portal no define un ambiente separado de staging. Si se agrega uno, el cambio debe incluir la configuración técnica y la actualización de esta guía.

---

## Requerimientos

Para validar cambios localmente se usa `docs-repo/docker-compose.yml`, porque deja versionado el contenedor local y evita depender de la versión de Ruby instalada en la máquina. Para desplegar en GitHub Pages se requiere que el repositorio tenga Pages habilitado y que el workflow cuente con los permisos definidos en `.github/workflows/docs.yml`.

| Requerimiento | Uso | Observaciones |
| :--- | :--- | :--- |
| Docker Desktop con Docker Compose | Ambiente local | Permite ejecutar Ruby 3.3 y Jekyll sin instalar Ruby en la máquina. |
| Git | Ambiente local | Necesario para trabajar por ramas y Pull Requests. |
| Node.js 22 o compatible con TypeScript stripping | Local y CI | Requerido para ejecutar el script `docs-repo/scripts/generate-skills-docs.ts` que compila la documentación de las skills. |
| Acceso a internet | Ambiente local y CI | Requerido para descargar la imagen `ruby:3.3`, gems y acciones de GitHub. |
| `docs-repo/Gemfile` y `docs-repo/Gemfile.lock` | Local y CI | Mantienen dependencias reproducibles para Jekyll y el tema. |
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
*   Puerto `4003` disponible si se quiere levantar el servidor local con el valor por defecto.

El contenedor local está definido en `docs-repo/docker-compose.yml` con el servicio `docs`. La vista previa conserva el mismo `baseurl` productivo para validar las rutas reales de GitHub Pages.

### Pasos

1. Instala dependencias dentro del contenedor:

   ```bash
   docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
   ```

2. Ejecuta los generadores de documentación derivada (requieren Node.js compatible con `--experimental-strip-types`):

   ```bash
   node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
   node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
   ```

3. Compila el sitio:

   ```bash
   docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
   ```

4. Levanta el servidor local:

   ```bash
   docker compose -f docs-repo/docker-compose.yml up docs
   ```

5. Abre el portal en:

   [http://localhost:4003/l4-repo-docs/](http://localhost:4003/l4-repo-docs/)

   Si el puerto está ocupado, levanta el servicio con otro puerto local:

   ```bash
   DOCS_PORT=4004 docker compose -f docs-repo/docker-compose.yml up docs
   ```

### Validaciones mínimas

Antes de abrir un Pull Request, valida:

*   El script `node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts` se ejecuta correctamente y genera temporalmente la documentación de las skills en `docs-repo/docs/inteligencia-artificial/skills.md`.
*   El script `node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts` se ejecuta correctamente y genera temporalmente la documentación de PR templates en `docs-repo/docs/pr-templates/`.
*   El comando `docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml` termina sin errores.
*   La página principal carga localmente.
*   La navegación muestra las páginas nuevas o modificadas.
*   Los enlaces internos, anchors y enlaces externos agregados funcionan sin escapar de `/l4-repo-docs/`.
*   Los assets nuevos cargan correctamente.

---

## Despliegue en GitHub Pages

El despliegue productivo se ejecuta automáticamente con GitHub Actions.

### Configuración Inicial de GitHub Pages

Para que el flujo de despliegue automatizado funcione sin errores, es **estrictamente necesario** configurar el origen en GitHub:

1. En GitHub, ve a **Settings** (Configuración) > **Pages**.
2. En la sección **Build and deployment**, busca la opción **Source** (Origen).
3. Cambia la selección a **"GitHub Actions"**.

*(Si omites este paso, el workflow fallará con un error `404 Not Found` al intentar publicar el sitio).*

### Pipeline CI/CD

| Campo | Valor |
| :--- | :--- |
| Workflow | `.github/workflows/docs.yml` |
| Disparadores | `push` a `main` limitado a rutas de documentación y ejecución manual con `workflow_dispatch` |
| Concurrencia | Grupo `pages`, con `cancel-in-progress: true` |
| Runner | `ubuntu-latest` |
| Ambiente GitHub | `github-pages` |
| Source | `./` |
| Destination | `./_site` |
| URL base productiva | `https://lan4mena.github.io/l4-repo-docs/` |
| Build | Node 22 para generadores, Ruby 3.3 con Bundler y `bundle exec jekyll build` |
| Publicación | `actions/upload-pages-artifact@v3` y `actions/deploy-pages@v4` |
| Ambiente destino | GitHub Pages |

### Pasos de despliegue

1. Un Pull Request aprobado se fusiona en `main`.
2. GitHub ejecuta `.github/workflows/docs.yml`.
3. `actions/checkout@v4` descarga el contenido del repositorio.
4. Se configura Node.js 22 y se ejecutan los generadores de skills y PR templates.
5. Se configura Ruby 3.3 con cache de Bundler.
6. `actions/configure-pages@v5` prepara el entorno de GitHub Pages.
7. `bundle exec jekyll build --config docs-repo/_config.yml --destination ./_site` compila el sitio hacia `./_site`.
8. `actions/upload-pages-artifact@v3` empaqueta el sitio generado.
9. `actions/deploy-pages@v4` publica el artefacto en GitHub Pages.
10. GitHub actualiza la URL productiva del portal.

Si el build falla, revisa la pestaña **Actions** del repositorio y corrige el error en una nueva rama antes de intentar desplegar de nuevo.

---

## Verificación posterior al despliegue

Después de un despliegue exitoso, valida:

*   El workflow de GitHub Actions terminó en estado exitoso.
*   La página principal carga correctamente en [https://lan4mena.github.io/l4-repo-docs/](https://lan4mena.github.io/l4-repo-docs/).
*   La navegación lateral muestra las secciones principales.
*   El buscador del portal responde.
*   Los assets del portal, como `docs-repo/assets/images/portfolio_docs_logo.svg`, cargan correctamente.
*   Los enlaces modificados en el Pull Request funcionan en el sitio publicado.
*   Las páginas técnicas principales cargan correctamente:
    *   [Arquitectura](https://lan4mena.github.io/l4-repo-docs/docs/arquitectura.html)
    *   [Despliegue](https://lan4mena.github.io/l4-repo-docs/docs/despliegue.html)
    *   [Catálogo de Repositorios](https://lan4mena.github.io/l4-repo-docs/docs/repositorios/)

---

## Rollback o recuperación

GitHub Pages publica el contenido generado desde la rama `main`. Si un despliegue introduce un error:

1. Identifica el Pull Request o commit que causó el problema.
2. Abre una rama de corrección o un Pull Request de revert.
3. Valida localmente con `docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml`.
4. Fusiona la corrección a `main` para disparar un nuevo despliegue.
5. Verifica el sitio publicado después de que GitHub Actions termine.

Si el problema impide navegar el portal o afecta assets críticos, prioriza revertir el cambio antes de agregar nueva funcionalidad.

---

## Relación implementación-documentación

Todo cambio que modifique el despliegue debe actualizar esta guía en el mismo Pull Request. Esto incluye:

*   Cambios en `.github/workflows/docs.yml`.
*   Cambios en `docs-repo/_config.yml`.
*   Cambios en dependencias de Jekyll, `docs-repo/Gemfile` o `docs-repo/Gemfile.lock`.
*   Cambios en `docs-repo/docker-compose.yml`.
*   Cambios en ambientes, dominios, rutas base o configuración de GitHub Pages.
*   Cambios en assets requeridos por el build o por la navegación del portal.
*   Cambios en comandos de validación local.

---

## Archivos generados localmente

Estos directorios son artefactos locales y no deben subirse a Git:

*   `.bundle/`
*   `.jekyll-cache/`
*   `.sass-cache/`
*   `_site/`
*   `vendor/`
*   `docs-repo/vendor/`
*   `docs-repo/docs/inteligencia-artificial/skills.md`
*   `docs-repo/docs/pr-templates/`

Están excluidos en `.gitignore`.
