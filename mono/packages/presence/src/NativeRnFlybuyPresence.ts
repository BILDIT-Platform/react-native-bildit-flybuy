import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  startLocatorWithIdentifier(id: string, payload: string): Promise<string>;
  stopLocator(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnFlybuyPresence');
