import React, { FC } from 'react';
import { View, Text, ViewProps } from 'react-native';

import styles from './styles';

interface RateContainerProps extends ViewProps {
  rate?: number;
}

const RateContainer: FC<RateContainerProps> = ({ rate, testID }) => (
  <View testID={testID}>
    <View style={styles.leftContainer}>
      <Text style={styles.leftTitle}>Day</Text>
      <Text style={styles.rightTitle}>{rate} €</Text>
    </View>
    <View style={styles.rightContainer}>
      <Text style={styles.leftTitle}>Week</Text>
      <Text style={styles.rightTitle}>{rate && rate * 7} €</Text>
    </View>
  </View>
);

export default RateContainer;
