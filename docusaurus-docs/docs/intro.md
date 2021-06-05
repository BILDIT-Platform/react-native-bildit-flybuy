---
sidebar_position: 1
---

# Introduction

## Installation

You can install the sdk with yarn, like so:

```shell
yarn add react-native-bildit-flybuy@https://github.com/BILDIT-LLC/react-native-bildit-flybuy.git
```

## Authorization

You'll need to pass your flybuy api token in each call to the api.

```jsx
api_token = <your_flybuy_api_token>
```

## Usage

```jsx
import Flybuy from 'react-native-bildit-flybuy';
```
#### Fetch all orders
```jsx
const result = Flybuy.fetchOrders(api_token);
```
#### Fetch all orders associated with a partner ID
```jsx
const result = Flybuy.fetchOrderByPartnerIdentifier(api_token, partnerIdentifier);
```
#### Fetch an order by its ID
```jsx
const result = await Flybuy.fetchOrderById(api_token,order_id)
```


#### Create a new order
```jsx
const result = Flybuy.createOrder(api_token, data);
```
#### Change the state of the local application
```jsx
const result = Flybuy.changeState(api_token, data);
```



