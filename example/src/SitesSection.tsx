import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './components';
import * as FlyBuyCore from '@bildit-platform/rn-flybuy-core';
import {REGION} from './constants';

export const SitesSection = () => {
  const fetchAllSites = () => {
    FlyBuyCore.fetchAllSites()
      .then(sites => console.log('sites', sites))
      .catch(err => console.log('err', err));
  };

  const fetchSitesByQuery = () => {
    FlyBuyCore.fetchSitesByQuery({
      query: 'Test',
      page: 1,
    })
      .then(sites => console.log('sites', sites))
      .catch(err => console.log('err', err));
  };

  const fetchSitesByRegion = () => {
    FlyBuyCore.fetchSitesByRegion({
      per: 20,
      page: 1,
      region: REGION,
    })
      .then(sites => console.log('sites', sites))
      .catch(err => console.log('err', err));
  };

  const fetchSiteByPartnerIdentifier = () => {
    FlyBuyCore.fetchSiteByPartnerIdentifier({
      partnerIdentifier: 'NANGKA30',
    })
      .then(site => console.log('site', site))
      .catch(err => console.log('err', err));
  };

  return (
    <View style={styles.root}>
      <Text>Sites</Text>
      <Button title="fetchAllSites" onPress={fetchAllSites} />
      <Button title="fetchSitesByQuery" onPress={fetchSitesByQuery} />
      <Button title="fetchSitesByRegion" onPress={fetchSitesByRegion} />
      <Button
        title="fetchSiteByPartnerIdentifier"
        onPress={fetchSiteByPartnerIdentifier}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    marginTop: 24,
  },
});
