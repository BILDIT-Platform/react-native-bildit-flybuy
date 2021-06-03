import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Flybuy from 'react-native-flybuy';

const Button = ({ title, color = '#841584', onPress }) => {
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
      .then((orders) => console.tron.log('orders', orders))
      .catch((err) => console.tron.log(err));
  };

  const loginWithToken = () => {
    Flybuy.Customer.loginWithToken('F69PGKM1QXCN7Dj3ybEXCpU4')
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const login = () => {
    Flybuy.Customer.login('ha_zellat@esi.dz', 'password')
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const logout = () => {
    Flybuy.Customer.logout()
      .then(() => console.tron.log('logout success'))
      .catch((err) => console.tron.log(err));
  };

  const createOrder = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2022-12-02').toISOString(),
    };
    Flybuy.Orders.createOrder(
      15942,
      '573836',
      {
        name: 'Lamia Selmane AB',
        carType: 'Nothing',
        carColor: 'Silver',
        licensePlate: 'Nothing',
        phone: '555-555-5555',
      },
      pickupWindow,
      'delayed',
      'delivery'
    )
      .then((order) => console.tron.log('order', order))
      .catch((err) => console.tron.log(err));
  };

  const claimOrder = () => {
    Flybuy.Orders.claimOrder(
      '9898899',
      {
        name: 'Lamia Selmane AB',
        carType: 'Nothing',
        carColor: 'Silver',
        licensePlate: 'Nothing',
        phone: '555-555-5555',
      },
      'pickup'
    )
      .then((order) => console.tron.log('claim order', order))
      .catch((err) => console.tron.log(err));
  };

  const updateOrderState = () => {
    Flybuy.Orders.updateOrderState(46084566, 'ready')
      .then((order) => console.tron.log('updateOrderState', order))
      .catch((err) => console.tron.log(err));
  };

  const updateOrderCustomerState = () => {
    Flybuy.Orders.updateOrderCustomerState(46084566, 'departed')
      .then((order) => console.tron.log('updateOrderCustomerState', order))
      .catch((err) => console.tron.log(err));
  };

  const rateOrder = () => {
    Flybuy.Orders.rateOrder(46084566, 5, 'Awesome!')
      .then((order) => console.tron.log('rateOrder', order))
      .catch((err) => console.tron.log(err));
  };

  const createCustomer = () => {
    Flybuy.Customer.createCustomer({
      name: 'Abdelkhalek Zellat',
      carType: 'Nothing',
      carColor: 'Silver',
      licensePlate: 'Nothing',
      phone: '555-555-5555',
    })
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const updateCustomer = () => {
    Flybuy.Customer.updateCustomer({
      name: 'Abdelkhalek Zellat',
      carType: 'Nothing',
      carColor: 'Silver',
      licensePlate: 'Nothing',
      phone: '555-555-5555',
    })
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const getCurrentCustomer = () => {
    Flybuy.Customer.getCurrentCustomer()
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const clearNotifications = () => {
    Flybuy.Notify.clearNotifications()
      .then(() => console.tron.log('notifications cleared'))
      .catch((err) => console.tron.log('err', err));
  };

  const createForSitesInRegion = () => {
    const region = {
      latitude: 47.6234207,
      longitude: -122.3300605,
      radius: 100,
    };

    const notification = {
      title: 'Test Notification',
      message: 'Test Notification message',
      data: {
        key1: 'value',
        key2: 'value',
      },
    };

    Flybuy.Notify.createForSitesInRegion(region, notification)
      .then((sites) => console.tron.log('notifications crated', sites))
      .catch((err) => console.tron.log('err', err));
  };

  const createForSites = () => {
    const notification = {
      title: 'Test Notification',
      message: 'Test Notification message',
      data: {
        key1: 'value',
        key2: 'value',
      },
    };

    const sites = [
      {
        description: '',
        instructions: '',
        coverPhotoUrl: null,
        longitude: '-122.3300605',
        postalCode: null,
        fullAddress: '500 Yale Ave N, Seattle, WA 98109, USA',
        locality: null,
        latitude: '47.6234207',
        id: 15942,
        region: null,
        streetAddress: null,
        country: null,
        phone: '333-333-3333',
        partnerIdentifier: '001',
        name: 'Test Site',
      },
    ];

    Flybuy.Notify.createForSites(sites, notification)
      .then(() => console.tron.log('notifications crated'))
      .catch((err) => console.tron.log('err', err));
  };

  const fetchAllSites = () => {
    Flybuy.Sites.fetchAllSites()
      .then((sites) => console.tron.log('sites', sites))
      .catch((err) => console.tron.log('err', err));
  };

  const fetchSitesByQuery = () => {
    Flybuy.Sites.fetchSitesByQuery({
      query: 'Test',
      page: 1,
    })
      .then((sites) => console.tron.log('sites', sites))
      .catch((err) => console.tron.log('err', err));
  };

  const fetchSitesByRegion = () => {
    const region = {
      latitude: 47.6234207,
      longitude: -122.3300605,
      radius: 100,
    };
    Flybuy.Sites.fetchSitesByRegion({
      per: 20,
      page: 1,
      region,
    })
      .then((sites) => console.tron.log('sites', sites))
      .catch((err) => console.tron.log('err', err));
  };

  React.useEffect(() => {
    Flybuy.configure('224.epegiXJkGRqvwLJJYHPTCWGR');
    Flybuy.Notify.configure();
    Flybuy.Pickup.configure();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Customer</Text>
        <Button title="login" onPress={login} />
        <Button title="loginWithToken" onPress={loginWithToken} />
        <Button title="logout" onPress={logout} />
        <Button title="create Customer" onPress={createCustomer} />
        <Button title="getCurrentCustomer" onPress={getCurrentCustomer} />
        <Button title="updateCustomer" onPress={updateCustomer} />
        <Text>Order</Text>
        <Button title="Fetch orders" onPress={fetchOrders} />
        <Button title="Create order" onPress={createOrder} />
        <Button title="claimOrder" onPress={claimOrder} />
        <Button title="updateOrderState" onPress={updateOrderState} />
        <Button title="rateOrder" onPress={rateOrder} />
        <Button
          title="updateOrderCustomerState"
          onPress={updateOrderCustomerState}
        />
        <Text>Notify</Text>
        <Button title="clearNotifications" onPress={clearNotifications} />
        <Button
          title="createForSitesInRegion"
          onPress={createForSitesInRegion}
        />
        <Button title="createForSites" onPress={createForSites} />
        <Text>Sites</Text>
        <Button title="fetchAllSites" onPress={fetchAllSites} />
        <Button title="fetchSitesByQuery" onPress={fetchSitesByQuery} />
        <Button title="fetchSitesByRegion" onPress={fetchSitesByRegion} />
      </View>
    </ScrollView>
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
