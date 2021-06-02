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
    Flybuy.Orders.fetchOrders()
      .then((orders) => console.log(orders))
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

  return (
    <View style={styles.container}>
      <Button title="Fetch orders" color="#841584" onPress={fetchOrders} />
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
