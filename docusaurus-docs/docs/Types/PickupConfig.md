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
  customerNameEditingEnabled: boolean;
  id: number;
  pickupTypeSelectionEnabled: boolean;
  privacyPolicyURL?: string;
  termsOfServiceURL?: string;
  type: string;
};
```
