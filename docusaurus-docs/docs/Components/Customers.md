---
sidebar_position: 1
---

Several methods are provided for managing the Customer within the SDK.

## Create Customer

Create a customer account using information from the user

#### Params

| Name     | Type                                   | Example                                                                                                                   |
| -------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| customer | [`ICustomerInfo`](../../ObjectTypes/C) | `{ name: 'Abdelkhalek Zellat', carType: 'Nothing', carColor: 'Silver', licensePlate: 'Nothing', phone: '555-555-5555' } ` |

#### Example

```jsx
Flybuy.Customer.createCustomer({
  name: 'Abdelkhalek Zellat',
  carType: 'Nothing',
  carColor: 'Silver',
  licensePlate: 'Nothing',
  phone: '555-555-5555',
});
```

**[FlyBuy Create Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/customers?id=create-a-customer)**

## Login with Email/Password

Login the user in using existing credentials

#### Params

| Name     | Type | Example            |
| -------- | ---- | ------------------ |
| email    | Str  | `'name@email.com'` |
| password | Str  | `'password'`       |

#### Example

```jsx
Flybuy.Customer.login(`<email>`, `<password>`);
```

**[FlyBuy Login with Email/Password Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=login)**

## Login with Token

Login the user with a previously obtained customer API token

#### Params

| Name  | Type | Example                      |
| ----- | ---- | ---------------------------- |
| token | Str  | `'F69PGKM1QXCN7Dj3ybEXCpU4'` |

#### Eample

```jsx
Flybuy.Customer.loginWithToken(`<token>`);
```

**[FlyBuy Login with Token Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=login-via-customer-token)**

## Logout

Logs out the current customer.

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```jsx
Flybuy.Customer.logout();
```

**[FlyBuy Logout Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=logout)**

## Update Customer

Update customer info for the logged in user

#### Params

| Name     | Type          | Example                                                                                                                  |
| -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| customer | ICustomerInfo | `{ name: 'Abdelkhalek Zellat', carType: 'Nothing', carColor: 'Silver', licensePlate: 'Nothing', phone: '555-555-5555' }` |

#### Example

```jsx
Flybuy.Customer.updateCustomer({
  name: 'Abdelkhalek Zellat',
  carType: 'Nothing',
  carColor: 'Purple',
  licensePlate: 'Nothing',
  phone: '555-555-5555',
});
```

**[FlyBuy Update Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/customers?id=update-a-customer)**

## SignUp a Customer

Link an email and password with the current anonymous logged in user.

#### Params

| Name     | Type | Example            |
| -------- | ---- | ------------------ |
| email    | Str  | `'name@email.com'` |
| password | Str  | `'password'`       |

#### Example

```jsx
Flybuy.Customer.signUp('ha_zellat@esi.dz', 'password');
```

**[FlyBuy SignUp Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/customers?id=sign-up-a-customer)**

## Get Current Customer

Returns an instance of the current customer

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```jsx
Flybuy.Customer.getCurrentCustomer();
```

**[FlyBuy Get Current Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk/customer?id=get-the-current-customer)**
