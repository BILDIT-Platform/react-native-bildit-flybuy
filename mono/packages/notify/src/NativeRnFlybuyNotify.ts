import type { ICircularRegion, ISite } from '@bildit-platform/rn-flybuy-core';
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { INotificationInfo } from './types';

export interface Spec extends TurboModule {
  configure(bgTaskIdentifier?: string): Promise<void>;
clearNotifications(): Promise<void>;
createForSitesInRegion(region: ICircularRegion, notification: INotificationInfo): Promise<ISite[]>
sync(force: boolean): Promise<void>
onPermissionChanged(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnFlybuyNotify');
