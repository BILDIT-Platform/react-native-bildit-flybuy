import * as FlyBuyNotify from '@bildit-platform/rn-flybuy-notify';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './components';
import {NOTIFICATION, REGION} from './constants';

export const NotifySection = () => {
  const notifySync = () => {
    FlyBuyNotify.sync(true);
  };

  const clearNotifications = () => {
    FlyBuyNotify.clearNotifications()
      .then(() => console.log('notifications cleared'))
      .catch(err => console.log('err', err));
  };

  const createForSitesInRegion = () => {
    FlyBuyNotify.createForSitesInRegion(REGION, NOTIFICATION)
      .then(sites => console.log('notifications crated', sites))
      .catch(err => console.log('err', err));
  };

  return (
    <View style={styles.root}>
      <Text>Notify</Text>
      <Button title="sync" onPress={notifySync} />
      <Button title="clearNotifications" onPress={clearNotifications} />
      <Button title="createForSitesInRegion" onPress={createForSitesInRegion} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    marginTop: 24,
  },
});
