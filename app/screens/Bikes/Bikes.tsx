import React, { FC, useRef, useCallback, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Platform, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useBikes } from '@app/hooks';
import {
  BikeCard,
  BottomSheetModal,
  NavBarHeader,
  BikeDetailsModal,
} from '@app/components';
import { Bike } from '@app/models';

import styles from './styles';

const snapPoints = Platform.OS === 'ios' ? ['88%'] : ['92%'];

const Bikes: FC = () => {
  const { data, isLoading, refetch } = useBikes();

  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const bottomSheetRef = useRef<GorhomBottomSheetModal>(null);

  const route = useRoute();

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
            onRefresh={refetch}
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
