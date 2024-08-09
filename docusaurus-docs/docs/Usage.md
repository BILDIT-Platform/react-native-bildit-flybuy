---
sidebar_position: 2
---

# Usage

## Initialize Flybuy on Native Code

### Android

Modify `android/app/build.gradle`

```gradle
  dependencies {
      // .. other dependencies

      // Add below dependencies
      implementation platform("com.radiusnetworks.flybuy:bom:$flybuyVersion")
      implementation('com.radiusnetworks.flybuy:core')
  }
```

Modify `MainApplication.kt`

```kotlin
import com.radiusnetworks.flybuy.sdk.ConfigOptions
import com.radiusnetworks.flybuy.sdk.FlyBuyCore


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
  }
}
```

### iOS


Modify `iOS/yourproject/AppDelegate.mm`

```objc

// Add this import and make sure CoreLocation import always above FlyBuy import
#import <CoreLocation/CoreLocation.h>
#import <FlyBuy/FlyBuy-Swift.h>

```

```objc

// Load environment variables & initialize FlyBuy
NSString *appToken = @"YourFlyBuyToken";
// FlyBuy core configuration, always place this above all other FlyBuy configure
FlyBuyConfigOptionsBuilder *builder = [FlyBuyConfigOptions BuilderWithToken:appToken];
FlyBuyConfigOptions *configOptions = [builder build];
[FlyBuyCore configureWithOptions:configOptions];
```


If you don’t already have an APP token please contact your Flybuy Account Executive to get set up.

## Feature Modules

After initial setup, refer to the appropriate module guide for details on using Flybuy:

- [Pickup Module](Modules/Pickup.md)
- [Presence Module](Modules/Presence.md)
- [Notify Module](Modules/Notify.md)
