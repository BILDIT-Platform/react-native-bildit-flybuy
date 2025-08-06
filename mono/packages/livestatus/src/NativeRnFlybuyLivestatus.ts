import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  configure(
    icon: string,
    statusTintColor?: string,
    statusTintDarkModeColor?: string
  ): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnFlybuyLivestatus');
