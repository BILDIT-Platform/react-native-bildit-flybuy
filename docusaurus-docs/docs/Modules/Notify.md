## Initialize SDK

## Create for Sites in Region

```jsx
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
      }

    Flybuy.Notify.createForSitesInRegion(region, notification)
```

## Clear Notifications

```jsx
Flybuy.Notify.clearNotifications()
```

## Create for Sites

```jsx
const notification = {
      title: 'Test Notification',
      message: 'Test Notification message',
      data: {
        key1: 'value',
        key2: 'value',
      },
    };

const sites: ISite[] = [
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

Flybuy.Notify.createForSites(sites, notification)
```