## Initialize SDK

The Flybuy SDK must be initialized when the application starts in order to configure the app authorization token, Refer to the [Usage](../Usage) guide for details on initializing the SDK.

#### Configuration

Configure Notify Module using:

```js
import FlyBuy from 'react-native-bildit-flybuy';

FlyBuy.Notify.configure();
```

## Create for Sites in Region

Call this method to create a notification for a list of sites in a given circular region (latitude, longitude, and radius). This will clear any previously set notifications and create a new notification for the region.

#### Params

| Name         | Type              | Example                                                                                                         |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| region       | ICircularRegion   | `{ latitude: 47.6234207, longitude: -122.3300605, radius: 100 }`                                                |
| notification | INotificationInfo | `{ title: 'Test Notification', message: 'Test Notification message', data: { key1: 'value1', key2: 'value2' }}` |

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

Flybuy.Notify.createForSitesInRegion(region, notification);
```

**[FlyBuy Create for Sites in Region Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=create-for-sites-in-region)**

## Clear Notifications

Clear all geofence notifications.

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```jsx
Flybuy.Notify.clearNotifications();
```

**[FlyBuy Clear Notifications Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=clear-notifications)**

## Create for Sites

Create geofence notification for list of sites.

#### Params

| Name         | Type              | Example                                                                                                       |
| ------------ | ----------------- | ------------------------------------------------------------------------------------------------------------- |
| notification | INotificationInfo | `{ title: 'Test Notification', message: 'Test Notification message', data: { key1: 'value', key2: 'value' }}` |
| sites        | [ISite]           | `[{},...]`                                                                                                    |

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

Flybuy.Notify.createForSites(sites, notification);
```

**[FlyBuy Create for Sites Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify?id=additional-methods)**
