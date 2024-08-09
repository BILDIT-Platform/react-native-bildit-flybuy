# @bildit-platform/rn-flybuy-livestatus

React Native wrapper for FlyBuy LiveStatus SDK

## Installation

```sh
npm install @bildit-platform/rn-flybuy-livestatus

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
      implementation('com.radiusnetworks.flybuy:live-status') // add this line
  }
```

Modify `MainApplication.kt`

```kotlin
import com.radiusnetworks.flybuy.sdk.ConfigOptions
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.livestatus.LiveStatusManager // <-- add this import


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

    // Native Configuration for FlyBuy LiveStatus
    LiveStatusManager.getInstance().configure(applicationContext)
  }
}
```


### iOS


Modify `iOS/yourproject/AppDelegate.mm`

```objc

// Add this import and make sure CoreLocation import always above FlyBuy import
#import <CoreLocation/CoreLocation.h>
#import <FlyBuy/FlyBuy-Swift.h>
#import <FlyBuyLiveStatus/FlyBuyLiveStatus-Swift.h> // add this line

```

```objc

// below FlyBuy Core configuration
// FlyBuy LiveStatus native configuration
FlyBuyLiveStatusOptions *options = [[[FlyBuyLiveStatusOptions.Builder init] setIconName:@"AppIcon"] build];
if (@available(iOS 16.2, *)) {
    [[FlyBuyLiveStatusManager shared] configureWithOptions:options];
} else {
    // Fallback on earlier versions
  NSLog(@"LiveStatus is not available in this iOS version");
}
```

## Usage

This is not needed if the configuration added in native code.

```js
import * as FlyBuyLiveStatus from '@bildit-platform/rn-flybuy-livestatus';

// ...

const result = await FlyBuyLiveStatus.configure("icon name");
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)


