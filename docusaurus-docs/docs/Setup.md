---
sidebar_position: 2
---

# Setup

## Installation

You can install the React Native FlyBuy SDK with npm or yarn, as follows:

```bash npm2yarn
npm install --save react-native-bildit-flybuy

# RN >= 0.60

cd ios && pod install

# RN < 0.60

react-native link react-native-bildit-flybuy
```

## Post-install Steps

### iOS

In order to use the SDK your app will need to request the proper permissions.

#### Enable Background Modes

Under the “General” tab for your iOS target, select Capabilities and scroll down to Background Modes.

For Pickup, enable Background Modes and select `Location updates`, `Background fetch`, and `Remote notifications`.

For Presence, enable Background Modes and select `Acts as a Bluetooth LE Accessory`.

<img src='/img/quickstart_background_modes.png' />

#### Permission Descriptions

Flybuy Pickup uses mobile sensor data to identify the location of a customer. Flybuy Presence also requires Bluetooth permissions.

The Pickup module requires Location services permissions to properly function. Specifically, the SDK supports Always permission, but only needs the When in Use permission.

If you are already asking users for the required permissions, you should review the usage description. The usage description explains why the application requires Always authorization.

If you currently do not ask users for the required permissions, you should add a usage description to your app. Usage descriptions are set in the `Info.plist` file.

| Name                                           | Suggested Description                                  |
| ---------------------------------------------- | ------------------------------------------------------ |
| `NSLocationAlwaysAndWhenInUseUsageDescription` | To accurately locate you for order delivery            |
| `NSLocationWhenInUseUsageDescription`          | To accurately locate you for order delivery            |
| `NSBluetoothAlwaysUsageDescription`            | To communicate via Bluetooth for an order at the store |
| `NSBluetoothPeripheralUsageDescription`        | To communicate via Bluetooth for an order at the store |

### Android

#### Google API Keys

The SDK needs a Google API key for access to location APIs. If you have not already, go to your Google API Console and create an Android API key. Then, enable the Maps SDK for Android.

Add the following to your `AndroidManifest.xml` with the API key you generated above.

```xml
<application>
    <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="<INSERT_API_KEY>"/>
</application>
```

#### Setting Permissions

Flybuy uses mobile sensor data to identify the location of a customer. The Flybuy SDK requires `ACCESS_FINE_LOCATION` and `ACCESS_BACKGROUND_LOCATION` permissions to properly function correctly. The app must request the permission at runtime.

#### Adding permissions to `AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

## Requesting permissions at runtime

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
FlyBuy.Pickup.onLocationPermissionChanged();
```

:::
