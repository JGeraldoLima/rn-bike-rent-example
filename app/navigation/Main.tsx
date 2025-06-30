import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Bikes } from '@app/screens';
import { NavBarRightItem, NavBarLeftItem } from '@app/components';

const MainStack = createStackNavigator();

const Main: FC = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Bike Rental"
      component={Bikes}
      options={{
        headerShadowVisible: false,
        headerTitle: '',
        headerRight: () => <NavBarRightItem location="Manhattan" />,
        headerLeft: () => <NavBarLeftItem />,
        headerStyle: {
          backgroundColor: '#1F49D1',
        },
      }}
    />
  </MainStack.Navigator>
);

export default Main;
