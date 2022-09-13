---
sidebar_position: 3
---

# Site Object Type

`Site` object type provides details for a particular site.

## Type

```ts
{
  id: number;
  name?: string;
  phone?: string;
  streetAddress?: string | null;
  fullAddress?: string | null;
  locality?: string | null;
  region?: string | null;
  country?: string | null;
  postalCode?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  coverPhotoUrl?: string | null;
  iconUrl?: string | null;
  instructions?: string | null;
  description?: string | null;
  partnerIdentifier?: string | null;
  pickupConfig?: PickupConfig | null;
}
```

## Example

```js
{
  "id": 15942,
  "name": 'Test Site',
  "phone": '333-333-3333',
  "streetAddress": null,
  "fullAddress": '500 Yale Ave N, Seattle, WA 98109, USA',
  "locality": null,
  "region": null,
  "country": null,
  "postalCode": null,
  "latitude": '47.6234207',
  "longitude": '-122.3300605',
  "coverPhotoUrl": null,
  "iconUrl": null,
  "instructions": '',
  "description": '',
  "partnerIdentifier": '001',
  "pickupConfig": {
      "accentColor": "#f5538b",
      "pickupTypeSelectionEnabled": false,
      "privacyPolicyURL": "null",
      "askToAskImageURL": "null",
      "id": 23436,
      "customerNameEditingEnabled": true,
      "type": "pickup_config",
      "termsOfServiceURL": "null",
      "availablePickupTypes": [
        {
          "pickupType": "curbside",
          "requireVehicleInfo": false,
          "showVehicleInfoFields": true,
          "pickupTypeLocalizedString": "Curbside"
        },
        {
          "requireVehicleInfo": false,
          "pickupType": "pickup",
          "showVehicleInfoFields": false,
          "pickupTypeLocalizedString": "Pickup"
        },
        {
          "pickupType": "dine_in",
          "requireVehicleInfo": false,
          "pickupTypeLocalizedString": "Dine-In",
          "showVehicleInfoFields": false
        },
        {
          "pickupType": "drive_thru",
          "requireVehicleInfo": false,
          "showVehicleInfoFields": false,
          "pickupTypeLocalizedString": "Drive-Thru"
        }
      ],
      "accentTextColor": "#ffffff"
    },
}
```

## Used by

- [`createForSites`](../../Modules/Notify#create-for-sites)
