import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.abugaber.dpcimcp',
  appName: 'imcp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
