import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

interface NavBarHeaderProps {
  title: string;
  hasBackButton?: boolean;
  onBackButtonPress?: () => void;
}

const NavBarHeader: FC<NavBarHeaderProps> = ({
  title,
  hasBackButton = false,
  onBackButtonPress,
}) => (
  <View testID="nav-bar-header" style={styles.header}>
    <View style={styles.headerSubContainer}>
      {hasBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBackButtonPress}>
          <Text>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  </View>
);

export default NavBarHeader;
