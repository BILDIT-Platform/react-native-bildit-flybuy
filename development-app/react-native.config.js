const path = require('path');

/**
 * Point codegen to mono packages so RNRnFlybuy*Spec.h are generated during pod install.
 * Without this, "file:" deps are not always discovered and RNRnFlybuyCoreSpec.h is missing.
 */
module.exports = {
  dependencies: {
    'react-native-bildit-flybuy-core': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'core'),
    },
    'react-native-bildit-flybuy-livestatus': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'livestatus'),
    },
    'react-native-bildit-flybuy-notify': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'notify'),
    },
    'react-native-bildit-flybuy-pickup': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'pickup'),
    },
    'react-native-bildit-flybuy-presence': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'presence'),
    },
  },
};
