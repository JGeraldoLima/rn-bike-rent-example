import React, { FC } from 'react';
import { View, Text, ViewProps } from 'react-native';

import styles from './styles';

interface BikeTypeBadgeProps extends ViewProps {
  type?: string;
}

const BikeTypeBadge: FC<BikeTypeBadgeProps> = ({ type, testID }) => (
  <View testID={testID} style={styles.bikeTypeContainer}>
    <Text style={styles.bikeTypeText}>{type}</Text>
  </View>
);

export default BikeTypeBadge;
