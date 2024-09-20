import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {OrderStateType} from 'react-native-bildit-flybuy-core';
import {Button} from './Button';

type Props = {
  visible?: boolean;
  onClose: () => void;
  onSelect: (value: OrderStateType) => void;
};
export const OrderStateModal = ({visible, onClose, onSelect}: Props) => {
  return (
    <Modal visible={visible} style={styles.modal} presentationStyle="pageSheet">
      <View style={styles.root}>
        <Text style={styles.title}>Change Order State</Text>
        {Object.values(OrderStateType).map(item => (
          <TouchableOpacity
            key={item}
            style={styles.option}
            onPress={() => {
              onSelect(item);
              onClose();
            }}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Close" onPress={onClose} containerStyle={styles.close} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  option: {
    margin: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  close: {
    marginVertical: 24,
  },
});
