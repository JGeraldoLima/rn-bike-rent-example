import React, { FC } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { LocationIcon } from '@app/assets';

import styles from './styles';

interface NavBarRightItemProps {
  location: string;
}

const NavBarRightItem: FC<NavBarRightItemProps> = ({ location }) => (
  <TouchableOpacity testID="nav-bar-right-item-button" style={styles.button}>
    <Text style={styles.locationText}>{location}</Text>
    <Image source={LocationIcon} />
  </TouchableOpacity>
);

export default NavBarRightItem;
