# QR Branch

---

## Introducción

El módulo "QR Branch" es una implementación específica dentro de nuestra aplicación que ofrece una solución innovadora para la toma de asistencia mediante el uso de códigos QR. Desarrollado con el objetivo de simplificar y agilizar este proceso, el módulo permite la generación y lectura de códigos QR para capturar datos de los alumnos de manera eficiente.

## Funcionamiento del Proceso

### Dispositivos Involucrados

El proceso de toma de asistencia implica dos dispositivos clave:

1. **Dispositivo del Profesor:** Este dispositivo tiene el rol principal de capturar la asistencia de los alumnos.

2. **Dispositivo del Estudiante:** Los alumnos utilizan este dispositivo para generar y presentar su código QR único.

### Paso a Paso

1. **Acceso del Profesor:**
   - El profesor accede a la opción de tomar asistencia en la interfaz de la aplicación.
   - Esta acción habilita la cámara del dispositivo móvil, preparándose para la lectura del código QR.

2. **Generación del Código QR por el Estudiante:**
   - El alumno accede a la opción de registrar asistencia.
   - En este momento, se genera un código QR único que contiene información vital del alumno, como el nombre completo, la hora actual, la clase y el profesor a cargo.

3. **Escaneo del Código QR por el Profesor:**
   - El profesor, con la interfaz de toma de asistencia activa, escanea el código QR mostrado por el alumno.

4. **Captura de Información:**
   - El código QR contiene datos estructurados en formato JSON, incluyendo el nombre del alumno, la hora, la clase y el profesor.
   - Estos datos son capturados por la aplicación del profesor y preparados para su procesamiento.

5. **Almacenamiento en la Base de Datos:**
   - Los datos capturados son enviados a una base de datos para su almacenamiento y uso posterior.
   - Esto permite un registro completo y organizado de la asistencia de la clase.

## Tecnologías Utilizadas

- **React Native:** Se ha implementado el módulo QR utilizando React Native para garantizar la compatibilidad multiplataforma y un desarrollo eficiente.

- **Procesamiento de Datos:** La información capturada se procesa y se almacena en una base de datos utilizando [Supabase (SGBD)](https://supabase.com/).

## Instalación y Configuración

Para incorporar el módulo "QR Branch" a la aplicación, consulte la sección de [Instalación y Configuración](enlace) en el README principal.

## Contribuciones y Desarrollo Continuo

Agradecemos las contribuciones y sugerencias para mejorar este módulo. Consulte nuestra guía de [Contribución](enlace) para obtener información sobre cómo contribuir al desarrollo.

## Licencia

Este módulo se distribuye bajo la licencia [Nombre de la Licencia](enlace). Consulte el archivo LICENSE.md para obtener detalles completos.

---
