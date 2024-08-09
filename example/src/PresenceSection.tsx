import * as FlyBuyPresence from '@bildit-platform/rn-flybuy-presence';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './components';

export const PresenceSection = () => {
  const startLocatorWithIdentifier = () => {
    FlyBuyPresence.startLocatorWithIdentifier('12345678', "{'key':'value'}")
      .then(console.log)
      .catch(console.log);
  };

  const stopLocator = () => {
    FlyBuyPresence.stopLocator().then(console.log);
  };

  return (
    <View style={styles.root}>
      <Text>Presence</Text>
      <Button
        title="startLocatorWithIdentifier"
        onPress={startLocatorWithIdentifier}
      />
      <Button title="stopLocator" onPress={stopLocator} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    marginTop: 24,
  },
});
