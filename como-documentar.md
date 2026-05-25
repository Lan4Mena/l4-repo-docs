---
layout: default
title: ¿Cómo Documentar?
nav_order: 3
---

# 📝 Guía Práctica: ¿Cómo Documentar?

Para garantizar que nuestra documentación técnica se mantenga actualizada y siga el ciclo de vida del código, en **l4 repo docs** aplicamos el concepto de **Docs-as-Code** (Documentación como Código).

Esto significa que la documentación vive junto al código, se versiona en Git y se revisa mediante Pull Requests al igual que el código de producción.

---

## 🏗️ Estructura Estándar en cada Repositorio

Cada repositorio de código en la organización debe mantener la siguiente estructura mínima en su rama principal (`main` o `master`):

```text
nombre-del-repositorio/
├── README.md                # Entrada del repositorio en GitHub y página publicada en /readme/
├── AGENTS.md                # Instrucciones para agentes y página publicada en /docs/inteligencia-artificial/agents/
├── index.md                 # Entrada publicada del repositorio e índice principal
├── docker-compose.yml       # Ambiente local versionado, si el repo usa contenedores
├── .agents/                 # Skills reutilizables para agentes, si aplican
│   └── skills/
│       └── nombre-del-skill/
│           └── SKILL.md
├── docs/                    # Carpeta para Documentación TÉCNICA
│   ├── index.md             # Índice de la documentación técnica publicada
│   ├── arquitectura.md      # Diseño del sistema, diagramas, decisiones técnicas
│   ├── despliegue.md        # Pasos y requerimientos para validar y desplegar en ambientes
│   └── repositorios.md      # Repositorios relacionados, dependencias o integraciones
├── req/                     # Carpeta para Requerimientos de NEGOCIO (Casos de Uso)
│   └── CU-01-registro.md    # Especificaciones funcionales y flujos de negocio
├── procesos/                # Solo si el repositorio define procesos propios
└── ... (código fuente)
```

### 1. El archivo `README.md` (Entrada del repositorio)

Es la entrada del repositorio cuando se navega desde GitHub. Debe ser conciso y proporcionar una visión general del sistema sin intentar reemplazar la documentación publicada.

En l4 repo docs, el `README.md` también puede publicarse como página del portal sin mover el archivo físico. Para eso debe incluir frontmatter Jekyll al inicio:

```markdown
---
layout: default
title: README
nav_order: 2
permalink: /readme/
---
```

Con esta convención:

*   GitHub sigue usando `README.md` como entrada del repositorio.
*   GitHub Pages lo publica como página navegable en `/readme/`.
*   No se duplica el contenido en otra ruta.

Un buen `README.md` contiene:

*   Una breve descripción de qué hace el proyecto.
*   Enlace a la documentación técnica: `[Documentación Técnica](docs/index.md)`.
*   Enlace rápido a la arquitectura cuando aplique: `[Arquitectura y Diseño](docs/arquitectura.md)`.
*   Enlace rápido a la guía de despliegue y validación local cuando aplique: `[Despliegue](docs/despliegue.md)`.
*   Enlace a la documentación publicada del propio repositorio en GitHub Pages.
*   Enlace al inventario central publicado: `[Catálogo de Repositorios l4 repo docs](https://lan4mena.github.io/l4-repo-docs/docs/repositorios)`.
*   Enlaces a casos de uso o historias relevantes cuando existan en `/req`.

### 2. El archivo `AGENTS.md` (Instrucciones para agentes)

Es la entrada operativa para agentes de código. Debe contener el contexto que un agente necesita para trabajar en el repositorio sin sobrecargar el `README.md`.

En l4 repo docs, el `AGENTS.md` raíz es el source of truth y también debe publicarse dentro de la sección de Inteligencia Artificial sin moverlo físicamente. Para eso debe incluir frontmatter Jekyll:

```markdown
---
layout: default
title: AGENTS.md
parent: Inteligencia Artificial
nav_order: 5
permalink: /docs/inteligencia-artificial/agents/
---
```

Con esta convención:

*   El archivo físico sigue viviendo en la raíz del repositorio.
*   La página publicada aparece bajo `Documentación Técnica > Inteligencia Artificial > AGENTS.md`.
*   No se mantiene una copia duplicada en `docs/inteligencia-artificial/agents.md`.
*   `AGENTS.md` no debe estar en el bloque `exclude` de `_config.yml` si se quiere publicar.

Como mínimo debe documentar:

*   Resumen del proyecto y responsabilidades principales.
*   Estructura relevante del repositorio.
*   Comandos reales para instalar, compilar, probar, levantar servicios o validar documentación.
*   Convenciones de código, documentación, navegación o arquitectura.
*   Consideraciones de seguridad: secretos, datos sensibles y visibilidad pública.
*   Verificación esperada antes de finalizar una tarea.
*   Criterios para Pull Requests, incluyendo cuándo actualizar documentación relacionada.

