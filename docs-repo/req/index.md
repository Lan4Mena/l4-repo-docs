---
layout: default
title: Requerimientos de Negocio
nav_order: 6
has_children: true
permalink: /req/
---

# 🎯 Requerimientos y Casos de Uso de Negocio

En esta sección se consolidan los requerimientos, flujos lógicos, casos de uso e historias de usuario expresados en **lenguaje de negocio**.

A diferencia de `README.md` (entrada principal del repositorio) y de `docs-repo/docs/` (documentación técnica y arquitectura de software), la carpeta `docs-repo/req/` define **qué se necesita** y sirve como referencia funcional. El proceso operativo para entregar esos cambios se documenta en **[Procesos](../procesos/)**.

---

## 📂 Contenido del Directorio

En este directorio encontrarás:
*   **[📝 Plantilla de Caso de Uso](CASO_USO_TEMPLATE.html):** El estándar formal que debes copiar y completar para redactar nuevos casos de uso.
*   **[📋 Guía: Criterios de Aceptación](criterios-aceptacion.html):** Formatos de redacción y buenas prácticas para definir criterios claros y verificables.
*   **[🧩 Guía: Historia de Usuario](historia-usuario.html):** Estructura y buenas prácticas para crear historias de usuario derivadas de casos de uso.
*   **[🔄 GitHub Flow del portafolio](../procesos/github-flow.html):** Proceso reutilizable para llevar una HU desde `Backlog` hasta `Done`.
*   *Otros casos de uso de negocio globales cuando sea pertinente.*

---

## 🛠️ ¿Cuándo documentar en `docs-repo/req/`?

Debes agregar o modificar documentos aquí cuando:
1. Se defina una nueva regla de negocio global que afecte a múltiples sistemas.
2. Se diseñe un flujo de usuario complejo que involucre interacciones de cara al cliente.
3. Se requiera especificar flujos alternativos, validaciones y excepciones desde la perspectiva funcional.

Usa `docs-repo/procesos/` cuando necesites documentar cómo se trabaja, revisa, integra o entrega un cambio.
