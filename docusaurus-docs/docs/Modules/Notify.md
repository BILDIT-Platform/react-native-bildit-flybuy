## Set up and Initialize SDK

The Flybuy SDK must be initialized when the application starts in order to configure the app authorization token and handle appropriate lifecycle methods.

_Important:_ Complete all steps in the Android and iOS [Setup guides](../Setup.md#installation).

### Module Installation

```sh
npm install @bildit-platform/react-native-flybuy-notify

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


#### iOS


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

## Create for Sites in Region

Call this method to create a notification for a list of sites in a given circular region (latitude, longitude, and radius). This will clear any previously set notifications and create a new notification for the region.

#### Params

| Name         | Type                                            | Example                                                                                                         |
| ------------ | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| region       | [`CircularRegion`](../Types/CircularRegion)     | `{ latitude: 47.6234207, longitude: -122.3300605, radius: 100 }`                                                |
| notification | [`NotificationInfo`](../Types/NotificationInfo) | `{ title: 'Test Notification', message: 'Test Notification message', data: { key1: 'value1', key2: 'value2' }}` |

#### Example

```js
import * as FlyBuyNotify from '@bildit-platform/react-native-flybuy-notify';

const region = {
  latitude: 47.6234207,
  longitude: -122.3300605,
  radius: 100,
};

const notification = {
  title: 'Test Notification',
  message: 'Test Notification message',
  data: {
    key1: 'value',
    key2: 'value',
  },
};

FlyBuyNotify.createForSitesInRegion(region, notification);
```


## Clear Notifications

Clear all geofence notifications.

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```jsx
FlyBuyNotify.clearNotifications();
```


## Create for Sites

Create geofence notification for list of sites.

#### Params

| Name         | Type                                            | Example                                                                                                       |
| ------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| notification | [`NotificationInfo`](../Types/NotificationInfo) | `{ title: 'Test Notification', message: 'Test Notification message', data: { key1: 'value', key2: 'value' }}` |
| sites        | [[`Site`](../Types/Site)]                       | `[{},...]`                                                                                                    |

#### Example

```jsx
const notification = {
  title: 'Test Notification',
  message: 'Test Notification message',
  data: {
    key1: 'value',
    key2: 'value',
  },
};

const sites = [
  {
    id: 15942,
    name: 'Test Site',
    phone: '333-333-3333',
    streetAddress: null,
    fullAddress: '500 Yale Ave N, Seattle, WA 98109, USA',
    locality: null,
    region: null,
    country: null,
    postalCode: null,
    latitude: '47.6234207',
    longitude: '-122.3300605',
    coverPhotoUrl: null,
    iconUrl: null,
    instructions: '',
    description: '',
    partnerIdentifier: '001',
  },
];

FlyBuyNotify.createForSites(sites, notification);
```


## Sync Notify Campaign Data

Notify `sync` method is provided as a development tool, in production applications it should not be called. The SDK will automatically sync data with the Flybuy portal. However the schedule used by the SDK may not be conducive to testing and development iterations.

#### Params

| Name  | Type    | Example |
| ----- | ------- | ------- |
| force | Boolean | `true`  |

#### Example

```js
FlyBuyNotify.sync(true);
```


# TODO: check all sections below

## Background Data Refresh (iOS only)

Notify Campaigns require the background fetch capability to be enabled in the target settings.
![An old rock in the desert](https://www.radiusnetworks.com/developers/flybuy/sdk-2.0/img/notify_0.png)

After that, you can follow this steps:

1. Modify your `AppDelegate.h`

  ```objc
  #import <React/RCTBridgeDelegate.h>
  #import <UIKit/UIKit.h>
  #import <UserNotifications/UserNotifications.h> // <-- add this

  // Add UNUserNotificationCenterDelegate
  @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

  .... 

  @end
  ```

2. Modify your `AppDelegate.m`

  ```objc

    #import "AppDelegate.h"

    ... other imports
    #import <react-native-bildit-flybuy/Flybuy-Bridging-Header.h> // <-- add this line

      - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
      {
        ...
        RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
        RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                        moduleName:@"FlybuyExample"
                                                  initialProperties:nil];
        
        // ------ Add this block
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        center.delegate = self;
        // ------
        
        ...
        return YES;
      }

      // ----- Add this block
      - (void)application:(UIApplication *)application
      performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
        [[Flybuy shared] performFetchWithCompletionHandler:completionHandler];
      }
      // ------
  ```


## Handle Notification Response

### Configuration

#### iOS

  Modify your `AppDelegate.m` 

  Please make sure to import `#import <react-native-bildit-flybuy/Flybuy-Bridging-Header.h>` and make this changes.

  ```objc
    - (void)userNotificationCenter:(UNUserNotificationCenter *)center
      didReceiveNotificationResponse:(UNNotificationResponse *)response
              withCompletionHandler:(void (^)(void))completionHandler {
        [[Flybuy shared] handleNotificationResponse:response];
      }

    // Enables app to receive notifications while in the foreground
    - (void)userNotificationCenter:(UNUserNotificationCenter *)center
          willPresentNotification:(UNNotification *)notification
            withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
      completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
    }

  ```

:::info

Please make sure to request notification permission on your app to properly receive any local notification from FlyBuy.

:::

#### Android

  No changes needed.

### Usage

Set up event listeners to get updates about notification metadata.

```jsx
React.useEffect(() => {
  const notifyEventListener = FlyBuy.eventEmitter.addListener(
    'notifyEvents',
    (event) => {
      console.log('notify event', event);
    }
  );

  return () => {
    notifyEventListener.remove();
  };
}, []);
```

