import React from 'react';
import {ButtonProps, StyleSheet, Text, TouchableOpacity} from 'react-native';

export const Button = ({title, ...rest}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.root} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#841584',
    width: '60%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});
