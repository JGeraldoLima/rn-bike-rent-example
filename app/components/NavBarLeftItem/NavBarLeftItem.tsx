import React, { FC } from 'react';
import { TouchableOpacity, Image, ImageStyle } from 'react-native';
import { MenuIcon } from '@app/assets';

import styles from './styles';

interface NavBarLeftItemProps {
  color?: string;
}

const NavBarLeftItem: FC<NavBarLeftItemProps> = ({ color = '#fff' }) => (
  <TouchableOpacity testID="nav-bar-left-item-button" style={styles.button}>
    <Image source={MenuIcon} style={{ tintColor: color } as ImageStyle} />
  </TouchableOpacity>
);

export default NavBarLeftItem;
