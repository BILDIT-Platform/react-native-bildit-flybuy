---
sidebar_position: 1
---

# CustomerInfo Object Type

`CustomerInfo` object is used to define the customer informations.

## Type

```ts
{
name: string;
carType: string;
carColor: string;
licensePlate: string;
phone?: string;
};
```

## Example

```js
{
  name: 'Lamia Selmane',
  carType: 'Tesla',
  carColor: 'Silver',
  licensePlate: 'AB 0496',
  phone: '555-555-5555',
};
```

## Used by

- [`createOrder`](../../Components/Orders#create-order)
- [`claimOrder`](../../Components/Orders#claim-order)
- [`createCustomer`](../../Components/Customers#create-customer)
- [`updateCustomer`](../../Components/Customers#update-customer)
