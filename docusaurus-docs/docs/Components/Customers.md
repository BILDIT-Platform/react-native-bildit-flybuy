---
sidebar_position: 2
---

## Create Customer

```jsx
Flybuy.Customer.createCustomer({
      name: 'Abdelkhalek Zellat',
      carType: 'Nothing',
      carColor: 'Silver',
      licensePlate: 'Nothing',
      phone: '555-555-5555',
    })
```

## Update Customer

```jsx
Flybuy.Customer.updateCustomer({
      name: 'Abdelkhalek Zellat',
      carType: 'Nothing',
      carColor: 'Purple',
      licensePlate: 'Nothing',
      phone: '555-555-5555',
    })
```


## Get Current Customer

```jsx
Flybuy.Customer.getCurrentCustomer()
```

## Login with Email/Password

```jsx
Flybuy.Customer.login(`<email>`, `<password>`)
```

## Login with Token

```jsx
Flybuy.Customer.loginWithToken(`<token>`)
```

## Logout

```jsx
Flybuy.Customer.logout()
```