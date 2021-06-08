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
Flybuy.Orders.fetchOrders();
```

**[FlyBuy Get All Orders Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/orders?id=get-a-list-of-all-orders)**

## Create Order

Create a new order for the current user.

By default, orders are created with a state of `created`. If you wish to provide a different `OrderState`, you can provide that optional argument. If you do not wish to provide a different state, omit the parameter.

Most orders will have a pickup time of “ASAP”. If you have a different pickup window, you can pass a `pickupWindow` parameter. If you want the default of “ASAP”, omit the parameter.

#### Params

| Name         | Type                                        | Example                                                                                                           |
| ------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --- |
| siteId       | Int                                         | `15942`                                                                                                           |
| pid          | Str                                         | `'573836'`                                                                                                        |
| customerInfo | [`ICustomerInfo`](../Types/CustomerInfo)    | `{name: 'Lamia Selmane AB',carType: 'Nothing',carColor: 'Silver',licensePlate: 'Nothing' phone: '555-555-5555',}` |
| pickupWindow | [`PickupWindow`](../Types/PickupWindow)     | `{start: new Date().toISOString(),end: new Date('2022-12-02').toISOString(),}`                                    |     |
| orderState   | [`OrderStateType`](../Types/OrderStateType) | `'delayed'`                                                                                                       |
| pickupType   | [`PickupType`](../Types/PickupType)         | `'delivery'`                                                                                                      |

#### Example

```js
const pickupWindow = {
  start: new Date().toISOString(),
  end: new Date('2022-12-02').toISOString(),
};

Flybuy.Orders.createOrder(
  15942,
  '573836',
  {
    name: 'Lamia Selmane AB',
    carType: 'Nothing',
    carColor: 'Silver',
    licensePlate: 'Nothing',
    phone: '555-555-5555',
  },
  pickupWindow,
  'delayed',
  'delivery'
);
```

**[FlyBuy Create Order Documentaiton](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/orders?id=create-an-order)**

## Claim Order

claim an order for the current customer.

#### Params

| Name         | Type                                     | Example                                                                                                           |
| ------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| pid          | Str                                      | `'9898899'`                                                                                                       |
| customerInfo | [`ICustomerInfo`](../Types/CustomerInfo) | `{name: 'Lamia Selmane AB',carType: 'Nothing',carColor: 'Silver',licensePlate: 'Nothing',phone: '555-555-5555',}` |
| pickupType   | [`PickupType`](../Types/PickupType)      | `'pickup'`                                                                                                        |

#### Example

```js
Flybuy.Orders.claimOrder(
  '9898899',
  {
    name: 'Lamia Selmane AB',
    carType: 'Nothing',
    carColor: 'Silver',
    licensePlate: 'Nothing',
    phone: '555-555-5555',
  },
  'pickup'
);
```

**[FlyBuy Claim Order Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=claim-order)**

## Update Order State

You can update an order’s state, if necessary, with any valid state:

#### Params

| Name    | Type                                        | Example    |
| ------- | ------------------------------------------- | ---------- |
| orderID | Int                                         | `46084566` |
| state   | [`OrderStateType`](../Types/OrderStateType) | `'ready'`  |

#### Example

```jsx
Flybuy.Orders.updateOrderState(46084566, 'ready');
```

**[c Update Order State Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=update-order-state)**

## Update Order Customer State

#### Params

| Name    | Type                                      | Example      |
| ------- | ----------------------------------------- | ------------ |
| orderID | Int                                       | `46084566`   |
| state   | [`CustomerState`](../Types/CustomerState) | `'departed'` |

#### Example

```jsx
Flybuy.Orders.updateOrderCustomerState(46084566, 'departed');
```

**[FlyBuy Update Customer State Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=update-customer-state)**

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
Flybuy.Orders.rateOrder(46084566, 5, 'Awesome!');
```

**[FlyBuy Rate Order Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=customer-ratings)**
