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
