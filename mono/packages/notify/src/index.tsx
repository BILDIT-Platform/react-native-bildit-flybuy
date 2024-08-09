import { NativeModules, Platform } from 'react-native';
import type { INotificationInfo } from './types';
import type { ICircularRegion, ISite } from '@bildit-platform/rn-flybuy-core';

const LINKING_ERROR =
  `The package '@bildit-platform/rn-flybuy-notify' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RnFlybuyNotifyModule = isTurboModuleEnabled
  ? require('./NativeRnFlybuyNotify').default
  : NativeModules.RnFlybuyNotify;

const RnFlybuyNotify = RnFlybuyNotifyModule
  ? RnFlybuyNotifyModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function configure(bgTaskIdentifier?: string): Promise<void> {
  return RnFlybuyNotify.configure(bgTaskIdentifier)
}

export function clearNotifications(): Promise<void> {
  return RnFlybuyNotify.clearNotifications();
}

export function createForSitesInRegion(region: ICircularRegion, notification: INotificationInfo): Promise<ISite[]> {
  return RnFlybuyNotify.createForSitesInRegion(region, notification)
}

export function sync(force: boolean): Promise<void> {
  return RnFlybuyNotify.sync(force)
}

export function onPermissionChanged(): void {
  return RnFlybuyNotify.onPermissionChanged()
}
