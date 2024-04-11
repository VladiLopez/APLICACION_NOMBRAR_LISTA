import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto'// Esto podría ser necesario para aplicaciones React Native Web

// Importar Expo SecureStore para almacenamiento seguro en la aplicación.
import * as SecureStore from 'expo-secure-store'

// Importar la función crearClient de la librería @supabase/supabase-js para crear un client de Supabase
import { createClient } from '@supabase/supabase-js'

// Adaptador para utilizar SecureStore de Expo con Supabase
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

// Obtener la URL de Supabase y la clave de autenticación anónima de las constantes de Expo
const supabaseUrl = Constants?.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants?.expoConfig?.extra?.supabaseAnonKey;

// Crear un cliente de Supabase con la URL y la clave de autenticación anónima, y configurar opciones de autenticación
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: ExpoSecureStoreAdapter as any,// Almacenamiento seguro utilizando Expo SecureStore
      autoRefreshToken: true, // Renovar automáticamente el token de acceso cuando expire
      persistSession: true, // Persistie la sesión de autenticación en almacenamiento local
      detectSessionInUrl: false,// Desactivar la detección de sesión en la URl (útil para aplicaciones móviles).
    },
  })