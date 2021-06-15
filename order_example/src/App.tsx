import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import Button from './Button';
import FlyBuy from 'react-native-bildit-flybuy';

const NEW_ORDER_ID = 15942;
const CUSTOMER_INFO = {
  name: 'Lamia Selmane AB',
  carType: 'Nothing',
  carColor: 'Silver',
  licensePlate: 'Nothing',
  phone: '555-555-5555',
};

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text>{'#id'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>{'#PatnerId'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1}>{'Customer'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'right' }}>{'State'}</Text>
      </View>
    </View>
  );
};

const OrderItem = ({ order, onUpdate }) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.flexOne}>
        <Text>{order.id}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text>{order.partnerIdentifier}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text numberOfLines={1}>{order.customerName}</Text>
      </View>
      <View style={styles.flexOne}>
        {order.customerState === 'created' && (
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.updateBtn} onPress={onUpdate}>
              <Text>Start</Text>
            </TouchableOpacity>
          </View>
        )}
        {order.customerState === 'en_route' && (
          <Text style={styles.enRoute}>{'On the way'}</Text>
        )}
      </View>
    </View>
  );
};

export default function App() {
  const [orders, setOrders] = useState([]);
  const [partnerId, setPartnerId] = useState('');
  // Orders
  const fetchOrders = () => {
    FlyBuy.Core.Orders.fetchOrders()
      .then((orders) => setOrders([...orders]))
      .catch((err) => console.log(err));
  };

  const createOrder = () => {
    const pickupWindow = {
      start: new Date().toISOString(),
      end: new Date('2022-12-02').toISOString(),
    };
    FlyBuy.Core.Orders.createOrder(
      NEW_ORDER_ID,
      partnerId,
      CUSTOMER_INFO,
      pickupWindow,
      'delayed',
      'delivery'
    )
      .then((order) => {
        console.log('order is created!', order);
        fetchOrders();
      })
      .catch((err) => console.tron.log(err));
  };

  const updateToStart = (order) => {
    FlyBuy.Core.Orders.updateOrderCustomerState(order.id, 'en_route')
      .then((order) => {
        fetchOrders();
      })
      .catch((err) => console.log('error on catch-->', err));
  };

  const login = () => {
    FlyBuy.Core.Customer.login('ha_zellat@esi.dz', 'password')
      .then((customer) => console.tron.log('customer', customer))
      .catch((err) => console.tron.log(err));
  };

  React.useEffect(() => {
    FlyBuy.Core.configure('224.epegiXJkGRqvwLJJYHPTCWGR');
    FlyBuy.Notify.configure();
    FlyBuy.Pickup.configure();
    fetchOrders();
  }, []);

  const renderItem = ({ item }) => (
    <OrderItem
      order={item}
      onUpdate={() => {
        updateToStart(item);
      }}
    />
  );
  const onChangePid = (e) => {
    setPartnerId(e);
  };
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={login} />
      <Header />
      <FlatList
        style={{ width: '100%', paddingHorizontal: 10 }}
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
      <Button title="New Order With" onPress={createOrder} />
      <TextInput
        placeholder="Partner ID"
        style={styles.partner}
        value={partnerId}
        onChangeText={(e) => {
          onChangePid(e);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  enRoute: {
    textAlign: 'right',
    color: 'green',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  partner: {
    width: 150,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  updateBtn: {
    backgroundColor: '#23fe24',
    borderRadius: 8,
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingVertical: 40,
  },
  orderItem: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  header: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    fontWeight: 'bold',
    backgroundColor: 'grey',
    color: 'white',
    marginTop: 30,
  },
  flexOne: {
    flex: 1,
  },
});
