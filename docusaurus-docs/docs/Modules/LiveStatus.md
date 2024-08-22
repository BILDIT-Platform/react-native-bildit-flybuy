---
sidebar_position: 3
---

The Live Status module allows you to configure and manage live status updates for your application.

## Set up and Initialize SDK

The Flybuy SDK must be initialized when the application starts in order to configure the app authorization token and handle appropriate lifecycle methods.

_Important:_ Complete all steps in the Android and iOS [Setup guides](../Setup.md#installation).

### Module Installation

```sh
npm install react-native-bildit-flybuy-livestatus

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


#### iOS


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


### Usage

Refer to the [Flybuy Docs](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/pickup/065-live-status?id=live-status) for a complete guide on usage of the Live Status module.