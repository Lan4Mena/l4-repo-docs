---
name: portafolio-documentation
description: Usar al crear, revisar o actualizar documentación Docs-as-Code de repositorios personales con Jekyll/Just the Docs, README.md, AGENTS.md, docs-repo/, navegación publicada, GitHub Pages, validación local Docker/Jekyll y Agent Skills.
---

# Documentación de Portafolio

Usa este skill para mantener documentación personal consistente, versionada y publicable.

La documentación es Docs-as-Code: vive junto al código, se versiona en Git y se revisa en Pull Requests igual que el código.

## Principios

- Mantén en cada repositorio solo la documentación que aporta contexto real: arquitectura, despliegue, repositorios relacionados, requerimientos y procesos locales.
- No dupliques contenido. Enlaza a la fuente principal cuando ya exista.
- No crees páginas para explicar datos evidentes del repositorio.
- Mantén la documentación publicada dentro de `docs-repo/`.

## Estructura

Prefiere esta estructura, creando carpetas opcionales solo cuando apliquen:

```text
repository/
├── README.md
├── AGENTS.md
├── docs-repo/
│   ├── index.md
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── _config.yml
│   ├── docker-compose.yml
│   ├── scripts/
│   │   ├── generate-skills-docs.ts
│   │   └── generate-pr-template-docs.ts
│   ├── _sass/
│   ├── assets/
│   ├── req/
│   ├── procesos/
│   └── docs/
├── .github/
│   ├── workflows/docs.yml
│   └── PULL_REQUEST_TEMPLATE/*.md
└── .agents/skills/<skill-name>/SKILL.md
```

No inventes `docs-repo/req/`, `docs-repo/procesos/`, `.agents/skills/`, `.github/` ni `docs-repo/scripts/` solo para llenar estructura.

## Responsabilidades

- `README.md`: entrada breve del repositorio en GitHub.
- `AGENTS.md`: instrucciones operativas para agentes.
- `docs-repo/index.md`: inicio publicado del sitio.
- `docs-repo/docs/index.md`: índice técnico publicado.
- `docs-repo/docs/arquitectura.md`: componentes, decisiones, diagramas Mermaid, límites y dependencias.
- `docs-repo/docs/despliegue.md`: ambientes, validación local, CI/CD, publicación, verificación y rollback.
- `docs-repo/docs/repositorios.md`: repositorios relacionados o proyectos incluidos en el portafolio.
- `docs-repo/docs/inteligencia-artificial/index.md`: índice de instrucciones para agentes y skills locales.
- `.agents/skills/<skill-name>/SKILL.md`: skill reutilizable. La carpeta y el campo `name` deben coincidir.
- `.github/PULL_REQUEST_TEMPLATE/*.md`: plantillas operativas de PR cuando apliquen.

## Agent Skills

- Usa `.agents/skills/<skill-name>/SKILL.md`.
- `name` debe coincidir con la carpeta.
- Usa minúsculas, números y guiones.
- Incluye `description` clara sobre cuándo debe activarse.
- Mantén cada `SKILL.md` enfocado.
- No edites manualmente `docs-repo/docs/inteligencia-artificial/skills.md`; debe generarse durante el pipeline.
- No edites manualmente `docs-repo/docs/pr-templates/`; debe generarse desde `.github/PULL_REQUEST_TEMPLATE/**`.

## Validación Local

Ejecuta primero los generadores que apliquen y luego valida Jekyll con Docker Compose:

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
docker compose -f docs-repo/docker-compose.yml up docs
```

Configura `url` y `baseurl` en `docs-repo/_config.yml` para GitHub Pages de proyecto:

```yaml
url: "https://<usuario>.github.io"
baseurl: "/<repositorio>"
```

Mantén el mismo `baseurl` en local y producción. Usa `4003` como puerto local por defecto y revisa el sitio en `http://localhost:4003/<repositorio>/`. Si está ocupado:

```bash
DOCS_PORT=4004 docker compose -f docs-repo/docker-compose.yml up docs
```

## GitHub Pages

Si el repositorio publica documentación:

- Dispara el workflow solo desde `main` y con `workflow_dispatch` cuando aplique.
- Limita `paths` a documentación, `README.md`, `AGENTS.md`, skills, plantillas de PR y el workflow.
- Usa Node 22 para generadores.
- Ejecuta los mismos generadores de skills y PR templates en local y en el workflow cuando apliquen.
- Usa Ruby 3.3 con cache de Bundler.
- Usa `actions/configure-pages`, `bundle exec jekyll build`, `actions/upload-pages-artifact` y `actions/deploy-pages`.

## Revisión Final

Antes de terminar:

- Ningún enlace interno apunta a archivos removidos, renombrados o fuentes `.md` no publicadas.
- Las rutas internas respetan el `baseurl` del repositorio.
- Cuando cambien navegación, `baseurl`, permalinks, índices, generadores o estructura publicada, recorre el sitio servido localmente: valida destinos internos, anchors y enlaces externos agregados.
- `README.md` es breve.
- La guía de despliegue concentra comandos reales de validación local y CI/CD.
- El índice principal refleja la navegación real.
- No se versionan `_site/`, `vendor/`, `.bundle/`, `.jekyll-cache/`, `.sass-cache/`, `docs-repo/docs/inteligencia-artificial/skills.md`, `docs-repo/docs/pr-templates/` ni otras páginas generadas.
