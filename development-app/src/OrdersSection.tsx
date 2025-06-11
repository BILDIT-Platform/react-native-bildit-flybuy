import React, {useEffect, useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  View,
} from 'react-native';
import * as FlyBuyCore from 'react-native-bildit-flybuy-core';
import {
  CustomerState,
  IOrder,
  OrderStateType,
  PickupType,
  PickupMethodOptions,
} from 'react-native-bildit-flybuy-core';
import {Button, OrderItem, SectionTitle} from './components';
import {
  CUSTOMER_INFO,
  NEW_PID,
  ORDER_ID,
  ORDER_PID,
  SITE_ID,
  SITE_PID,
} from './constants';

export const OrdersSection = () => {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.RnFlybuyCore);
    const listener = eventEmitter.addListener(
      'orderUpdated',
      (event: IOrder) => {
        console.log('order updated', event);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  const [orders, setOrders] = useState<IOrder[]>([]);
  const fetchOrders = () => {
    FlyBuyCore.Orders.fetchOrders()
      .then((result: IOrder[]) => {
        console.log('orders', result);
        setOrders(result);
      })
      .catch(err => console.log(err));
  };

  const createOrderWithPartnerIdentification = () => {
    FlyBuyCore.Orders.createOrder({
      sitePartnerIdentifier: SITE_PID,
      orderPid: ORDER_PID,
      customerInfo: CUSTOMER_INFO,
    })
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
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
    FlyBuyCore.Orders.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
      orderState: OrderStateType.DELAYED,
      pickupType: PickupType.DELIVERY,
    })
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.error(err));
  };

  const createOrderWithThreeParams = () => {
    FlyBuyCore.Orders.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
    })
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.error(err));
  };

  const createOrderWithFourParams = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2024-12-02').toISOString(),
    };
    FlyBuyCore.Orders.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
    })
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  const createOrderWithFiveParams = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2024-12-02').toISOString(),
    };
    FlyBuyCore.Orders.createOrder({
      siteId: SITE_ID,
      pid: NEW_PID,
      customerInfo: CUSTOMER_INFO,
      pickupWindow,
      orderState: OrderStateType.DELAYED,
    })
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  const claimOrder = () => {
    FlyBuyCore.Orders.claimOrder(
      '385BQT5BMH',
      CUSTOMER_INFO,
      FlyBuyCore.PickupType.PICKUP,
    )
      .then((order: IOrder) => console.log('claim order', order))
      .catch(err => console.log(err));
  };

  const fetchOrderByRedemptionCode = () => {
    FlyBuyCore.Orders.fetchOrderByRedemptionCode('QDWRBDKJJG')
      .then((order: IOrder) => console.log('order by redemcode', order))
      .catch(err => console.log(err));
  };

  const updateOrderState = (
    orderId = ORDER_ID,
    orderState = OrderStateType.DRIVER_ASSIGNED,
  ) => {
    FlyBuyCore.Orders.updateOrderState(orderId, orderState)
      .then((order: IOrder) => {
        console.log('updateOrderState', order);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  const updateOrderCustomerStateWithSpot = () => {
    FlyBuyCore.Orders.updateOrderCustomerStateWithSpot(
      ORDER_ID,
      CustomerState.WAITING,
      '1',
    )
      .then((order: IOrder) =>
        console.log('updateOrderCustomerStateWithSpot', order),
      )
      .catch(err => console.log(err));
  };

  const updateOrderCustomerState = () => {
    FlyBuyCore.Orders.updateOrderCustomerState(ORDER_ID, CustomerState.DEPARTED)
      .then((order: IOrder) => console.log('updateOrderCustomerState', order))
      .catch(err => console.log(err));
  };

  const rateOrder = (orderId: number) => {
    FlyBuyCore.Orders.rateOrder(orderId ?? ORDER_ID, 5, 'Awesome!')
      .then(order => console.log('rateOrder', order))
      .catch(err => console.log(err));
  };

  const updatePickupMethod = (
    orderId: number,
    options: PickupMethodOptions,
  ) => {
    FlyBuyCore.Orders.updatePickupMethod(orderId, options)
      .then(order => console.log('updatePickupMethod', order))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Orders" />
      <Button title="Fetch orders" onPress={fetchOrders} />

      {orders.map(item => {
        return (
          <OrderItem
            key={item.id}
            data={item}
            onUpdatePickupMethod={options => {
              updatePickupMethod(item.id, options);
            }}
            onUpdateOrderState={orderState =>
              updateOrderState(item.id, orderState)
            }
            onRateOrder={rateOrder}
          />
        );
      })}

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
      <Button
        title="updateOrderCustomerStateWithSpot"
        onPress={updateOrderCustomerStateWithSpot}
      />
      <Button
        title="updateOrderCustomerState"
        onPress={updateOrderCustomerState}
        titleStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },

  button: {
    textAlign: 'center',
  },
});
