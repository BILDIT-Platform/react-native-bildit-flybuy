const path = require('path');

/**
 * React Native config.
 * - Points codegen to react-native-bildit-flybuy-* packages so RNRnFlybuy*Spec.h
 *   are generated during pod install. Without this, codegen may not discover
 *   the packages and the iOS build fails with missing spec headers.
 * - Excludes react-native-config from Android autolinking to avoid New Architecture
 *   CMake error (missing codegen JNI directory). The library is linked manually in
 *   settings.gradle and app/build.gradle.
 * @see https://github.com/lugg/react-native-config/issues/843
 */
module.exports = {
  dependencies: {
    'react-native-bildit-flybuy-core': {
      root: path.join(__dirname, 'node_modules', 'react-native-bildit-flybuy-core'),
    },
    'react-native-bildit-flybuy-livestatus': {
      root: path.join(__dirname, 'node_modules', 'react-native-bildit-flybuy-livestatus'),
    },
    'react-native-bildit-flybuy-notify': {
      root: path.join(__dirname, 'node_modules', 'react-native-bildit-flybuy-notify'),
    },
    'react-native-bildit-flybuy-pickup': {
      root: path.join(__dirname, 'node_modules', 'react-native-bildit-flybuy-pickup'),
    },
    'react-native-bildit-flybuy-presence': {
      root: path.join(__dirname, 'node_modules', 'react-native-bildit-flybuy-presence'),
    },
  },
};
