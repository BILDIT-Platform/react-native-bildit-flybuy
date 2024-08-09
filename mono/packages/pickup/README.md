# @bildit-platform/rn-flybuy-pickup

React Native wrapper for FlyBuy Pickup SDK

## Installation

```sh
npm install @bildit-platform/rn-flybuy-pickup

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
      implementation('com.radiusnetworks.flybuy:pickup') // add this line
  }
```

Modify `MainApplication.kt`

```kotlin
import com.radiusnetworks.flybuy.sdk.ConfigOptions
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.pickup.PickupManager; // <-- add this import


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

    // Native configuration for FlyBuy Pickup
    PickupManager.getInstance()?.configure(applicationContext) // add this line
  }
}
```


### iOS


Modify `iOS/yourproject/AppDelegate.mm`

```objc

// Add this import and make sure CoreLocation import always above FlyBuy import
#import <CoreLocation/CoreLocation.h>
#import <FlyBuy/FlyBuy-Swift.h>
#import <FlyBuyPickup/FlyBuyPickup-Swift.h> // add this line

```

```objc

// below FlyBuy Core configuration
// FlyBuy Pickup native configuration
[[FlyBuyPickupManager shared] configure];
```

## Usage


```js
import * as FlyBuyPickup from '@bildit-platform/rn-flybuy-pickup';

// ...

const result = await FlyBuyPickup.onPermissionChanged();
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)


