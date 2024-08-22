import * as FlyBuyCore from 'react-native-bildit-flybuy-core';
import {
  OrderStateType,
  CustomerState,
  PickupType,
  IOrder,
} from 'react-native-bildit-flybuy-core';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './components';
import {
  CUSTOMER_INFO,
  NEW_PID,
  ORDER_ID,
  ORDER_PID,
  SITE_ID,
  SITE_PID,
} from './constants';

export const OrdersSection = () => {
  const fetchOrders = () => {
    FlyBuyCore.fetchOrders()
      .then((orders: IOrder[]) => console.log('orders', orders))
      .catch(err => console.log(err));
  };

  const createOrderWithPartnerIdentification = () => {
    FlyBuyCore.createOrder({
      sitePartnerIdentifier: SITE_PID,
      orderPid: ORDER_PID,
      customerInfo: CUSTOMER_INFO,
    })
      .then((order: IOrder) => console.log('order', order))
      .catch(err => console.log(err));
  };

  const createOrder = () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);
    const pickupWindow = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    FlyBuyCore.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
      orderState: OrderStateType.DELAYED,
      pickupType: PickupType.DELIVERY,
    })
      .then((order: IOrder) => console.log('order', order))
      .catch(err => console.error(err));
  };

  const createOrderWithThreeParams = () => {
    FlyBuyCore.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
    })
      .then((order: IOrder) => console.log('order with 3 params', order))
      .catch(err => console.error(err));
  };

  const createOrderWithFourParams = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2024-12-02').toISOString(),
    };
    FlyBuyCore.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
    })
      .then((order: IOrder) => console.log('order', order))
      .catch(err => console.log(err));
  };

  const createOrderWithFiveParams = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2024-12-02').toISOString(),
    };
    FlyBuyCore.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
      orderState: OrderStateType.DELAYED,
    })
      .then((order: IOrder) => console.log('order', order))
      .catch(err => console.log(err));
  };

  const claimOrder = () => {
    FlyBuyCore.claimOrder(
      '385BQT5BMH',
      CUSTOMER_INFO,
      FlyBuyCore.PickupType.PICKUP,
    )
      .then((order: IOrder) => console.log('claim order', order))
      .catch(err => console.log(err));
  };

  const fetchOrderByRedemptionCode = () => {
    FlyBuyCore.fetchOrderByRedemptionCode('QDWRBDKJJG')
      .then((order: IOrder) => console.log('order by redemcode', order))
      .catch(err => console.log(err));
  };

  const updateOrderState = () => {
    FlyBuyCore.updateOrderState(ORDER_ID, OrderStateType.DRIVER_ASSIGNED)
      .then((order: IOrder) => console.log('updateOrderState', order))
      .catch(err => console.log(err));
  };

  const updateOrderCustomerStateWithSpot = () => {
    FlyBuyCore.updateOrderCustomerStateWithSpot(
      ORDER_ID,
      CustomerState.WAITING,
      '1',
    )
      .then((order: IOrder) => console.log('updateOrderCustomerStateWithSpot', order))
      .catch(err => console.log(err));
  };

  const updateOrderCustomerState = () => {
    FlyBuyCore.updateOrderCustomerState(ORDER_ID, CustomerState.DEPARTED)
      .then((order: IOrder) => console.log('updateOrderCustomerState', order))
      .catch(err => console.log(err));
  };

  const rateOrder = () => {
    FlyBuyCore.rateOrder(ORDER_ID, 5, 'Awesome!')
      .then(order => console.log('rateOrder', order))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.root}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    marginTop: 24,
  },
});
