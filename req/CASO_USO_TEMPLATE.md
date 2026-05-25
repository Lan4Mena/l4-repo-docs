---
layout: default
title: Plantilla de Caso de Uso
parent: Requerimientos de Negocio
nav_order: 1
---

# 📝 Plantilla de Caso de Uso (Negocio)

*Código de Caso de Uso:* **[CU-XXX]**  
*Nombre:* **[Nombre del caso de uso en lenguaje claro, ej: Registro de nuevo comercio]**  
*Fecha de Creación/Modificación:* **[AAAA-MM-DD]**  
*Propietario / Product Owner:* **[Nombre del responsable de producto]**

---

## 🎯 1. Descripción
*Describe brevemente y en lenguaje no técnico el objetivo que el usuario o el negocio busca lograr con este flujo.*

Ejemplo: Permitir que un nuevo comercio se registre en la plataforma l4 repo docs para poder recibir pagos electrónicos, recopilando sus datos legales e información bancaria básica.

### 🗣️ Lenguaje Ubicuo (Alineación Negocio-TI)
*Define los términos clave y conceptos de negocio que se utilizan en este documento. Esto evita ambigüedades y establece un lenguaje común (Ubiquitous Language) entre el equipo técnico y el de negocio.*
*   **Comercio Solicitante (Merchant Candidate):** El comercio que está en proceso de onboarding y aún no ha sido aprobado.
*   **Identificación Legal (Legal ID):** Cédula física, jurídica o DIMEX válida utilizada para registrar el comercio.
*   **Código de Verificación (OTP):** Clave de un solo uso y de corta duración enviada para verificar el canal de comunicación.

---

## 👥 2. Actores
*Identifica quién o qué inicia o participa en el caso de uso (usuarios, administradores, sistemas externos).*
*   **Actor Principal:** [Ej. Comercio Solicitante, Administrador del Sistema]
*   **Actores Secundarios:** [Ej. Sistema de Validación de Identidad (Tercero)]

---

## 🚦 3. Precondiciones
*¿Qué condiciones deben cumplirse antes de que este caso de uso pueda comenzar?*
*   El usuario debe contar con un correo electrónico válido.
*   [Precondición 2]

---

## 🛣️ 4. Flujo Principal (Camino Feliz)
*Paso a paso cronológico y numerado de cómo se ejecuta el flujo desde el inicio hasta el éxito.*

1. El **Comercio Solicitante** ingresa al portal y selecciona "Crear Cuenta".
2. El sistema muestra el formulario de datos básicos (Nombre, Identificación, Correo, Teléfono).
3. El **Comercio Solicitante** completa el formulario y presiona "Siguiente".
4. El sistema valida que el formato de los datos sea correcto y que el correo no esté registrado previamente.
5. El sistema envía un código de verificación de 6 dígitos al correo proporcionado.
6. El **Comercio Solicitante** ingresa el código recibido.
7. El sistema confirma la validación y crea la cuenta en estado "Pendiente de Aprobación".

---

## 🔄 5. Flujos Alternativos y Excepciones
*Describe los caminos secundarios que pueden ocurrir durante el flujo. Utiliza la nomenclatura `[Paso de desvío].[Letra]` para referenciar en qué parte del Flujo Principal ocurre la desviación. Define al final de cada flujo si el usuario reingresa o si termina el proceso.*

### 5.1. Flujos Alternativos (Caminos secundarios con éxito)
*Caminos alternos que toma el usuario pero que eventualmente permiten cumplir el objetivo del caso de uso.*

#### **[Paso].[Letra] — [Nombre del Flujo Alternativo] (Se desvía en Paso [X])**
*   **[Paso].[Letra].1.** [Paso 1 del flujo alterno]
*   **[Paso].[Letra].2.** [Paso 2 del flujo alterno]
*   **[Paso].[Letra].X.** **Retornar al Paso [Y]** del Flujo Principal.

---

### 5.2. Flujos de Excepción (Errores o cancelaciones sin éxito)
*Caminos de error o decisiones del usuario que impiden completar el objetivo del caso de uso, terminando el proceso sin éxito.*

#### **[Paso].[Letra] — [Nombre del Flujo de Excepción] (Se desvía en Paso [X])**
*   **[Paso].[Letra].1.** [Paso 1 del flujo de excepción]
*   **[Paso].[Letra].2.** [Paso 2 del flujo de excepción]
*   **[Paso].[Letra].X.** **Fin del Caso de Uso (Sin éxito).**

---

## 🏁 6. Postcondiciones
*¿Cuál es el estado del sistema una vez completado el caso de uso con éxito?*
*   La cuenta del comercio queda registrada en la base de datos con estado "Pendiente".
*   Se genera un evento de notificación para el equipo de Operaciones para revisión manual de documentos.

---

## ⚖️ 7. Reglas de Negocio
*Políticas o restricciones del negocio que rigen este comportamiento.*

| ID Regla | Nombre | Descripción / Restricción |
| :--- | :--- | :--- |
| **RN-01** | Mayoría de Edad | Solo se permite el registro a representantes legales mayores de 18 años. |
| **RN-02** | Jurisdicción | Solo se permiten registros con identificaciones legales válidas en Costa Rica (cédula física, jurídica, DIMEX). |

---

## 📋 8. Criterios de Aceptación
*Define los criterios formales para dar por terminado este caso de uso. Puedes usar formato declarativo (Checklist) o descriptivo de escenarios (Dado/Cuando/Entonces). Consulta la **[Guía de Criterios de Aceptación](criterios-aceptacion.md)** para ver buenas prácticas.*

### Escenario 1: [Nombre del escenario descriptivo]
*   **Dado** [Contexto o estado inicial]
*   **Cuando** [Acción o evento ejecutado]
*   **Entonces** [Resultado esperado o consecuencia]

### Criterios Generales (Checklist)
*   [ ] [Criterio general de UI/UX, ej: deshabilitar botones al procesar]
*   [ ] [Criterio de rendimiento o accesibilidad]
