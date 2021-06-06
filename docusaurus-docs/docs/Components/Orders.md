---
sidebar_position: 1
---

## Fetch Orders
#### Params
|Name | Type |
|------|-----|
|None | None |
```jsx
Flybuy.Orders.fetchOrders()
```

**[flybuy Get All Orders Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/orders?id=get-a-list-of-all-orders)**

## Create Order
#### Params
|Name | Type | Example |
|-----|------|---------|
|     | Int  | `15942` |
|     | Str | `'573836'` |
|     | Obj |  `{name: 'Lamia Selmane AB',carType: 'Nothing',carColor: 'Silver',licensePlate: 'Nothing' phone: '555-555-5555',}` |
| pickupWindow | Obj | `{start: new Date().toISOString(),end: new Date('2022-12-02').toISOString(),}` |    |
|     | Str | `'delayed'` |
|     | Str | `'delivery'` |

#### Example

```jsx
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
)
```

**[flybuy Create Order Documentaiton](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/orders?id=create-an-order)**

## Claim Order

#### Params
| Name | Type | Example |
|------|------|---------|
|      | Str  | `'9898899'` |
|      | Obj  | `{name: 'Lamia Selmane AB',carType: 'Nothing',carColor: 'Silver',licensePlate: 'Nothing',phone: '555-555-5555',}` |
|      | Str  | `'pickup'` |

#### Example

```jsx
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
)
```

**[flybuy Claim Order Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=claim-order)**

## Update Order State

#### Params

| Name | Type | Example |
|------|------|---------|
| orderID | Int  | `46084566` |
|      | Str  | `'ready'` |

#### Example

```jsx
Flybuy.Orders.updateOrderState(46084566, 'ready')
```

**[flybuy Update Order State Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=update-order-state)**

## Update Order Customer State

#### Params

| Name | Type | Example |
|------|------|---------|
| orderID | Int | `46084566` |
|     | Str | `'departed'` |

#### Example

```jsx
Flybuy.Orders.updateOrderCustomerState(46084566, 'departed')
```

**[flybuy Update Customer State Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=update-customer-state)**

## Rate Order

#### Params
| Name | Type | Example |
|------|------|---------|
|orderID | Int | `46084566` |
|rating | Int |`5` |
|review | Str | `'Awesome!'` |

#### Example

```jsx
Flybuy.Orders.rateOrder(46084566, 5, 'Awesome!')
```

**[flybuy Rate Order Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=customer-ratings)**