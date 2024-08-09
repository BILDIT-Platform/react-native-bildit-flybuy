---
sidebar_position: 2
---

## Set up and Initialize SDK

The Flybuy SDK must be initialized when the application starts in order to configure the app authorization token and handle appropriate lifecycle methods.

_Important:_ Complete all steps in the Android and iOS [Setup guides](../Setup.md#installation).

### Module Installation

```sh
npm install @bildit-platform/react-native-flybuy-presence

cd ios && pod install
```

### Native Initialization

#### Android

Modify `android/app/build.gradle`

```gradle
  dependencies {
      // .. other dependencies

      // Add below dependencies
      implementation platform("com.radiusnetworks.flybuy:bom:$flybuyVersion")
      implementation('com.radiusnetworks.flybuy:core')
      implementation('com.radiusnetworks.flybuy:presence') // add this line
  }
```

Modify `MainApplication.kt`

```kotlin
import com.radiusnetworks.flybuy.sdk.ConfigOptions
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.presence.PresenceManager // <-- add this import
import java.util.UUID // <-- add this import


class MainApplication : Application(), ReactApplication {
  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }

    // Native configure
    val configOptions = ConfigOptions.Builder("YourFlyBuyToken")
      .build()
    FlyBuyCore.configure(this, configOptions)

    // Native configuration for FlyBuy Presence
    val uid = UUID.fromString(BuildConfig.PRESENCE_UUID)
    PresenceManager.getInstance().configure(applicationContext, uid)
  }
}
```


#### iOS


Modify `iOS/yourproject/AppDelegate.mm`

```objc

// Add this import and make sure CoreLocation import always above FlyBuy import
#import <CoreLocation/CoreLocation.h>
#import <FlyBuy/FlyBuy-Swift.h>
#import <FlyBuyPresence/FlyBuyPresence-Swift.h> // add this line

```

```objc

// below FlyBuy Core configuration
// FlyBuy Presence native configuration
NSString *presenceUuid = [RNCConfig envFor:@"PRESENCE_UUID"];
NSUUID *uuid = [[NSUUID alloc] initWithUUIDString:presenceUuid];
[[FlyBuyPresenceManager shared] configureWithPresenceUUID:uuid];
```

## Bluetooth Permissions

Flybuy Presence uses Bluetooth on the mobile device to send locate and send order information to the store. iOS requires additional permissions for this. Refer to the Setting Permissions section of the setup guides for [iOS](../Setup#enable-background-modes) for details. If the app already asks for Bluetooth permissions for other purposes, this may not be necessary.

## Start a Locator

Create and start a Presence Locator. A Presence Locator is a Bluetooth advertisement that can transmit information to the Flybuy Gateway from a mobile device in a specific spot.

#### Params

| Name       | Type | Example             |
| ---------- | ---- | ------------------- |
| presenceId | Str  | `'12345678'`        |
| payload    | Str  | `"{'key':'value'}"` |

#### Example

```jsx
import * as FlyBuyPresence from '@bildit-platform/react-native-flybuy-presence';

FlyBuyPresence.startLocatorWithIdentifier('12345678', "{'key':'value'}");
```


## Stop a Locator

Stop the Presence Locator when the transaction is complete.

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```jsx
FlyBuyPresence.stopLocator();
```


## Android Service Notification

When there is an active locator, the Flybuy SDK runs a foreground service for broadcasting the locator. Foreground services on Android require a notification while it is running, To override the default values of notification title, content, and icon, please refer to [Android Service Notification](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/presence?id=android-service-notification) Docs.

![Notification example](/img/notification.png)
