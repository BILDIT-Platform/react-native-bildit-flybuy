---
sidebar_position: 2
---

# Setup

## Installation

You can install the React Native Flybuy SDK with npm or yarn, as follows:

```bash npm2yarn
npm install --save react-native-bildit-flybuy

# RN >= 0.60

cd ios && pod install

# RN < 0.60

react-native link react-native-bildit-flybuy
```

## Post-install Steps

### iOS

#### Setting Permissions

Refer to the [Flybuy Documentation on configuring permissions](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/ios?id=setting-permissions) on iOS.

### Android

#### Google API Keys

Refer to [Flybuy Documentation on setting Google API Keys](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/android?id=google-api-keys).

#### Permissions

Refer to [Flybuy Documentation for permission requirements](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/android?id=setting-permissions) on Android.

#### Requesting location permissions at runtime

The following code snipper provides an example of requesting location permissions at runtime.

```js
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

const getLocationPermissions = async () => {
  const granted = await requestMultiple(
    Platform.select({
      android: [
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ],
      ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
    }),
    {
      title: 'ExampleApp',
      message: 'ExampleApp would like access to your location ',
    }
  );
  return granted === RESULTS.GRANTED;
};

React.useEffect(() => {
  getLocationPermissions();
}, []);
```

:::info

Whenever the location permission changes (accepted or declined), make sure to call:

```js
// If using pickup module

FlyBuy.Pickup.onPermissionChanged();

// If using notify module

FlyBuy.Notify.onPermissionChanged();
```

:::
