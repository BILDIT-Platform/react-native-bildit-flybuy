---
sidebar_position: 3
---

## Set up and Initialize SDK

The Flybuy SDK must be initialized when the application starts in order to configure the app authorization token and handle appropriate lifecycle methods.

_Important:_ Complete all steps in the Android and iOS setup guides. Key steps are highlighted below.

1.  [Install SDK](../Setup.md#installation)
2.  Post-install Steps for [iOS](../Setup.md#ios) and [Android](../Setup.md#android)
3.  [Initialize SDK on launch](../Usage.md#initialize-sdk-on-launch)

## Live Status

The Live Status module allows you to configure and manage live status updates for your application.

### Configure Live Status

The configuration for Live Status is now handled natively in the application files. Below are the relevant code snippets for iOS and Android.

#### Params

| Name     | Type   | Example       |
| -------- | ------ | ------------- |
| iconName | String | `'icon_name'` |

#### iOS

The configuration is done in `AppDelegate.mm`:

```objective-c:development-app/ios/FlybuyExample/AppDelegate.mm
  // Optional: Enable Live Status live activity, configure it's options, & build them
  [[FlyBuyLiveStatusManagerWrapper shared] configureLiveStatusWithIconName:@"app_icon_name"];
```

#### Android

The configuration is done in `MainApplication.kt`:

```kotlin:development-app/android/app/src/main/java/com/flybuyexample/MainApplication.kt
   LiveStatusManager.getInstance().configure(this)
```

### Usage

Refer to the [Flybuy Docs](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/pickup/065-live-status?id=live-status) for a complete guide on usage of the Live Status module.