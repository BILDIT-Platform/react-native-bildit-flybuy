import { Platform } from 'react-native';
export const platformVersion = typeof Platform.Version === 'string' ? parseInt(Platform.Version, 10) : Platform.Version;
export function uniq(array) {
  return array.filter((item, index) => item != null && array.indexOf(item) === index);
}
//# sourceMappingURL=utils.js.map