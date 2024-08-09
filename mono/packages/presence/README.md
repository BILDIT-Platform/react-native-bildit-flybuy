# @bildit-platform/rn-flybuy-presence

React Native wrapper for FlyBuy Presence SDK

## Installation

```sh
npm install @bildit-platform/rn-flybuy-presence

cd ios && pod install
```

## Configuration

Please make sure to install `@bildit-platform/rn-flybuy-core` and follow the configuration.


## Native Initialization

### Android

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


### iOS


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

## Usage


```js
import * as FlyBuyPresence from '@bildit-platform/rn-flybuy-presence';

// ...

const result = await FlyBuyPresence.startLocatorWithIdentifier("12345678", "{'key':'value'}");
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)


