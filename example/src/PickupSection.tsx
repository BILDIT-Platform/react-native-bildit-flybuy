import * as FlyBuyPickup from '@bildit-platform/rn-flybuy-pickup';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './components';

export const PickupSection = () => {
  const onPermissionChanged = () => {
    FlyBuyPickup.onPermissionChanged().then(console.log);
  };

  return (
    <View style={styles.root}>
      <Text>Pickup</Text>
      <Button title="onPermissionChanged" onPress={onPermissionChanged} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    marginTop: 24,
  },
});
