import React, { FC } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { MenuIcon } from '@app/assets';

import styles from './styles';

const NavBarLeftItem: FC = () => (
  <TouchableOpacity testID="nav-bar-left-item-button" style={styles.button}>
    <Image source={MenuIcon} />
  </TouchableOpacity>
);

export default NavBarLeftItem;
