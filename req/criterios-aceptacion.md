---
layout: default
title: Criterios de Aceptación
parent: Requerimientos de Negocio
nav_order: 2
---

# 📋 Guía: ¿Cómo redactar buenos Criterios de Aceptación?

Los **Criterios de Aceptación (CA)** son las condiciones predefinidas que debe cumplir una funcionalidad o historia de usuario para ser considerada como finalizada (Done) y aceptada por el Product Owner o cliente. 

Establecer criterios claros actúa como un contrato entre el equipo de negocio (Producto) y el equipo técnico (Desarrollo y QA), eliminando suposiciones y previniendo malentendidos.

---

## 🏗️ Formatos de Redacción Recomendados

En **l4 repo docs** utilizamos principalmente dos formatos para redactar criterios de aceptación, dependiendo de la naturaleza de la tarea:

### 1. Formato Basado en Escenarios (Gherkin / BDD)
Es el formato recomendado para flujos lógicos y comportamiento dinámico del sistema. Ayuda directamente al equipo de QA a escribir pruebas y facilita el desarrollo guiado por comportamiento (BDD).

Se estructura en tres palabras clave:
*   **Dado (Given):** El contexto o estado inicial del sistema antes de la acción.
*   **Cuando (When):** La acción o evento que ejecuta el usuario o el sistema.
*   **Entonces (Then):** El resultado esperado o la consecuencia de la acción.

> **Ejemplo de escenario (Gherkin):**
> *   **Escenario:** Intento de transferencia con saldo insuficiente.
> *   **Dado** que el usuario ha iniciado sesión y se encuentra en la pantalla de transferencias.
> *   **Y** su saldo disponible actual es de $50.
> *   **Cuando** el usuario ingresa un monto a transferir de $100 y presiona "Confirmar".
> *   **Entonces** el sistema no debe procesar la transferencia.
> *   **Y** debe mostrar un mensaje de error: "Saldo insuficiente para completar la transacción".

### 2. Formato Basado en Reglas (Checklist / Declarativo)
Es ideal para requerimientos visuales (UI/UX), configuraciones técnicas o restricciones estáticas donde el formato de escenario resulta redundante.

> **Ejemplo de checklist:**
> *   [ ] El botón de envío debe deshabilitarse inmediatamente después de hacer clic para evitar transacciones duplicadas.
> *   [ ] Los campos numéricos de entrada de dinero solo deben aceptar hasta 2 decimales.
> *   [ ] El diseño debe ser responsivo y visualizarse correctamente en pantallas móviles desde 360px de ancho.

---

## 🌟 Buenas Prácticas para redactar buenos CA

Para asegurar la calidad de los criterios de aceptación, estos deben cumplir con las siguientes reglas:

### 1. Ser verificables (Testables)
Un criterio de aceptación no puede ser ambiguo. Debe ser posible responder con un "Sí" o "No" a si se cumple la condición.
*   ❌ **Mal redactado:** "La página debe cargar rápido." *(¿Qué es rápido?)*
*   ✔️ **Bien redactado:** "La página debe cargar y ser interactiva en menos de 2.0 segundos en conexiones 3G."

### 2. Enfocados en el "Qué" y no en el "Cómo"
El criterio debe describir el comportamiento de negocio deseado, no la implementación técnica.
*   ❌ **Mal redactado:** "Se debe hacer un SELECT a la base de datos de usuarios para validar el rol."
*   ✔️ **Bien redactado:** "Solo los usuarios con el rol de Administrador pueden visualizar el botón de reembolsos."

### 3. Delimitar la funcionalidad (Fronteras claras)
Indica qué está dentro del alcance y qué queda explícitamente fuera.
*   ✔️ **Ejemplo:** "El sistema debe procesar pagos con tarjetas Visa y Mastercard. Las tarjetas American Express no están soportadas en esta fase."

---

## ⚖️ Ejemplos Prácticos: Malos vs Buenos Criterios

| Característica | ❌ Mal Criterio (Ambiguo/Técnico) | ✔️ Buen Criterio (Claro/Verificable) |
| :--- | :--- | :--- |
| **Seguridad** | El sistema debe ser muy seguro para evitar hackeos. | La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un número, y ser encriptada con bcrypt en base de datos. |
| **Flujo de Error** | Mostrar error si falla la API. | Si la API de validación responde con código 500, el sistema debe reintentar hasta 3 veces antes de mostrar el mensaje: "Servicio temporalmente no disponible". |
| **Interfaz** | Los colores deben verse profesionales. | La paleta de colores debe seguir el sistema de diseño de l4 repo docs (Color primario: HSL 220, 90%, 56%). El contraste del texto debe pasar la accesibilidad WCAG AA. |
