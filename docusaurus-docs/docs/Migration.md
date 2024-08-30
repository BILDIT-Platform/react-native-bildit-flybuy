---
sidebar_position: 2
---

# Migration to 2.20.x

Version 2.20.x and higher move to a modularized architecture where the react native modules mirror the modules in the native SDK. This allows app to pull in only the modules they need. To migrate to the new architecture, please perform the following steps.

## package.json dependencies

Remove `"react-native-bildit-flybuy"` from package.json dependencies, and include the modules that are needed as follows. Core is required. Other modules depend on the features your app is using.

```json
  "dependencies": {
    "react-native-bildit-flybuy-core": "2.20.5",
    "react-native-bildit-flybuy-livestatus": "2.20.4",
    "react-native-bildit-flybuy-notify": "2.20.4",
    "react-native-bildit-flybuy-pickup": "2.20.4",
    "react-native-bildit-flybuy-presence": "2.20.4"
  }