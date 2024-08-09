import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as FlyBuyCore from '@bildit-platform/rn-flybuy-core';
import {Button} from './components';
import {CUSTOMER_INFO} from './constants';

export const CustomerSection = () => {
  const login = () => {
    FlyBuyCore.login('ha_zellat@esi.dz', 'password')
      .then(customer => console.log(customer))
      // .then(customer => console.tron.log('customer', customer))
      .catch(err => console.error(err));
  };

  const loginWithToken = () => {
    FlyBuyCore.loginWithToken('mEVBKpwecm89bXh1juMwPuYk')
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const signUp = () => {
    FlyBuyCore.signUp('ha_zellat@esi.dz', 'password')
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const logout = () => {
    FlyBuyCore.logout()
      .then(() => console.log('logout success'))
      .catch(err => console.log(err));
  };

  const createCustomer = () => {
    FlyBuyCore.createCustomer(CUSTOMER_INFO)
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const updateCustomer = () => {
    FlyBuyCore.updateCustomer(CUSTOMER_INFO)
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const getCurrentCustomer = () => {
    FlyBuyCore.getCurrentCustomer()
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.root}>
      <Text>Customer</Text>
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
    alignItems: 'center',
    marginTop: 24,
  },
});
