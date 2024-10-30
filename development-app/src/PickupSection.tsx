import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as FlyBuyPickup from 'react-native-bildit-flybuy-pickup';
import {Button, SectionTitle} from './components';

export const PickupSection = () => {
  const onPermissionChanged = () => {
    FlyBuyPickup.onPermissionChanged().then(console.log);
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Pickup" />
      <Button title="onPermissionChanged" onPress={onPermissionChanged} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },
});
