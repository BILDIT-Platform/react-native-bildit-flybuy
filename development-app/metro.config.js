const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');
const corePackagePath = path.join(monorepoRoot, 'mono', 'packages', 'core');

const config = {
  watchFolders: [corePackagePath],
  resolver: {
    extraNodeModules: {
      'react-native-bildit-flybuy-core': corePackagePath,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
