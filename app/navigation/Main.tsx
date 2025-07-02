import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Bikes, Booking } from '@app/screens';
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
        headerRight: () => <NavBarRightItem location="Manhattan" color="#fff" textColor="#fff" />,
        headerLeft: () => <NavBarLeftItem color="#fff" />,
        headerStyle: {
          backgroundColor: '#1F49D1',
        },
      }}
    />
    <MainStack.Screen
      name="Booking"
      component={Booking}
      //options={{ headerShown: false }}
      options={{
        headerShadowVisible: false,
        headerTitle: '',
        headerRight: () => <NavBarRightItem location="Manhattan" color="#222" textColor="#222" />,
        headerLeft: () => <NavBarLeftItem color="#222" />,
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    />
  </MainStack.Navigator>
);

export default Main;
