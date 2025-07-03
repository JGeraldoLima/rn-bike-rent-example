import React, { FC } from 'react';
import { TouchableOpacity, Text, Image, ImageStyle, TextStyle } from 'react-native';
import { LocationIcon } from '@app/assets';

import styles from './styles';

interface NavBarRightItemProps {
  location: string;
  color?: string;
  textColor?: string;
}

const NavBarRightItem: FC<NavBarRightItemProps> = ({ location, color = '#fff', textColor = '#fff' }) => (
  <TouchableOpacity testID="nav-bar-right-item-button" style={styles.button}>
    <Text style={[styles.locationText, { color: textColor } as TextStyle]}>{location}</Text>
    <Image source={LocationIcon} style={{ tintColor: color } as ImageStyle} />
  </TouchableOpacity>
);

export default NavBarRightItem;
