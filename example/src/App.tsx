import * as React from 'react';

import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native';
import Button from './Button';
import FlyBuy, { ISite } from 'react-native-bildit-flybuy';
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import AppConfig from './AppConfig.json';

const ORDER_ID = 46084474;
const SITE_ID = 15942;
const NEW_PID = '01380326929';
const CUSTOMER_INFO = {
  name: 'Lamia Selmane',
  carType: 'Tesla',
  carColor: 'Silver',
  licensePlate: 'AB 0496',
  phone: '555-555-5555',
};
const NOTIFICATION = {
  title: 'Test Notification',
  message: 'Test Notification message',
  data: {
    key1: 'value',
    key2: 'value',
  },
};

const REGION = {
  latitude: 47.6234207,
  longitude: -122.3300605,
  radius: 100,
};

export default function App() {
  const getLocationPermissions = async () => {
    const granted = await requestMultiple(
      Platform.select({
        android: [
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ],
        ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
      }),
      {
        title: 'ExampleApp',
        message: 'ExampleApp would like access to your location ',
      }
    );
    return granted === RESULTS.GRANTED;
  };

  // Orders
  const fetchOrders = () => {
    FlyBuy.Core.Orders.fetchOrders()
      .then((orders) => console.tron.log('orders', orders))
      .catch((err) => console.tron.log(err));
  };

  const createOrder = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2022-12-02').toISOString(),
    };
    FlyBuy.Core.Orders.createOrder(
      SITE_ID,
      NEW_PID,
      CUSTOMER_INFO,
      pickupWindow,
      'delayed',
      'delivery'
    )
      .then((order) => console.tron.log('order', order))
      .catch((err) => console.tron.log(err));
  };

  const claimOrder = () => {
    FlyBuy.Core.Orders.claimOrder('385BQT5BMH', CUSTOMER_INFO, 'pickup')
      .then((order) => console.tron.log('claim order', order))
      .catch((err) => console.tron.log(err));
  };

  const fetchOrderByRedemptionCode = () => {
    FlyBuy.Core.Orders.fetchOrderByRedemptionCode('QDWRBDKJJG')
      .then((order) => console.tron.log('order by redemcode', order))
      .catch((err) => console.tron.log(err));
  };

  const updateOrderState = () => {
    FlyBuy.Core.Orders.updateOrderState(ORDER_ID, 'driver_assigned')
      .then((order) => console.tron.log('updateOrderState', order))
      .catch((err) => console.tron.log(err));
  };

  const updateOrderCustomerState = () => {
    FlyBuy.Core.Orders.updateOrderCustomerState(ORDER_ID, 'departed')
      .then((order) => console.tron.log('updateOrderCustomerState', order))
      .catch((err) => console.tron.log(err));
  };

  const rateOrder = () => {
    FlyBuy.Core.Orders.rateOrder(ORDER_ID, 5, 'Awesome!')
      .then((order) => console.tron.log('rateOrder', order))
      .catch((err) => console.tron.log(err));
  };

  // Customer

  const loginWithToken = () => {
    FlyBuy.Core.Customer.loginWithToken('F69PGKM1QXCN7Dj3ybEXCpU4')
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const login = () => {
    FlyBuy.Core.Customer.login('ha_zellat@esi.dz', 'password')
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const signUp = () => {
    FlyBuy.Core.Customer.signUp('ha_zellat@esi.dz', 'password')
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const logout = () => {
    FlyBuy.Core.Customer.logout()
      .then(() => console.tron.log('logout success'))
      .catch((err) => console.tron.log(err));
  };

  const createCustomer = () => {
    FlyBuy.Core.Customer.createCustomer(CUSTOMER_INFO)
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const updateCustomer = () => {
    FlyBuy.Core.Customer.updateCustomer(CUSTOMER_INFO)
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  const getCurrentCustomer = () => {
    FlyBuy.Core.Customer.getCurrentCustomer()
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  // Notify

  const clearNotifications = () => {
    FlyBuy.Notify.clearNotifications()
      .then(() => console.tron.log('notifications cleared'))
      .catch((err) => console.tron.log('err', err));
  };

  const createForSitesInRegion = () => {
    FlyBuy.Notify.createForSitesInRegion(REGION, NOTIFICATION)
      .then((sites) => console.tron.log('notifications crated', sites))
      .catch((err) => console.tron.log('err', err));
  };

  const createForSites = () => {
    const sites: ISite[] = [
      {
        id: 15942,
        name: 'Test Site',
        phone: '333-333-3333',
        streetAddress: null,
        fullAddress: '500 Yale Ave N, Seattle, WA 98109, USA',
        locality: null,
        region: null,
        country: null,
        postalCode: null,
        latitude: '47.6234207',
        longitude: '-122.3300605',
        coverPhotoUrl: null,
        iconUrl: null,
        instructions: '',
        description: '',
        partnerIdentifier: '001',
      },
    ];

    FlyBuy.Notify.createForSites(sites, NOTIFICATION)
      .then(() => console.tron.log('notifications crated'))
      .catch((err) => console.tron.log('err', err));
  };

  // Sites

  const fetchAllSites = () => {
    FlyBuy.Core.Sites.fetchAllSites()
      .then((sites) => console.tron.log('sites', sites))
      .catch((err) => console.tron.log('err', err));
  };

  const fetchSitesByQuery = () => {
    FlyBuy.Core.Sites.fetchSitesByQuery({
      query: 'Test',
      page: 1,
    })
      .then((sites) => console.tron.log('sites', sites))
      .catch((err) => console.tron.log('err', err));
  };

  const fetchSitesByRegion = () => {
    FlyBuy.Core.Sites.fetchSitesByRegion({
      per: 20,
      page: 1,
      region: REGION,
    })
      .then((sites) => console.tron.log('sites', sites))
      .catch((err) => console.tron.log('err', err));
  };

  // Prescence

  const startLocator = () => {
    FlyBuy.Presence.startLocatorWithIdentifier(
      '12345678',
      "{'key':'value'}"
    ).then((res) => {
      console.tron.log('locatorRssi----->', res);
    });
  };

  const stopLocator = () => {
    FlyBuy.Presence.stopLocator()
      .then((result) => {
        console.tron.log(result);
      })
      .catch((e) => {
        console.tron.log(e);
      });
  };

  React.useEffect(() => {
    FlyBuy.Core.configure(AppConfig.APP_TOKEN);
    FlyBuy.Notify.configure();
    FlyBuy.Pickup.configure();
    FlyBuy.Presence.configure(AppConfig.PRESENCE_UUID);
    getLocationPermissions();
  }, []);

  React.useEffect(() => {
    const eventListener = FlyBuy.eventEmitter.addListener(
      'orderUpdated',
      (event) => {
        console.tron.log('event', event);
      }
    );

    return () => {
      eventListener.remove();
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Customer</Text>
        <Button title="login" onPress={login} />
        <Button title="signUp" onPress={signUp} />
        <Button title="loginWithToken" onPress={loginWithToken} />
        <Button title="logout" onPress={logout} />
        <Button title="create Customer" onPress={createCustomer} />
        <Button title="getCurrentCustomer" onPress={getCurrentCustomer} />
        <Button title="updateCustomer" onPress={updateCustomer} />
        <Text>Order</Text>
        <Button title="Fetch orders" onPress={fetchOrders} />
        <Button title="Create order" onPress={createOrder} />
        <Button
          title="Fetch Order By RedemptionCode"
          onPress={fetchOrderByRedemptionCode}
        />
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
        <Text>Presence</Text>
        <Button title="start locator" onPress={startLocator} />
        <Button title="stop locator" onPress={stopLocator} />
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
});
