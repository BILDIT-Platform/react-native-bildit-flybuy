import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Flybuy from 'react-native-flybuy';

const Button = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
export default function App() {
  const fetchOrders = () => {
    Flybuy.fetchOrders()
      .then((orders) => console.log('orders', orders))
      .catch((err) => console.log(err));
  };

  const login = () => {
    Flybuy.login('F69PGKM1QXCN7Dj3ybEXCpU4')
      .then((customer) => console.log('customer', customer))
      .catch((err) => console.log(err));
  };

  const createOrder = () => {
    Flybuy.createOrder(15942, '12345', {
      name: 'Lamia Selmane AB',
      carType: 'Nothing',
      carColor: 'Silver',
      licensePlate: 'Nothing',
      phone: '555-555-5555',
    })
      .then((order) => console.log('order', order))
      .catch((err) => console.log(err));
  };

  const createCustomer = () => {
    Flybuy.createCustomer({
      name: 'Abdelkhalek Zellat',
      carType: 'Nothing',
      carColor: 'Silver',
      licensePlate: 'Nothing',
      phone: '555-555-5555',
    })
      .then((customer) => console.log('customer', customer))
      .catch((err) => console.log(err));
  };

  const updateCustomer = () => {
    Flybuy.updateCustomer({
      name: 'Abdelkhalek Zellat',
      carType: 'Nothing',
      carColor: 'Silver',
      licensePlate: 'Nothing',
      phone: '555-555-5555',
    })
      .then((customer) => console.log('customer', customer))
      .catch((err) => console.log(err));
  };

  const getCurrentCustomer = () => {
    Flybuy.getCurrentCustomer()
      .then((customer) => console.log('customer', customer))
      .catch((err) => console.log(err));
  };

  const createForSitesInRegion = () => {
    const region = {
      latitude: 12.122,
      longitude: 12.122,
      radius: 12.122,
    };

    const notification = {
      title: 'Test Notification',
      message: 'Test Notification message',
    };

    Flybuy.Notify.createForSitesInRegion(region, notification);
  };

  React.useEffect(() => {
    Flybuy.configure('224.epegiXJkGRqvwLJJYHPTCWGR');
  }, []);

  return (
    <View style={styles.container}>
      <Button title="login" color="#841584" onPress={login} />
      <Button title="Fetch orders" color="#841584" onPress={fetchOrders} />
      <Button title="Create orders" color="#841584" onPress={createOrder} />
      <Button
        title="create Customer"
        color="#841584"
        onPress={createCustomer}
      />
      <Button
        title="getCurrentCustomer"
        color="#841584"
        onPress={getCurrentCustomer}
      />
      <Button title="updateCustomer" color="#841584" onPress={updateCustomer} />
      <Button
        title="createForSitesInRegion"
        color="#841584"
        onPress={createForSitesInRegion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  button: {
    width: '60%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
