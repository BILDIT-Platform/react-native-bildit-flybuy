import * as FlyBuyNotify from 'react-native-bildit-flybuy-notify';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, SectionTitle} from './components';
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
      <SectionTitle title="Notify" />
      <Button title="sync" onPress={notifySync} />
      <Button title="clearNotifications" onPress={clearNotifications} />
      <Button title="createForSitesInRegion" onPress={createForSitesInRegion} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },
});
