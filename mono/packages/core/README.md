# @bildit-platform/rn-flybuy-core

React Native wrapper for FlyBuy Core SDK

## Installation

```sh
npm install @bildit-platform/rn-flybuy-core

cd ios && pod install
```

## Configuration

### Android

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

### iOS

No specific configuration for iOS


## Native Initialization

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



## Usage


```js
import * as FlyBuyCore from '@bildit-platform/rn-flybuy-core';

// ...

const result = await FlyBuyCore.login('username@gmail.com', 'password');
```

## Migration from version 2.x to 3.0

Version 2.x

```js
  import FlyBuy from 'react-native-bildit-flybuy';

  FlyBuy.Core.Orders.fetchOrders()
      .then(orders => console.tron.log('orders', orders))
      .catch(err => console.tron.log(err));
```

Version 3.0

```js
  import * as FlyBuyCore from '@bildit-platform/rn-flybuy-core';

  FlyBuyCore.fetchOrders()
      .then(orders => console.tron.log('orders', orders))
      .catch(err => console.tron.log(err));
```


## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)


