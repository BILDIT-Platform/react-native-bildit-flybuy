import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-bildit-flybuy-livestatus' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RnFlybuyLivestatusModule = isTurboModuleEnabled
  ? require('./NativeRnFlybuyLivestatus').default
  : NativeModules.RnFlybuyLivestatus;

const RnFlybuyLivestatus = RnFlybuyLivestatusModule
  ? RnFlybuyLivestatusModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Configure LiveStatus with options.
 * @param icon - The icon name to use.
 * @param statusTintColor - The status tint color (hex string, e.g. '#A162F7').
 * @param statusTintDarkModeColor - The status tint color for dark mode (hex string, e.g. '#00E5C8').
 * @returns Promise<string>
 */
export function configure(
  icon: string,
  statusTintColor?: string,
  statusTintDarkModeColor?: string
): Promise<string> {
  return RnFlybuyLivestatus.configure(
    icon,
    statusTintColor,
    statusTintDarkModeColor
  );
}
