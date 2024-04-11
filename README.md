# CheckList - Versión Completa 📚 👓

## ¿Qué es CheckList? ❓

CheckList surge de la necesidad de poder facilitar la tarea de la asistencia de grupos escolares, de estudio, sociales, etc.
Se diseño para que sea una aplicación disponible para los dos principales sistemas operativos para dispositivos móviles (Android y iOS). 

## ¿Cómo funciona este proceso?

La toma de asistecia será capturada por dos dispositivos:

- El dispositivo de rol de Profesor. 👨‍🏫
- El dispositivo de rol de Estudiante. 👨‍🎓

El profesor deberá de acceder a la opción de tomar asistencia, este proceso lo que hará es que habilitará una interfaz de la aplicación que abrirá la cámara del dispositivo móvil, en ese entonces el dispositivo Profesor estará en espera de leer código Qr.

Por otra parte, el alumno deberá de acceder a la opción de registrar asistencia, en ese entonces, se generará un código Qr único el cual contendrá toda la información del alumno, podemos destacar datos como:

- Nombre completo del alumno
- Hora actual
- Clase en la cuál se encuentra
- Profesor que imparte la materia

Esto con el fin de poder tomar un registro completo de la clase a la cual se desea registrar la asistencia.

Una vez que el alumno muestre el código al profesor y este lo scannee, se obtendrá la información contenido a traves de json, archivos los cuales serán enviados a una base de datos para su posterior uso y almacenamiento.

Gracias al uso de las tecnologías de desarrollo, el producto final es un software completamente comptible con la mayoría de los smartphones.

## Tecnologías implementadas:

- JavaScript
- React Native
- Expo go
- Expo Dev
- CSS
- TypeScript
- Supabase como gestor de SGBD
- HTML

## Licencia

La licencia de este software esta a cargo del iLabTDI (Laboratorio de Innovación Basado en el Conocimiento y la Innvoación).

Desarrollado por el equipo de iLabTDI

## Contribución

Si te gustarría participar y contribuir en el desarrollo de este software para hacerlo mejor, no dudes en mandar una pull request.
