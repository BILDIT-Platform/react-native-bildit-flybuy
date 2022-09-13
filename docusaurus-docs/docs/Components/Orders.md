---
sidebar_position: 1
---

## Fetch Orders

Return the list of orders for the current user.

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

```js
FlyBuy.Core.Orders.fetchOrders();
```


## Create Order using Site ID

Create a new order for the current user.

By default, orders are created with a state of `created`. If you wish to provide a different `OrderState`, you can provide that optional argument. If you do not wish to provide a different state, omit the parameter.

Most orders will have a pickup time of “ASAP”. If you have a different pickup window, you can pass a `pickupWindow` parameter. If you want the default of “ASAP”, omit the parameter.

#### Params

This function only needs an object as a param.

| Name         | Type                                    | Example                                                                                                      |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --- |
| siteId       | Int                                     | `15942`                                                                                                      |
| pid          | Str                                     | `'573836'`                                                                                                   |
| customerInfo | [`CustomerInfo`](../Types/CustomerInfo) | `{name: 'Lamia Selmane',carType: 'Tesla',carColor: 'Silver',licensePlate: 'AB 0496' phone: '555-555-5555',}` |
| pickupWindow | [`PickupWindow`](../Types/PickupWindow) | `{start: new Date().toISOString(),end: new Date('2022-12-02').toISOString(),}`                               |     |
| orderState   | Str                                     | `'delayed'`                                                                                                  |
| pickupType   | Str                                     | `'delivery'`                                                                                                 |

#### Example

```js
const pickupWindow = {
  start: new Date().toISOString(),
  end: new Date('2022-12-02').toISOString(),
};

FlyBuy.Core.Orders.createOrder({
  siteId: 15942,
  pid: '573836',
  customerInfo: {
    name: 'Lamia Selmane',
    carType: 'Tesla',
    carColor: 'Silver',
    licensePlate: 'AB 0496',
    phone: '555-555-5555',
  },
  pickupWindow: pickupWindow,
  orderState: 'delayed',
  pickupType: 'delivery'
});
```

## Create Order using Site Partner Identifier

If the app does not have the Flybuy `siteID` or only wants to create the order if the site operational status is `live`, the `sitePartnerIdentifier` can be used to create an order. An `orderPartnerIdentifier` and `customerInfo` also need to be provided. This customer information does not need to be the same as the customer that is logged in. It should be the information for the person that is picking up the order.

Optionally, the `orderState`, `pickupType`, and `pickupWindow` can be set when creating an order if these are not created via a backend integration.

Most orders will have a pickup time of “ASAP”. If you have a different pickup window, you can pass a `pickupWindow` parameter. If you want the default of “ASAP”, omit the parameter.

#### Params

This function only needs an object as a param.

| Name         | Type                                    | Example                                                                                                      |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --- |
| sitePid      | Str                                     | sitePartnerIdentifier: `'15942'`                                                                                                      |
| orderPid     | Str                                     | orderPartnerIdentifier: `'573836'`                                                                                                   |
| customerInfo | [`CustomerInfo`](../Types/CustomerInfo) | `{name: 'Lamia Selmane',carType: 'Tesla',carColor: 'Silver',licensePlate: 'AB 0496' phone: '555-555-5555',}` |
| pickupWindow | [`PickupWindow`](../Types/PickupWindow) | `{start: new Date().toISOString(),end: new Date('2022-12-02').toISOString(),}`                               |     |
| orderState   | Str                                     | `'delayed'`                                                                                                  |
| pickupType   | Str                                     | `'delivery'`                                                                                                 |

#### Example

```js
const pickupWindow = {
  start: new Date().toISOString(),
  end: new Date('2022-12-02').toISOString(),
};

FlyBuy.Core.Orders.createOrder({
  sitePid: '15942',
  orderPid: '573836',
  customerInfo: {
    name: 'Lamia Selmane',
    carType: 'Tesla',
    carColor: 'Silver',
    licensePlate: 'AB 0496',
    phone: '555-555-5555',
  },
  pickupWindow: pickupWindow,
  orderState: 'delayed',
  orderType: 'delivery'
});
```


## Claim Order

Claim an order for the current customer.

#### Params

| Name         | Type                                    | Example                                                                                                      |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| pid          | Str                                     | `'9898899'`                                                                                                  |
| customerInfo | [`CustomerInfo`](../Types/CustomerInfo) | `{name: 'Lamia Selmane',carType: 'Tesla',carColor: 'Silver',licensePlate: 'AB 0496',phone: '555-555-5555',}` |
| pickupType   | Str                                     | `'pickup'`                                                                                                   |

#### Example

```js
FlyBuy.Core.Orders.claimOrder(
  '9898899',
  {
    name: 'Lamia Selmane',
    carType: 'Tesla',
    carColor: 'Silver',
    licensePlate: 'AB 0496',
    phone: '555-555-5555',
  },
  'pickup'
);
```


## Update Order State

You can update an order’s state, if necessary, with any valid state:

#### Params

| Name    | Type | Example    |
| ------- | ---- | ---------- |
| orderID | Int  | `46084566` |
| state   | Str  | `'ready'`  |

#### Example

```jsx
FlyBuy.Core.Orders.updateOrderState(46084566, 'ready');
```


## Update Order Customer State

#### Params

| Name    | Type | Example      |
| ------- | ---- | ------------ |
| orderID | Int  | `46084566`   |
| state   | Str  | `'departed'` |

#### Example

```jsx
FlyBuy.Core.Orders.updateOrderCustomerState(46084566, 'departed');
```


## Send spot identifier

#### Params

| Name    | Type | Example      | Description |
| ------- | ---- | ------------ | ----------- |
| orderID | Int  | `46084566`   |             |
| state   | Str  | `'waiting'`  |             |
| spot    | Str  | `'1'`        | Max 35 characters |

#### Example

```jsx
FlyBuy.Core.Orders.updateOrderCustomerStateWithSpot(46084566, 'departed', '1');
```


## Rate Order

If you collect customer ratings in your app, you can pass them to Flybuy.

#### Params

| Name     | Type | Example      |
| -------- | ---- | ------------ |
| orderID  | Int  | `46084566`   |
| rating   | Int  | `5`          |
| comments | Str  | `'Awesome!'` |

#### Example

```jsx
FlyBuy.Core.Orders.rateOrder(46084566, 5, 'Awesome!');
```


## Listen to orders update

Set up event listeners to get updates about orders.

#### Example

```jsx
React.useEffect(() => {
  const eventListener = FlyBuy.eventEmitter.addListener(
    'orderUpdated',
    (event) => {
      console.log('event', event);
    }
  );

  return () => {
    eventListener.remove();
  };
}, []);
```
