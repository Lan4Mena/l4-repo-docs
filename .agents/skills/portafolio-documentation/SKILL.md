---
name: portafolio-documentation
description: Usar al crear, revisar o actualizar documentación de repositorios l4 repo docs, incluyendo README.md, index.md, AGENTS.md, docs/, req/, procesos/, docs/repositorios.md, navegación Jekyll, enlaces GitHub Pages y Agent Skills.
---

# Documentación l4 repo docs

Usa este skill para documentar repositorios l4 repo docs de forma consistente con el portal central de documentación.

## Instalación Global Recomendada

Para facilitar la documentación de tus repositorios locales siguiendo los lineamientos de l4 repo docs y permitir su prueba local, se recomienda instalar esta skill de manera global en tu máquina.

### Pasos para la instalación global:

1. Crea el directorio de configuración global de skills para tu agente de IA (por ejemplo, en Gemini/Antigravity):
   ```bash
   mkdir -p ~/.gemini/config/skills/portafolio-documentation
   ```
2. Copia el contenido de la carpeta `.agents/skills/portafolio-documentation` de este repositorio a tu directorio global:
   ```bash
   cp -r .agents/skills/portafolio-documentation/* ~/.gemini/config/skills/portafolio-documentation/
   ```

Esto habilitará la skill `portafolio-documentation` globalmente, permitiendo que tu agente la utilice de forma transparente en cualquier otro repositorio.

## Modelo Base

La documentación l4 repo docs es centralizada y distribuida:

- El portal central define estándares transversales, procesos, onboarding, referencias de IA e inventario completo de repositorios l4 repo docs.
- Cada repositorio mantiene la documentación que cambia con su código: arquitectura, despliegue, repositorios relacionados, requerimientos y procesos locales.

Evita duplicar contenido canónico. Enlaza a la página canónica cuando la información ya exista.

## Estructura Recomendada

Para un repositorio l4 repo docs, prefiere esta estructura:

```text
repository/
├── README.md
├── AGENTS.md
├── index.md
├── docs/
│   ├── index.md
│   ├── arquitectura.md
│   ├── despliegue.md
│   └── repositorios.md
├── req/
├── procesos/
└── .agents/
    └── skills/
        └── skill-name/
            └── SKILL.md
```

Crea carpetas opcionales solo cuando apliquen. No inventes requerimientos, procesos o skills solo para llenar la estructura.

## Responsabilidades por Archivo

- `README.md`: entrada del repositorio en GitHub. Debe ser breve y enlazar a la documentación publicada y documentos clave.
- `index.md`: página inicial publicada de la documentación del repositorio.
- `AGENTS.md`: instrucciones operativas para agentes de código que trabajen en el repositorio.
- `docs/index.md`: índice técnico y entrada de navegación.
- `docs/arquitectura.md`: arquitectura, componentes, decisiones, diagramas, límites y dependencias que requieren explicación.
- `docs/despliegue.md`: ambientes, validación local, CI/CD, despliegue, verificación, rollback y relación implementación-documentación.
- `docs/repositorios.md`: repositorios relacionados, dependencias, proveedores, consumidores, integraciones o infraestructura relacionada. Solo en el portal central representa el inventario completo l4 repo docs.
- `req/`: requerimientos de negocio, casos de uso, historias de usuario, criterios de aceptación y reglas.
- `procesos/`: procesos propios del repositorio. Enlaza al proceso central cuando el estándar sea suficiente.
- `.agents/skills/<skill-name>/SKILL.md`: Agent Skill reutilizable. La carpeta y el campo `name` deben coincidir.

## Flujo de Trabajo

1. Inspecciona los archivos existentes antes de editar. Respeta la navegación y nombres ya usados en el repositorio.
2. Identifica la fuente canónica de cada información. Mueve o enlaza en lugar de duplicar.
3. Actualiza los índices cuando agregues, renombres o muevas páginas publicadas.
4. Usa enlaces relativos para Markdown interno, excepto enlaces publicados del portal que intencionalmente apunten a GitHub Pages.
5. En diagramas Mermaid, usa etiquetas entre comillas cuando los nodos tengan rutas, puntos o puntuación que pueda romper Mermaid 10.1.0.
6. Para cambios solo de Markdown, la verificación normal es recargar la página local e inspeccionar el render.
7. Ejecuta build de Jekyll solo cuando cambie configuración, navegación, dependencias, páginas con Mermaid complejo o comportamiento de publicación.

## Revisión de Enlaces y Duplicación

Antes de finalizar, revisa:

- Ningún enlace interno apunta a archivos removidos o renombrados.
- Las etiquetas de navegación coinciden con los títulos, especialmente `Catálogo de Repositorios`.
- Las páginas ocultas o históricas no duplican estándares activos; deben apuntar a páginas canónicas.
- `docs/repositorios.md` describe repositorios relacionados en repos normales y todos los repos l4 repo docs solo en el portal central.
- Los comandos de despliegue y detalles de CI viven en `docs/despliegue.md`, no dispersos en varias páginas.
- El lenguaje de negocio y criterios de aceptación viven en `req/`; el flujo de entrega vive en `procesos/`.

## Reglas para Agent Skills

Al crear un skill:

- Usa `.agents/skills/<skill-name>/SKILL.md`.
- Incluye frontmatter YAML con `name` y `description`.
- Usa minúsculas, números y guiones para la carpeta y el campo `name`.
- Mantén `SKILL.md` conciso y procedural.
- Coloca material largo en `references/`, scripts reutilizables en `scripts/` y plantillas o assets en `assets/`.
- No agregues archivos auxiliares como README, changelog o guías de instalación salvo que el usuario lo pida explícitamente.
