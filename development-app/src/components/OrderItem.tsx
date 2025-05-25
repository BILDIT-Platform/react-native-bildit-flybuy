import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  IOrder,
  OrderStateType,
  PickupMethodOptions,
  PickupType,
} from 'react-native-bildit-flybuy-core';
import {OrderStateModal} from './OrderStateModal';

type Props = {
  data: IOrder;
  onUpdateOrderState: (orderState: OrderStateType) => void;
  onUpdatePickupMethod: (options: PickupMethodOptions) => void;
  onRateOrder: (orderId: number) => void;
};

const Row = ({
  label,
  value,
  onPress,
  isLink,
}: {
  label?: string;
  value?: string | number;
  onPress?: () => void;
  isLink?: boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.row, isLink && styles.rowLink]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};
export const OrderItem = ({
  data,
  onUpdateOrderState,
  onUpdatePickupMethod,
  onRateOrder,
}: Props) => {
  const [showOrderStateModal, setShowOrderStateModal] = useState(false);

  if (!data) {
    return null;
  }
  return (
    <View style={styles.root}>
      <Row label="ID" value={data.id} />
      <Row label="Customer Name" value={data.customerName} />
      <Row
        label="Order State"
        value={data.state}
        onPress={() => setShowOrderStateModal(true)}
        isLink
      />
      <Row label="Customer State" value={data.customerState} />
      <Row
        label="Rating"
        value={
          data.customerRating != '' ? data.customerRating : 'Click to rate'
        }
        onPress={() => {
          onRateOrder(data.id);
        }}
      />
      <Row
        label="Comment"
        value={data.customerComment ?? 'Click to comment'}
        onPress={() => {
          onRateOrder(data.id);
        }}
      />
      <Row
        label="Car Color"
        value={data.customerCarColor ?? 'Click add car color'}
        onPress={() => {
          onUpdatePickupMethod({
            pickupType: PickupType.CURBSIDE,
            customerCarColor: 'Red',
          });
        }}
      />

      <OrderStateModal
        onClose={() => setShowOrderStateModal(false)}
        visible={showOrderStateModal}
        onSelect={onUpdateOrderState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 8,
    flex: 1,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  rowLink: {
    backgroundColor: 'pink',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {},
});
