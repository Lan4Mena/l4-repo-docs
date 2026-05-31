---
layout: default
title: Inteligencia Artificial
parent: Documentación Técnica
nav_order: 4
has_children: true
permalink: /docs/inteligencia-artificial/
---

# Inteligencia Artificial

Esta sección documenta el uso de instrucciones para agentes y skills reutilizables en mis repositorios.

## Estándares abiertos

- `AGENTS.md` contiene instrucciones operativas para agentes dentro de un repositorio.
- Agent Skills empaqueta capacidades reutilizables mediante carpetas con `SKILL.md`.

Cada `SKILL.md` debe declarar `name` y `description` en su frontmatter YAML. El nombre debe coincidir con el nombre de la carpeta y usar minúsculas, números y guiones.

## Contenido

- **[AGENTS.md](agents/):** instrucciones operativas de este repositorio.
- **[Skills](skills.html):** catálogo generado desde `.agents/skills/**/SKILL.md`.

## Skill Local

La skill `.agents/skills/portafolio-documentation/SKILL.md` contiene las convenciones para crear, revisar y actualizar documentación personal con Jekyll, Just the Docs y GitHub Pages.

La página `skills.md` se genera durante el build y no se edita manualmente.

## Referencias

- [AGENTS.md](https://agents.md/)
- [Agent Skills](https://agentskills.io/home)
- [Agent Skills Specification](https://agentskills.io/specification)
