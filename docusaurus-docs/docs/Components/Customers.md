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

**[flybuy Create Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/customers?id=create-a-customer)**

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
**[flybuy Update Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/api/v1/customers?id=update-a-customer)**


## Get Current Customer

```jsx
Flybuy.Customer.getCurrentCustomer()
```

**[flybuy Get Current Customer Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk/customer?id=get-the-current-customer)**

## Login with Email/Password

```jsx
Flybuy.Customer.login(`<email>`, `<password>`)
```

**[flybuy Login with Email/Password Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=login)**

## Login with Token

```jsx
Flybuy.Customer.loginWithToken(`<token>`)
```

**[flybuy Login with Token Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=login-via-customer-token)**
## Logout

```jsx
Flybuy.Customer.logout()
```

**[flybuy Logout Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/customer?id=logout)**