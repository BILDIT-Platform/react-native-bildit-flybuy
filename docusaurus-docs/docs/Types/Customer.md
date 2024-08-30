---
sidebar_position: 2
---

# Customer Object Type

`Customer` object type provide details of the current customer and is returned after creating a customer or logging in.

## Type

```ts
{
  token: string;
  emailAddress?: string;
  info: ICustomerInfo;
};
```

## Example

```js
{
"token": "F69PGKM1QXCN7Dj3ybEXCpU4",
"info": {
  "phone": "555-555-5555",
  "licensePlate": "AB 0496",
  "carColor": "Silver",
  "carType": "Tesla",
  "name": "Abdelkhalek Zellat"
},
"emailAddress": null
};
```

## Used by

- [`createOrder`](../../docs/Components/Orders#create-order)
- [`claimOrder`](../../docs/Components/Orders#claim-order)
- [`createCustomer`](../../docs/Components/Customers#create-customer)
- [`updateCustomer`](../../docs/Components/Customers#update-customer)
