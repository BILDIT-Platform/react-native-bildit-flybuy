import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as FlyBuyPresence from 'react-native-bildit-flybuy-presence';
import {Button, SectionTitle} from './components';

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
      <SectionTitle title="Presence" />
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
    marginTop: 24,
  },
});
