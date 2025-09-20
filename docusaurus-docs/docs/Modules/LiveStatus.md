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


### Additional Notes

#### iOS

- Make sure that your iOS project target iOS 17 and above
- Add this section in your project Podfile

  ```ruby
    post_install do |installer|
      # https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202
      react_native_post_install(
        installer,
        config[:reactNativePath],
        :mac_catalyst_enabled => false,
        # :ccache_enabled => true
      )
  
      # Set Swift version for all pods <<< Add this section to fix Swift build issue in XCode 26 >>>
      installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings['SWIFT_VERSION'] = '5.0'
          config.build_settings['SWIFT_USE_TOOLCHAIN_VERSION'] = 'NO'
          # Set deployment target for all pods to match the app target
          config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '17.0'
          # Force the SDK to use the same Swift version
          if config.build_settings['SWIFT_VERSION']
            config.build_settings['SWIFT_TOOLCHAIN_FLAGS'] = '-use-ld=lld'
          end
        end
      end
    end

  ```

- Add FlyBuy.xcframework and FlyBuyLiveStatus.xcframework on your widget Framework and Library section in xcode

- On the widget `xxBundle` file, please import `FlyBuy` and `FlyBuyLiveStatus`

  ```swift
    import WidgetKit
    import SwiftUI
    import FlyBuy
    import FlyBuyLiveStatus

    @main
    struct FBLiveStatusBundle: WidgetBundle {
        var body: some Widget {
            FlyBuyWidget()
        }
    }
  ```

