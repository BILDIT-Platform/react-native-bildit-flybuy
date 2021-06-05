---
sidebar_position: 1
---

## Fetch Orders

```jsx
Flybuy.Orders.fetchOrders()
```

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

## Update Order State

```jsx
Flybuy.Orders.updateOrderState(`<order_id>`, 'ready')
```

## Update Order Customer State

```jsx
Flybuy.Orders.updateOrderCustomerState(`<order_id`, 'departed')
```

## Rate Order

```jsx
Flybuy.Orders.rateOrder(`order_id`, 5, 'Awesome!')
```