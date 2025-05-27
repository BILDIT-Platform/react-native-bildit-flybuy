import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as FlyBuyCore from 'react-native-bildit-flybuy-core';
import {Button, SectionTitle} from './components';

export const LinksSection = () => {
  const parseReferrerUrl = async () => {
    const url = 'utm_source=flybuy&utm_content=flyb.uy/m/o?r=CODE';
    const referrer = await FlyBuyCore.parseReferrerUrl(url);
    console.log('referrer', referrer);
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Links" />
      <Button title="parseReferrerUrl" onPress={parseReferrerUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },
});
