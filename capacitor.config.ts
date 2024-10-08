import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.abugaber.dpcimcp',
  appName: 'imcp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      ios: {
        presentationStyle: 'popover', // Esto controla cómo se presenta el picker en iOS
        permissions: {
          camera: 'Esta aplicación necesita acceso a la cámara para tomar fotos.' // Mensaje de permiso
        }
      }
    }
  }
};

export default config;
