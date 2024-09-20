import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
};
export const SectionTitle = ({title}: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
