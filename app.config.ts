/**
 * Importamos los modulos y las librerías necesarias para desplegar los elementos visuales,
 * así mismo, importamos las credenciales
 * de los archivos .env
 */
import {ExpoConfig, ConfigContext } from 'expo/config'
import * as dotenv from 'dotenv'

// Cargamos las variables de entorno desde el archivo .env
dotenv.config()

/**
 * Configuración de la aplicación Expo.
 * 
 * Este archivo configura la aplicación Expo, incluyendo el nombre, slug y variables de entorno.
 * Se utiliza para definir la configuración de la aplicación y cargar variables de entorno desde un archivo .env.
 * 
 * @param {Object} config Contexto de configuracion de la aplicación
 * @returns {Object} Configuración de la aplicación Expo. 
 */
export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        // Se utiliza la configuración existente
        ...config,
        // Define el slug y nombre de la aplicación
        slug: 'CheckInClass',
        name: 'CheckInClass',
        // Define variables adicionales para la aplicación, como la URL y la clave de acceso a Supabase
        extra: {
            ...config.extra,
            supabaseUrl: process.env.Project_URL,
            supabaseAnonKey: process.env.Project_KEY
        }
    }
}