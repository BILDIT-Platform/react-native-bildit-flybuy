import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as FlyBuyCore from 'react-native-bildit-flybuy-core';
import {Button, SectionTitle} from './components';
import {CUSTOMER_INFO} from './constants';

export const CustomerSection = () => {
  const login = () => {
    FlyBuyCore.Customer.login('ha_zellat@esi.dz', 'password')
      .then(customer => console.log(customer))
      // .then(customer => console.tron.log('customer', customer))
      .catch(err => console.error(err));
  };

  const loginWithToken = () => {
    FlyBuyCore.Customer.loginWithToken('mEVBKpwecm89bXh1juMwPuYk')
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const signUp = () => {
    FlyBuyCore.Customer.signUp('ha_zellat@esi.dz', 'password')
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const logout = () => {
    FlyBuyCore.Customer.logout()
      .then(() => console.log('logout success'))
      .catch(err => console.log(err));
  };

  const createCustomer = () => {
    FlyBuyCore.Customer.createCustomer(CUSTOMER_INFO)
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const updateCustomer = () => {
    FlyBuyCore.Customer.updateCustomer(CUSTOMER_INFO)
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const getCurrentCustomer = () => {
    FlyBuyCore.Customer.getCurrentCustomer()
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Customer" />
      <Button title="Login" onPress={login} />
      <Button title="signUp" onPress={signUp} />
      <Button title="loginWithToken" onPress={loginWithToken} />
      <Button title="logout" onPress={logout} />
      <Button title="create Customer" onPress={createCustomer} />
      <Button title="getCurrentCustomer" onPress={getCurrentCustomer} />
      <Button title="updateCustomer" onPress={updateCustomer} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
