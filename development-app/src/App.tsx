import * as React from 'react';

import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'; 
import Button from './Button';
import FlyBuy, {
  CustomerState,
  ISite,
  OrderStateType,
  PickupType,
  LiveStatus
} from 'react-native-bildit-flybuy';
import {
  Permission,
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import AppConfig from './AppConfig.json';
const ORDER_ID = 85300686;
const SITE_ID = 15942;
const NEW_PID = '01380326929';
const SITE_PID = 'NANGKA30';
const ORDER_PID = '11111111';
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
    const locationPermissions = Platform.select({
      android: [
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ],
      ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
    }) as Permission[];
    const results = await requestMultiple(locationPermissions);
    return Platform.select({
      android: [
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ].every(permission => results[permission] === RESULTS.GRANTED),
      ios: results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED,
    });
  };

  const getNotificationPermission = () => {
    requestNotifications(['alert', 'sound', 'badge']).then(
      ({status, settings}) => {
        console.log(status, settings);
      },
    );
  };

  // Orders
  const fetchOrders = () => {
    FlyBuy.Core.Orders.fetchOrders()
      .then(orders => console.tron.log('orders', orders))
      .catch(err => console.tron.log(err));
  };

  const createOrderWithPartnerIdentification = () => {
    FlyBuy.Core.Orders.createOrder({
      sitePid: SITE_PID,
      orderPid: ORDER_PID,
      customerInfo: CUSTOMER_INFO,
    })
      .then(order => console.tron.log('order', order))
      .catch(err => console.tron.log(err));
  };

  const createOrder = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2022-12-02').toISOString(),
    };
    FlyBuy.Core.Orders.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
      orderState: OrderStateType.DELAYED,
      pickupType: PickupType.DELIVERY,
    })
      .then(order => console.log('order', order))
      .catch(err => console.error(err));
  };

  const createOrderWithThreeParams = () => {
    FlyBuy.Core.Orders.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
    })
      .then(order => console.log('order', order))
      .catch(err => console.error(err));
  };

  const createOrderWithFourParams = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2022-12-02').toISOString(),
    };
    FlyBuy.Core.Orders.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
    })
      .then(order => console.tron.log('order', order))
      .catch(err => console.tron.log(err));
  };

  const createOrderWithFiveParams = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2022-12-02').toISOString(),
    };
    FlyBuy.Core.Orders.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
      orderState: OrderStateType.DELAYED,
    })
      .then(order => console.tron.log('order', order))
      .catch(err => console.tron.log(err));
  };

  const claimOrder = () => {
    FlyBuy.Core.Orders.claimOrder(
      '385BQT5BMH',
      CUSTOMER_INFO,
      PickupType.PICKUP,
    )
      .then(order => console.tron.log('claim order', order))
      .catch(err => console.tron.log(err));
  };

  const fetchOrderByRedemptionCode = () => {
    FlyBuy.Core.Orders.fetchOrderByRedemptionCode('QDWRBDKJJG')
      .then(order => console.tron.log('order by redemcode', order))
      .catch(err => console.tron.log(err));
  };

  const updateOrderState = () => {
    FlyBuy.Core.Orders.updateOrderState(
      ORDER_ID,
      OrderStateType.DRIVER_ASSIGNED,
    )
      .then(order => console.tron.log('updateOrderState', order))
      .catch(err => console.tron.log(err));
  };

  const updateOrderCustomerStateWithSpot = () => {
    FlyBuy.Core.Orders.updateOrderCustomerStateWithSpot(
      ORDER_ID,
      CustomerState.WAITING,
      '1',
    )
      .then(order =>
        console.tron.log('updateOrderCustomerStateWithSpot', order),
      )
      .catch(err => console.tron.log(err));
  };

  const updateOrderCustomerState = () => {
    FlyBuy.Core.Orders.updateOrderCustomerState(
      ORDER_ID,
      CustomerState.DEPARTED,
    )
      .then(order => console.tron.log('updateOrderCustomerState', order))
      .catch(err => console.tron.log(err));
  };

  const rateOrder = () => {
    FlyBuy.Core.Orders.rateOrder(ORDER_ID, 5, 'Awesome!')
      .then(order => console.tron.log('rateOrder', order))
      .catch(err => console.tron.log(err));
  };

  // Customer

  const loginWithToken = () => {
    FlyBuy.Core.Customer.loginWithToken('mEVBKpwecm89bXh1juMwPuYk')
      .then(customer => console.tron.log('customer', customer))
      .catch(err => console.tron.log(err));
  };

  const login = () => {
    FlyBuy.Core.Customer.login('ha_zellat@esi.dz', 'password')
      .then(customer => console.log(customer))
      // .then(customer => console.tron.log('customer', customer))
      .catch(err => console.error(err));
  };

  const signUp = () => {
    FlyBuy.Core.Customer.signUp('ha_zellat@esi.dz', 'password')
      .then(customer => console.tron.log('customer', customer))
      .catch(err => console.tron.log(err));
  };

  const logout = () => {
    FlyBuy.Core.Customer.logout()
      .then(() => console.tron.log('logout success'))
      .catch(err => console.tron.log(err));
  };

  const createCustomer = () => {
    FlyBuy.Core.Customer.createCustomer(CUSTOMER_INFO)
      .then(customer => console.tron.log('customer', customer))
      .catch(err => console.tron.log(err));
  };

  const updateCustomer = () => {
    FlyBuy.Core.Customer.updateCustomer(CUSTOMER_INFO)
      .then(customer => console.tron.log('customer', customer))
      .catch(err => console.tron.log(err));
  };

  const getCurrentCustomer = () => {
    FlyBuy.Core.Customer.getCurrentCustomer()
      .then(customer => console.tron.log('customer', customer))
      .catch(err => console.tron.log(err));
  };

  // Notify

  const clearNotifications = () => {
    FlyBuy.Notify.clearNotifications()
      .then(() => console.tron.log('notifications cleared'))
      .catch(err => console.tron.log('err', err));
  };

  const createForSitesInRegion = () => {
    FlyBuy.Notify.createForSitesInRegion(REGION, NOTIFICATION)
      .then(sites => console.tron.log('notifications crated', sites))
      .catch(err => console.tron.log('err', err));
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
      .catch(err => console.tron.log('err', err));
  };

  // Sites

  const fetchAllSites = () => {
    FlyBuy.Core.Sites.fetchAllSites()
      .then(sites => console.tron.log('sites', sites))
      .catch(err => console.tron.log('err', err));
  };

  const fetchSitesByQuery = () => {
    FlyBuy.Core.Sites.fetchSitesByQuery({
      query: 'Test',
      page: 1,
    })
      .then(sites => console.tron.log('sites', sites))
      .catch(err => console.tron.log('err', err));
  };

  const fetchSitesByRegion = () => {
    FlyBuy.Core.Sites.fetchSitesByRegion({
      per: 20,
      page: 1,
      region: REGION,
    })
      .then(sites => console.tron.log('sites', sites))
      .catch(err => console.tron.log('err', err));
  };

  const fetchSiteByPartnerIdentifier = () => {
    FlyBuy.Core.Sites.fetchSiteByPartnerIdentifier({
      partnerIdentifier: 'NANGKA30',
    })
      .then(site => console.tron.log('site', site))
      .catch(err => console.tron.log('err', err));
  };

  // Prescence

  const startLocator = () => {
    FlyBuy.Presence.startLocatorWithIdentifier(
      '12345678',
      "{'key':'value'}",
    ).then(res => {
      console.tron.log('locatorRssi----->', res);
    });
  };

  const stopLocator = () => {
    FlyBuy.Presence.stopLocator()
      .then(result => {
        console.tron.log(result);
      })
      .catch(e => {
        console.tron.log(e);
      });
  };

  const liveStatus =()=>{
    FlyBuy.LiveStatus.liveStatusConfigure("flybuy")
   console.log("status")
  };
  const notifySync = () => {
    FlyBuy.Notify.sync(true);
  };

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      FlyBuy.Core.configure(AppConfig.APP_TOKEN);
      FlyBuy.Notify.configure();
      FlyBuy.Pickup.configure();
      FlyBuy.Presence.configure(AppConfig.PRESENCE_UUID);
      FlyBuy.Notify.sync(true);
    }
    getNotificationPermission();
    getLocationPermissions();
  }, []);

  React.useEffect(() => {
    const eventListener = FlyBuy.eventEmitter.addListener(
      'orderUpdated',
      (event: any) => {
        console.tron.log('event', event);
      },
    );

    const notifyListener = FlyBuy.eventEmitter.addListener(
      'notifyEvents',
      (event: any) => {
        console.log('notify event', event);
      },
    );

    return () => {
      eventListener.remove();
      notifyListener.remove();
    };
  }, []);

  return (
    <SafeAreaView>
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
            title="Create order 3 Params"
            onPress={createOrderWithThreeParams}
          />
          <Button
            title="Create order 4 Params"
            onPress={createOrderWithFourParams}
          />
          <Button
            title="Create order 5 Params"
            onPress={createOrderWithFiveParams}
          />
          <Button
            title="Create order with site partner identification"
            onPress={createOrderWithPartnerIdentification}
          />
          <Button
            title="Fetch Order By RedemptionCode"
            onPress={fetchOrderByRedemptionCode}
          />
          <Button title="claimOrder" onPress={claimOrder} />
          <Button title="updateOrderState" onPress={updateOrderState} />
          <Button
            title="updateOrderCustomerStateWithSpot"
            onPress={updateOrderCustomerStateWithSpot}
          />
          <Button title="rateOrder" onPress={rateOrder} />
          <Button
            title="updateOrderCustomerState"
            onPress={updateOrderCustomerState}
          />
          <Text>Notify</Text>
          <Button title="sync" onPress={notifySync} />
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
          <Button
            title="fetchSiteByPartnerIdentifier"
            onPress={fetchSiteByPartnerIdentifier}
          />
          <Text>Presence</Text>
          <Button title="start locator" onPress={startLocator} />
          <Button title="stop locator" onPress={stopLocator} />
          <Text>Live Status</Text>
          <Button title="Live Status" onPress={liveStatus} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
