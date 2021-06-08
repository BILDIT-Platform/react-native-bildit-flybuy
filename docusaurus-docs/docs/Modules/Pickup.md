---
sidebar_position: 1
---

## Initialize SDK

The Flybuy SDK must be initialized when the application starts in order to configure the app authorization token, Refer to the [Usage](../Usage) guide for details on initializing the SDK.

#### Configuration

Configure Pickup Module using:

```js
import FlyBuy from 'react-native-bildit-flybuy';

FlyBuy.Pickup.configure();
```

## Location Permissions

Flybuy uses location services on mobile devices to send updates and provide accurate ETAs to the merchant site. the app must ask for location permissions from the user. Refer to the Setting Permissions section of the setup guides for [iOS](../Setup#enable-background-modes) and [Android](../Setup#setting-permissions) for details. If the app already asks for location permissions for other purposes, this may not be necessary. If the user does not provide permission, the SDK provides methods for updating the customer state manually, refer to [`updateOrderState`](../Components/Orders#update-order-state)

#### For Order Creation Flow and Customer Management, please refer to [FlyBuy Docs](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/pickup)
