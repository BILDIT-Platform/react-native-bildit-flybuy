---
sidebar_position: 1
---

# PickupConfig Object Type

`PickupConfig` object is used to define the pickup config options for an order or site.

## Type

```ts
{
  accentColor: string;
  accentTextColor: string;
  askToAskImageURL?: string;
  availablePickupTypes: IPickupTypeConfig[];
  availableHandoffVehicleLocation?: string;
  customerNameEditingEnabled: boolean;
  customerFeedbackEnabled?: boolean;
  id: number;
  orderProgressStates?: string;
  pickupTypeSelectionEnabled: boolean;
  privacyPolicyURL?: string;
  termsOfServiceURL?: string;
  type: string;
};
```
