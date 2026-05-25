---
layout: default
title: Requerimientos de Negocio
nav_order: 6
has_children: true
permalink: /req
---

# 🎯 Requerimientos y Casos de Uso de Negocio

En esta sección se consolidan los requerimientos, flujos lógicos, casos de uso e historias de usuario expresados en **lenguaje de negocio**.

A diferencia de `README.md` (entrada principal del repositorio) y de `/docs` (documentación técnica y arquitectura de software), la carpeta `/req` define **qué necesita el negocio** y sirve como puente de comunicación entre Producto, Operaciones y Desarrollo. El proceso operativo para entregar esos cambios se documenta en **[Procesos](../procesos/index.md)**.

---

## 📂 Contenido del Directorio

En este directorio encontrarás:
*   **[📝 Plantilla de Caso de Uso](CASO_USO_TEMPLATE.md):** El estándar formal que debes copiar y completar para redactar nuevos casos de uso.
*   **[📋 Guía: Criterios de Aceptación](criterios-aceptacion.md):** Formatos de redacción y buenas prácticas para definir criterios claros y verificables.
*   **[🧩 Guía: Historia de Usuario](historia-usuario.md):** Estructura y buenas prácticas para crear historias de usuario derivadas de casos de uso.
*   **[🔄 GitHub Flow l4 repo docs](../procesos/github-flow.md):** Proceso transversal para llevar una HU desde `Backlog` hasta `Done`.
*   *Otros casos de uso de negocio globales cuando sea pertinente.*

---

## 🛠️ ¿Cuándo documentar en `/req`?

Debes agregar o modificar documentos aquí cuando:
1. Se defina una nueva regla de negocio global que afecte a múltiples sistemas.
2. Se diseñe un flujo de usuario complejo que involucre interacciones de cara al cliente.
3. Se requiera especificar flujos alternativos, validaciones y excepciones desde la perspectiva funcional.

Usa `/procesos` cuando necesites documentar cómo se trabaja, revisa, integra o entrega un cambio.
