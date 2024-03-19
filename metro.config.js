// Learn more https://docs.expo.io/guides/customizing-metro

/**
 * Archivo propio del proyecto de react-native
 * 
 * Realiza una pequeña validación donde consulta si 
 * existe una configuración previa o especifica, sino, manda 
 * llamar y configura unas caracteristicas por defecto.
 */
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

/**
 * Exportamos el modulo para que pueda establecer una configuracion 
 * customizada al momento de la instalación de la aplicacion
 */
module.exports = config;
