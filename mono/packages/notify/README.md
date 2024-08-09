# @bildit-platform/rn-flybuy-notify

React Native wrapper for FlyBuy Notify SDK

## Installation

```sh
npm install @bildit-platform/rn-flybuy-notify

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
      implementation('com.radiusnetworks.flybuy:notify') // add this line
  }
```

Modify `MainApplication.kt`

```kotlin
import com.radiusnetworks.flybuy.sdk.ConfigOptions
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.notify.NotifyManager // <-- add this import


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

   // Native configuration for FlyBuy Notify
    NotifyManager.getInstance().configure(applicationContext) // add this line
  }
}
```


### iOS


Modify `iOS/yourproject/AppDelegate.mm`

```objc

// Add this import and make sure CoreLocation import always above FlyBuy import
#import <CoreLocation/CoreLocation.h>
#import <FlyBuy/FlyBuy-Swift.h>
#import <FlyBuyNotify/FlyBuyNotify-Swift.h> // add this line

```

```objc

// below FlyBuy Core configuration
// Notify native configure
[[FlyBuyNotifyManager shared] configureWithBgTaskIdentifier:@"notifyBgTaskId" bgSyncCallback:^(NSError *error) {
    if (error == nil) {
      NSLog(@"Notify campaign content updated via a background task");
    } else {
      NSLog(@"Notify Background Sync Error: %@", error.description);
    }
  }];
```

## Usage


```js
import * as FlyBuyNotify from '@bildit-platform/rn-flybuy-notify';

// ...

FlyBuyNotify.clearNotifications()
      .then(() => console.log('notifications cleared'))
      .catch(err => console.log('err', err));
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
