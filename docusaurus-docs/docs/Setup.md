---
sidebar_position: 2
---

# Setup

## Installation

You can install the React Native Flybuy SDK with npm or yarn, as follows:

```bash npm2yarn
npm install --save react-native-bildit-flybuy-core

# RN >= 0.60

cd ios && pod install

# RN < 0.60

react-native link react-native-bildit-flybuy-core
```

## Post-install Steps

### iOS

#### Setting Permissions

Refer to the [Flybuy Documentation on configuring permissions](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/ios?id=setting-permissions) on iOS.

#### Fix Development Build

By default, you don't have to modify the Podfile to run this library. If you have issue with dynamic framework, you can include the library as static framework by adding this code in Podfile.

```
  $static_framework += [
    # adjust the packages that you used in your project.
    'bildit-platform-rn-flybuy-core',
    'bildit-platform-rn-flybuy-pickup'
  ]
```

#### Fix Release Build

If you have trouble running the app in Release mode with error `Undefined symbol: _OBJC_CLASS_$_Flybuy`, you can fix it by changing your project `Build Settings` and set `Build Active Architecture Only` to `Yes`.

![XCode change](https://user-images.githubusercontent.com/2896774/144399782-46089446-0441-46e8-aa49-3865374bf2cf.png)

### Android

#### Gradle 

1. Modify `android/build.gradle`

  ```
    buildscript {
      ext {
          buildToolsVersion = "34.0.0"
          minSdkVersion = 26 // <-- the minimum supported SDK for the latest FlyBuy SDK
          compileSdkVersion = 34
          targetSdkVersion = 34
          ndkVersion = "26.1.10909125"
          kotlinVersion = "1.9.22"
          flybuyVersion = "2.12.1" // <-- add this line
      }
    }

  ```

  Note: Modify `flybuyVersion` with your desired SDK version, the default value is `2.12.1`

2. Modify `android/app/build.gradle`

  ```
      {
        android {
          defaultConfig {
            applicationId "your.package.name"
            minSdkVersion rootProject.ext.minSdkVersion
            targetSdkVersion rootProject.ext.targetSdkVersion
            versionCode 1
            versionName "1.0"

            missingDimensionStrategy "flybuy", "default" // <-- add this line
          }
        }
      }
  ```


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
import * as FlyBuyPickup from 'react-native-bildit-flybuy-pickup'

FlyBuyPickup.onPermissionChanged();

// If using notify module
import * as FlyBuyNotify from 'react-native-bildit-flybuy-notify'

FlyBuyNotify.onPermissionChanged();
```

:::
