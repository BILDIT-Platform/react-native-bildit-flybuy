## Set up and Initialize SDK

The Flybuy SDK must be initialized when the application starts in order to configure the app authorization token and handle appropriate lifecycle methods.

_Important:_ Complete all steps in the Android and iOS setup guides. Key steps are highlighted below.

1.  [Install SDK](../Setup.md#installation)
2.  Post-install Steps for [iOS](../Setup.md#ios) and [Android](../Setup.md#android)
3.  [Initialize SDK on launch](../Usage.md#initialize-sdk-on-launch)

## Create for Sites in Region

Call this method to create a notification for a list of sites in a given circular region (latitude, longitude, and radius). This will clear any previously set notifications and create a new notification for the region.

#### Params

| Name         | Type                                            | Example                                                                                                         |
| ------------ | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| region       | [`CircularRegion`](../Types/CircularRegion)     | `{ latitude: 47.6234207, longitude: -122.3300605, radius: 100 }`                                                |
| notification | [`NotificationInfo`](../Types/NotificationInfo) | `{ title: 'Test Notification', message: 'Test Notification message', data: { key1: 'value1', key2: 'value2' }}` |

#### Example

```js
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

FlyBuy.Notify.createForSitesInRegion(region, notification);
```

**[Flybuy Create for Sites in Region Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=create-for-sites-in-region)**

## Clear Notifications

Clear all geofence notifications.

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```jsx
FlyBuy.Notify.clearNotifications();
```

**[Flybuy Clear Notifications Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=clear-notifications)**

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

FlyBuy.Notify.createForSites(sites, notification);
```

**[Flybuy Create for Sites Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=additional-methods)**

## Sync Notify Campaign Data

Notify `sync` method is provided as a development tool, in production applications it should not be called. The SDK will automatically sync data with the Flybuy portal. However the schedule used by the SDK may not be conducive to testing and development iterations.

#### Params

| Name  | Type    | Example |
| ----- | ------- | ------- |
| force | Boolean | `true`  |

#### Example

```js
FlyBuy.Notify.sync(true);
```

**[Flybuy Sync Notify Campaign Data Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=sync-notify-campaign-data)**

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

**[Flybuy Background Data Refresh Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=background-data-refresh)**

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

**[Flybuy Handle Notification Response](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=handle-notification-response)**
