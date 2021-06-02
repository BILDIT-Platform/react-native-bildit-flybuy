# react-native-flybuy

React Native JS Wrapper for FlyBuy Native SDK

## Installation

```sh
npm install react-native-flybuy
```

## Usage

```js
import Flybuy from 'react-native-flybuy';

// ...

const customer = await Flybuy.login('TOKEN');

const orders = await Flybuy.fetchOrders();

const order = await Flybuy.createOrder(15942, '12345', {
  name: 'Lamia Selmane AB',
  carType: 'Tesla',
  carColor: 'Silver',
  licensePlate: 'Lorem',
  phone: '555-555-5555',
});

const customer = await Flybuy.createCustomer({
  name: 'Abdelkhalek Zellat',
  carType: 'Tesla',
  carColor: 'Silver',
  licensePlate: 'Nothing',
  phone: '555-555-5555',
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
