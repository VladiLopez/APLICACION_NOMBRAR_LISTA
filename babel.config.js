/**
 * Configuración de Babel para un proyecto de Expo
 * 
 * Este archuivo configura Babel para ser utilizado en un proyecto de Expo
 * Se utiliza para definir los presets y plugins que se aplicaran durante la compilación del código.
 * La cache se habilita para mejorar el rendimiento de la compilación
 * 
 * @param {Object} api Objecto de configuración de Babel
 * @returns {Object} Configuración de Babel.
 */
module.exports = function(api) {
  // Habilita la cache para mejorar el rendimiento de la compilación
  api.cache(true);

  // devuelve la configuración de Babel
  return {
    // Presets que se aplicará durante la compilación del código
    presets: ['babel-preset-expo'],
    // Plugins adicionales que se aplicarán durante la compilación del código
    plugins: ['react-native-reanimated/plugin'],
  };
};
