import * as React from 'react';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type ButtonProps = {
  title: string;
  color?: string;
  onPress?: () => void;
};

const Button = ({ title, color = '#841584', onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 15,
  },
  button: {
    width: '60%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