La referencia organizacional vive en **[Inteligencia Artificial](docs/inteligencia-artificial/)** y su página **[AGENTS.md](docs/inteligencia-artificial/agents/)**.

### 3. El archivo `index.md` (Entrada publicada)

Es la página principal del repositorio cuando su documentación se publica en GitHub Pages. Debe funcionar como índice navegable y reflejar la jerarquía real del menú:

*   Enlace a `README.md` solo si aporta contexto para colaboradores en GitHub.
*   Enlace a `docs/index.md` como entrada de la documentación técnica.
*   Enlaces a `/req`, `/procesos` u otras secciones cuando apliquen.
*   Enlaces a páginas hijas solo si ayudan a navegar sin duplicar contenido.

### 4. La carpeta `.agents/skills` (Agent Skills)

Esta carpeta es opcional. Se usa cuando el repositorio necesita skills reutilizables para enseñar a agentes un flujo, herramienta, dominio o procedimiento específico de l4 repo docs.

Cada skill debe vivir en su propia carpeta y contener un `SKILL.md` con frontmatter YAML obligatorio:

```markdown
---
name: nombre-del-skill
description: Describe qué hace el skill y cuándo debe usarse.
---
```

Reglas mínimas:

*   El `name` debe coincidir con el nombre de la carpeta.
*   Usa solo minúsculas, números y guiones en el nombre.
*   La `description` debe explicar qué hace el skill y en qué tareas debe activarse.
*   Mantén `SKILL.md` enfocado; mueve documentación extensa a `references/`.
*   Usa `scripts/` para automatizaciones reutilizables y `assets/` para plantillas o recursos.

Las skills no se duplican manualmente dentro de `/docs`. El pipeline de GitHub Pages detecta los archivos `.agents/skills/**/SKILL.md` y genera durante el despliegue la página publicada de Skills dentro de la sección de Inteligencia Artificial.

Con esta convención:

*   `.agents/skills/**/SKILL.md` es el source of truth.
*   `docs/inteligencia-artificial/skills.md` se genera como artefacto temporal del build.
*   El archivo generado no debe versionarse manualmente.
*   Si una skill no declara `name` o `description`, el deploy debe fallar para proteger el estándar.

Consulta **[Inteligencia Artificial](docs/inteligencia-artificial/)** y la documentación oficial enlazada ahí antes de crear o modificar skills.

### 5. La carpeta `/docs` (Documentación técnica publicada)

Aquí vive el grueso del conocimiento de implementación y la entrada navegable de la documentación técnica del repositorio. Divide el contenido en archivos temáticos:

*   `index.md`: Índice de la documentación técnica publicada del repositorio. Debe enlazar a arquitectura, despliegue, catálogo interno o cualquier otra página técnica que aplique.
*   `arquitectura.md`: Diagramas de arquitectura (usando **Mermaid**), decisiones técnicas importantes (ADRs) y dependencias con otros servicios.
*   `despliegue.md`: Ambientes, incluyendo local, configuración de CI/CD, variables requeridas, pasos de publicación, rollback y cómo validar que el despliegue fue exitoso.
*   `repositorios.md`: Repositorios relacionados con el sistema: dependencias, integraciones, consumidores, proveedores o repositorios que el equipo necesita consultar para operar el sistema.

#### Páginas publicadas desde archivos raíz

Algunos archivos raíz pueden funcionar como documentación operativa y página publicada a la vez. En esos casos se usa frontmatter y `permalink`, pero no se mueve el archivo.

| Archivo raíz | Propósito | Ruta publicada |
| :--- | :--- | :--- |
| `README.md` | Entrada humana del repositorio | `/readme/` |
| `AGENTS.md` | Instrucciones operativas para agentes | `/docs/inteligencia-artificial/agents/` |

Esta regla evita duplicar documentación y mantiene un único source of truth por artefacto.

#### Documentación generada durante el deploy

Cuando una página sea derivada de metadata o contratos del repositorio, debe generarse durante el pipeline en lugar de versionarse como copia manual.

| Fuente | Página generada | Motivo |
| :--- | :--- | :--- |
| `.agents/skills/**/SKILL.md` | `docs/inteligencia-artificial/skills.md` | Listar skills disponibles con `name` y `description` |

Esta regla evita inconsistencias entre la configuración real del repositorio y la documentación publicada.

#### Qué debe contener `docs/repositorios.md`

Cada repositorio debe registrar en `docs/repositorios.md` los repositorios con los que tiene relación directa. La relación puede ser una dependencia técnica, integración, repositorio consumidor, repositorio proveedor, librería compartida, infraestructura relacionada o documentación necesaria para operar el sistema.

El portal central `l4-repo-docs` es la excepción: como punto central de consulta, su `docs/repositorios.md` registra todos los repositorios l4 repo docs.

Como mínimo, cada fila debe incluir:

