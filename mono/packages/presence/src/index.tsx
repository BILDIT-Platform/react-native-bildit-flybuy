import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@bildit-platform/rn-flybuy-presence' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RnFlybuyPresenceModule = isTurboModuleEnabled
  ? require('./NativeRnFlybuyPresence').default
  : NativeModules.RnFlybuyPresence;

const RnFlybuyPresence = RnFlybuyPresenceModule
  ? RnFlybuyPresenceModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function startLocatorWithIdentifier(
  id: string,
  payload: string
): Promise<string> {
  return RnFlybuyPresence.startLocatorWithIdentifier(id, payload);
}

export function stopLocator(): Promise<string> {
  return RnFlybuyPresence.stopLocator();
}
