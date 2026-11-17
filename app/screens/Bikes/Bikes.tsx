import React, { FC, useRef, useCallback, useState, useLayoutEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Platform, View, BackHandler } from 'react-native';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useAvailableBikes } from '@app/hooks';
import {
  BikeCard,
  BottomSheetModal,
  NavBarHeader,
  BikeDetailsModal,
  NavBarRightItem,
  NavBarLeftItem,
} from '@app/components';
import { Bike } from '@app/models';

import styles from './styles';

const snapPoints = Platform.OS === 'ios' ? ['88%'] : ['92%'];

const Bikes: FC = () => {
  const { data, isLoading, refresh } = useAvailableBikes();

  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const bottomSheetRef = useRef<GorhomBottomSheetModal>(null);

  const route = useRoute();
  const navigation = useNavigation();

  const handleBikeCardOnPress = useCallback((item: Bike) => {
    setSelectedBike(item);
    bottomSheetRef.current?.present();
  }, []);

  const itemSeparatorComponent = useCallback(
    () => <View style={styles.listItemSeparator} />,
    []
  );

  const handleCloseModal = useCallback(
    () => bottomSheetRef.current?.dismiss(),
    []
  );

  // Handle back button when modal is open
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (selectedBike) {
          handleCloseModal();
          setSelectedBike(null);
          return true; // Prevent default back behavior
        }
        return false; // Allow default back behavior
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [selectedBike, handleCloseModal])
  );

  useLayoutEffect(() => {
    if (selectedBike) {
      navigation.setOptions({
        headerStyle: { backgroundColor: '#fff' },
        headerRight: () => <NavBarRightItem location="Manhattan" color="#222" textColor="#222" />, // black icons/text
        headerLeft: () => <NavBarLeftItem color="#222" />, // black icon
      });
    } else {
      navigation.setOptions({
        headerStyle: { backgroundColor: '#1F49D1' },
        headerRight: () => <NavBarRightItem location="Manhattan" color="#fff" textColor="#fff" />, // white icons/text
        headerLeft: () => <NavBarLeftItem color="#fff" />, // white icon
      });
    }
  }, [selectedBike, navigation]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <NavBarHeader title={route.name} />
      <View style={styles.listContainer}>
        {data && (
          <FlashList
            renderItem={({ item }: { item: Bike }) => (
              <BikeCard
                onPress={() => handleBikeCardOnPress(item)}
                data={item}
              />
            )}
            estimatedItemSize={200}
            data={data}
            ItemSeparatorComponent={itemSeparatorComponent}
            refreshing={isLoading}
            onRefresh={refresh}
          />
        )}
        {isLoading && <ActivityIndicator color="white" size="large" />}
      </View>
      <BottomSheetModal ref={bottomSheetRef} snapPoints={snapPoints}>
        <BikeDetailsModal
          handleCloseModal={handleCloseModal}
          data={selectedBike}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default Bikes;
