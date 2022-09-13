---
sidebar_position: 1
---

# PickupTypeConfig Object Type

`PickupTypeConfig` object is used to define the pickup type configs for an order or site.

## Type

```ts
{
  pickupType: string;
  pickupTypeLocalizedString: string;
  requireVehicleInfo: boolean;
  showVehicleInfoFields: boolean;
};
```

## Example

```js
{
  pickupType: 'delivery';
  pickupTypeLocalizedString: 'Delivery';
  requireVehicleInfo: true;
  showVehicleInfoFields: true;
};
```

