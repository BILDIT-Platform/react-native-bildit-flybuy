import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

/**
 * NativeModule spec uses only inline types so React Native codegen can parse it.
 * Public API types remain in ./types and react-native-bildit-flybuy-core.
 */
export interface Spec extends TurboModule {
  configure(bgTaskIdentifier?: string): Promise<void>;
  clearNotifications(): Promise<void>;
  createForSitesInRegion(
    region: { latitude: number; longitude: number; radius: number },
    notification: { title: string; message: string; data: Object }
  ): Promise<Object[]>;
  sync(force: boolean): Promise<void>;
  onPermissionChanged(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnFlybuyNotify');
