import React from 'react';
import {
  ButtonProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
} & ButtonProps;
export const Button = ({title, containerStyle, titleStyle, ...rest}: Props) => {
  return (
    <TouchableOpacity style={[styles.root, containerStyle]} {...rest}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#841584',
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