*   **Sistema / Proyecto:** nombre funcional o técnico del sistema relacionado.
*   **Repositorio:** enlace al repositorio GitHub.
*   **Tipo:** API, backend, frontend, mobile, infraestructura, documentación, librería, worker, integración u otro tipo claro.
*   **Descripción:** resumen breve de la responsabilidad del repositorio.
*   **Documentación publicada:** enlace a la GitHub Page del repositorio relacionado. No debe apuntar a Markdown crudo.
*   **Responsable:** equipo, área o persona responsable.
*   **Estado:** `Activo`, `En desarrollo`, `Archivado`, `Deprecado` o `Pendiente de documentación`.

`docs/repositorios.md` no reemplaza `docs/arquitectura.md`. Si la relación con otro repositorio requiere explicar contratos, flujos, eventos, dependencias de despliegue o riesgos, documenta ese detalle en arquitectura y usa `repositorios.md` como índice navegable.

#### Qué debe contener `docs/despliegue.md`

Cada repositorio que tenga despliegue propio debe documentar su operación real, no una guía genérica. Como mínimo debe incluir:

*   **Ambientes:** local, CI, staging, producción u otros ambientes aplicables, con propósito y forma de acceso.
*   **Requerimientos:** herramientas, versiones, permisos, secretos y variables de entorno necesarias, sin exponer valores sensibles.
*   **Validación local:** comandos para compilar, probar o levantar el sistema antes del Pull Request como parte del ambiente local.
*   **Pipeline CI/CD:** archivo o servicio que ejecuta el despliegue, rama que lo dispara y condiciones de publicación.
*   **Pasos de despliegue:** qué ocurre desde el merge hasta que el cambio queda publicado.
*   **Verificación posterior:** checks mínimos para confirmar que el despliegue fue exitoso.
*   **Rollback o recuperación:** cómo volver a un estado anterior o dónde escalar si falla.
*   **Relación implementación-documentación:** cualquier cambio en infraestructura, pipeline, ambientes, variables, contenedores o assets requeridos debe actualizar `docs/despliegue.md` en el mismo Pull Request.

Además, si un repositorio se registra en el inventario central o en el `docs/repositorios.md` de otro sistema, debe publicar su documentación en GitHub Pages para que los catálogos apunten a documentación navegable, no a archivos Markdown crudos en GitHub.

### 6. La carpeta `/req` (Requerimientos de Negocio)

Esta carpeta se utiliza de forma opcional pero recomendada cuando el proyecto implementa lógicas complejas que requieren alineación con el lenguaje de negocio o de cara al cliente:

*   Contiene casos de uso redactados en lenguaje no técnico, facilitando la comprensión y validación entre ingenieros y tomadores de decisiones/Product Owners.
*   Usa archivos con nombres representativos (ej. `CU-01-registro-comercio.md`) basados en la **[Plantilla de Caso de Uso del Portal](req/CASO_USO_TEMPLATE.md)**.

### 7. La carpeta `/procesos` (Procesos del Repositorio)

Esta carpeta solo debe existir cuando el repositorio necesite documentar procesos propios que no estén cubiertos por el portal central. Para el flujo estándar de ramas, Pull Requests, CI y entregas, usa el **[GitHub Flow l4 repo docs](procesos/github-flow.md)** del portal.

---

## 🌟 Buenas Prácticas de Redacción

1. **Usa Markdown Estándar:** Mantén el formato simple. Usa negrita para enfatizar, listas para pasos secuenciales y bloques de código con su lenguaje específico para sintaxis coloreada.
2. **Diagramas con Mermaid:** En lugar de subir imágenes estáticas (que no se pueden editar fácilmente), utiliza bloques de `mermaid` para crear diagramas de flujo o arquitectura secuenciales. Ejemplo:
   ```text
   ```mermaid
   sequenceDiagram
       Usuario->>API Gateway: GET /perfil
       API Gateway->>Microservicio: Validar Token
   ```
   ```
3. **No dupliques información:** Si algo ya está documentado de forma global en este portal central (como la configuración del Slack o VPN corporativa), no lo vuelvas a escribir en tu repositorio. Pon un enlace a este portal.
4. **No versiones artefactos generados:** Si una página se deriva automáticamente de metadata o archivos fuente, debe generarse en el pipeline y no mantenerse como copia manual.
5. **Mantén las credenciales seguras:** **NUNCA** guardes contraseñas, tokens de API o archivos `.env` reales en los repositorios de documentación. Utiliza plantillas de ejemplo (como `.env.example`).

---

## 🔄 Proceso de Actualización

Cuando agregues una nueva funcionalidad, cambies una variable de entorno o modifiques la base de datos:

1. Crea tu rama de Git para desarrollar la funcionalidad.
2. Realiza los cambios en el código **y edita los archivos correspondientes en `README.md`, `AGENTS.md`, `docs/`, `.agents/skills/` o `req/` en esa misma rama**.
3. Envía tu Pull Request. El revisor evaluará tanto la calidad del código como que la documentación refleje el nuevo cambio.
4. Una vez fusionado en `main`, tu documentación estará actualizada.
