// Importación de componentes y librerías necesarias desde React Native
import { registerRootComponent } from 'expo';

// Importamos el modulo de ./App
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
