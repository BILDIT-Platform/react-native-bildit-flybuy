---
sidebar_position: 4
---

# Order Object Type

`Order` object type provides details for an order.

## Example

```json
{
  "siteName": "Test Site",
  "customerState": "departed",
  "customerName": "Lamia Selmane",
  "siteLongitude": "-122.3300605",
  "siteDescription": "",
  "state": "ready",
  "siteLatitude": "47.6234207",
  "customerRating": "5",
  "etaAt": null,
  "redemptionCode": "ABA57PQ674",
  "id": 46084566,
  "customerCarColor": "Silver",
  "customerCarType": "Tesla",
  "pickupWindow": ["2021-06-03 03:44:44 +0000", "2022-12-02 00:00:00 +0000"],
  "pickupType": "delivery",
  "siteFullAddress": "500 Yale Ave N, Seattle, WA 98109, USA",
  "siteID": 15942,
  "partnerIdentifier": "573836",
  "siteInstructions": "",
  "customerComment": "Awesome!",
  "siteCoverPhotoURL": null,
  "customerLicensePlate": "AB 0496",
  "sitePhone": "+18882458277",
  "redeemedAt": "2021-06-03 03:44:45 +0000",
  "spotIdentifier": "1",
  "spotIdentifierEntryEnabled": true,
  "spotIdentifierInputType": "any"
}
```

## Returned in

- [`createOrder`](../../docs/Components/Orders#create-order)
- [`fetchOrders`](../../docs/Components/Orders#fetch-orders)
- [`claimOrder`](../../docs/Components/Orders#claim-order)
- [`updateOrderState`](../../docs/Components/Orders#update-order-state)
- [`updateOrderCustomerState`](../../docs/Components/Orders#update-order-customer-state)
- [`rateOrder`](../../docs/Components/Orders#rate-order)
- [`updatePickuMethod`](../../docs/Components/Orders#update-order-pickup-method)
