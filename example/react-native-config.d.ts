declare module 'react-native-config' {
  export interface NativeConfig {
    ANDROID_APP_TOKEN?: string;
    IOS_APP_TOKEN?: string;
    PRESENCE_UUID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
