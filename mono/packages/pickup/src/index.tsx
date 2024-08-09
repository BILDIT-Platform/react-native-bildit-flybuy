import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@bildit-platform/rn-flybuy-pickup' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RnFlybuyPickupModule = isTurboModuleEnabled
  ? require('./NativeRnFlybuyPickup').default
  : NativeModules.RnFlybuyPickup;

const RnFlybuyPickup = RnFlybuyPickupModule
  ? RnFlybuyPickupModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function onPermissionChanged(): Promise<void> {
  return RnFlybuyPickup.onPermissionChanged();
}
