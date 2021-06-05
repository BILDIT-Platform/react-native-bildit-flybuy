---
sidebar_position: 1
---

## Fetch Orders

```jsx
Flybuy.Orders.fetchOrders()
```

**[flybuy Get All Orders Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/orders?id=get-a-list-of-all-orders)**

## Create Order

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

```jsx
Flybuy.Orders.updateOrderState(`<order_id>`, 'ready')
```

**[flybuy Update Order State Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=update-order-state)**

## Update Order Customer State

```jsx
Flybuy.Orders.updateOrderCustomerState(`<order_id`, 'departed')
```

**[flybuy Update Customer State Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=update-customer-state)**

## Rate Order

```jsx
Flybuy.Orders.rateOrder(`order_id`, 5, 'Awesome!')
```

**[flybuy Rate Order Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/orders?id=customer-ratings)**