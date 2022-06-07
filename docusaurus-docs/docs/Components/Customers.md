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

