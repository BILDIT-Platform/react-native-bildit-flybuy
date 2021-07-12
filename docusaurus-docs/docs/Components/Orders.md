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

**[Flybuy Get All Orders Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/orders?id=get-a-list-of-all-orders)**

## Create Order

Create a new order for the current user.

By default, orders are created with a state of `created`. If you wish to provide a different `OrderState`, you can provide that optional argument. If you do not wish to provide a different state, omit the parameter.

Most orders will have a pickup time of “ASAP”. If you have a different pickup window, you can pass a `pickupWindow` parameter. If you want the default of “ASAP”, omit the parameter.

#### Params

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

FlyBuy.Core.Orders.createOrder(
  15942,
  '573836',
  {
    name: 'Lamia Selmane',
    carType: 'Tesla',
    carColor: 'Silver',
    licensePlate: 'AB 0496',
    phone: '555-555-5555',
  },
  pickupWindow,
  'delayed',
  'delivery'
);
```

**[Flybuy Create Order Documentaiton](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/orders?id=create-an-order)**

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

**[Flybuy Claim Order Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=claim-order)**

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

**[Flybuy Update Order State Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=update-order-state)**

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

**[Flybuy Update Customer State Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=update-customer-state)**

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

**[Flybuy Rate Order Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=customer-ratings)**

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
