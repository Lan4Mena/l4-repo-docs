---
layout: default
title: Skills
parent: Inteligencia Artificial
nav_order: 10
---

# Skills

Esta página se genera automáticamente durante el despliegue de GitHub Pages a partir del front matter de los archivos `.agents/skills/*/SKILL.md`.

| Skill | Descripción |
| :--- | :--- |
| **portafolio-documentation** | Usar al crear, revisar o actualizar documentación de repositorios l4 repo docs, incluyendo README.md, index.md, AGENTS.md, docs/, req/, procesos/, docs/repositorios.md, navegación Jekyll, enlaces GitHub Pages y Agent Skills. |

## Generación Local de la Documentación

Si agregas o modificas una skill en `.agents/skills/*/SKILL.md` y deseas actualizar esta lista de skills localmente, puedes ejecutar el siguiente comando desde la raíz del repositorio:

```bash
npx tsx scripts/generate-skills-docs.ts
```

Este comando leerá el front matter de todas las skills y actualizará esta página de forma automática.
