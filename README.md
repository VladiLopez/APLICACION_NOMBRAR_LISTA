# QR Branch

Implementación del modulo de la aplicación en la cual se ha desarrollado e implementado la opción de la generación de un código Qr el cual será el medio por el cual se capturarán los datos del alumno, esto con el proposito de facilitar la tarea.

### ¿Cómo funciona este proceso?

La toma de asistecia será capturada por dos dispositivos:

- El dispositivo de rol de Profesor.
- El dispositivo de rol de Estudiante.

El profesor deberá de acceder a la opción de tomar asistencia, este proceso lo que hará es que habilitará una interfaz de la aplicación que abrirá la cámara del dispositivo móvil, en ese entonces el dispositivo Profesor estará en espera de leer código Qr.

Por otra parte, el alumno deberá de acceder a la opción de registrar asistencia, en ese entonces, se generará un código Qr único el cual contendrá toda la información del alumno, podemos destacar datos como:

- Nombre completo del alumno
- Hora actual
- Clase en la cuál se encuentra
- Profesor que imparte la materia

Esto con el fin de poder tomar un registro completo de la clase a la cual se desea registrar la asistencia.

Una vez que el alumno muestre el código al profesor y este lo scannee, se obtendrá la información contenido a traves de json, archivos los cuales serán enviados a una base de datos para su posterior uso y almacenamiento.

### Tecnologías utilizadas

Durante la elaboración de este software se estan utiliando las tecnologías en sus versiones más actuales al momento, dentro de estas podemos describir algunas como lo son: JavaScript, TypeScript, Expo Go, Node.js, Supabase como SGBD.

Estas son las versiones utilizadas:

- JavaScript: v21.6.0
- TypeScript: 5.3.3
- Expo:       6.3.10
- Node.js:    v21.6.0

Si deseas consultar qué versión tienes instalado en tu computador puedes usar los siguientes comandos:

#### Versiones de tecnologías utilizadas

- **JavaScript (Node.js):**
```node -v
