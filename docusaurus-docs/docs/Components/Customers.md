---
sidebar_position: 1
---

Several methods are provided for managing the Customer within the SDK.

## Create Customer

Create a customer account using information from the user

#### Params

| Name     | Type                                    | Example                                                                                                                 |
| -------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| customer | [`CustomerInfo`](../Types/CustomerInfo) | `{ name: 'Abdelkhalek Zellat', carType: 'Tesla', carColor: 'Silver', licensePlate: 'AB 0496', phone: '555-555-5555' } ` |

#### Example

```jsx
FlyBuy.Core.Customer.createCustomer({
  name: 'Abdelkhalek Zellat',
  carType: 'Tesla',
  carColor: 'Silver',
  licensePlate: 'AB 0496',
  phone: '555-555-5555',
});
```

**[Flybuy Create Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/customers?id=create-a-customer)**

## Login with Email/Password

Login the user in using existing credentials

#### Params

| Name     | Type | Example            |
| -------- | ---- | ------------------ |
| email    | Str  | `'name@email.com'` |
| password | Str  | `'password'`       |

#### Example

```jsx
FlyBuy.Core.Customer.login(`<email>`, `<password>`);
```

**[Flybuy Login with Email/Password Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=login)**

## Login with Token

Login the user with a previously obtained customer API token

#### Params

| Name  | Type | Example                      |
| ----- | ---- | ---------------------------- |
| token | Str  | `'F69PGKM1QXCN7Dj3ybEXCpU4'` |

#### Eample

```jsx
FlyBuy.Core.Customer.loginWithToken(`<token>`);
```

**[Flybuy Login with Token Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=login-via-customer-token)**

## Logout

Logs out the current customer.

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```jsx
FlyBuy.Core.Customer.logout();
```

**[Flybuy Logout Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=logout)**

## Update Customer

Update customer info for the logged in user

#### Params

| Name     | Type                                    | Example                                                                                                                |
| -------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| customer | [`CustomerInfo`](../Types/CustomerInfo) | `{ name: 'Abdelkhalek Zellat', carType: 'Tesla', carColor: 'Silver', licensePlate: 'AB 0496', phone: '555-555-5555' }` |

#### Example

```jsx
FlyBuy.Core.Customer.updateCustomer({
  name: 'Abdelkhalek Zellat',
  carType: 'Tesla',
  carColor: 'Purple',
  licensePlate: 'AB 0496',
  phone: '555-555-5555',
});
```

**[Flybuy Update Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/customers?id=update-a-customer)**

## SignUp a Customer

Link an email and password with the current anonymous logged in user.

#### Params

| Name     | Type | Example            |
| -------- | ---- | ------------------ |
| email    | Str  | `'name@email.com'` |
| password | Str  | `'password'`       |

#### Example

```jsx
FlyBuy.Core.Customer.signUp('ha_zellat@esi.dz', 'password');
```

**[Flybuy SignUp Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/customers?id=sign-up-a-customer)**

## Get Current Customer

Returns an instance of the current customer

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```jsx
FlyBuy.Core.Customer.getCurrentCustomer();
```

**[Flybuy Get Current Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk/customer?id=get-the-current-customer)**
