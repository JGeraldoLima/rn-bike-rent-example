import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import { BikeInfo, ImageSlider, RateContainer } from './fragments';
import { BikeTypeBadge } from '@app/components';
import { Bike } from '@app/models';
import { FavoriteBigIcon, MapImage } from '@app/assets';

import styles from './styles';

interface BikeDetailsModalProps extends ViewProps {
  data: Bike | null;
  handleCloseModal?: () => void;
}

const BikeDetailsModal: FC<BikeDetailsModalProps> = ({
  data,
  handleCloseModal,
  testID,
}) => (
  <View testID={testID}>
    <View style={styles.headerContainer}>
      <ImageSlider
        testID="bike-details-modal-img-slider"
        images={data?.imageUrls}
      />
      <BikeInfo
        testID="bike-details-modal-info"
        bodySize={data?.bodySize}
        maxLoad={data?.maxLoad}
        ratings={data?.ratings}
      />
    </View>

    <ScrollView
      testID="bike-details-modal-scrollview"
      style={styles.scrollView}
    >
      <View style={styles.scrollViewSubContainer}>
        <Text style={styles.bikeTitle}>{data?.name}</Text>
        <View style={styles.bikeTypeContainer}>
          <BikeTypeBadge type={data?.type} />
        </View>
        <Text style={styles.bikeDescription}>{data?.description}</Text>
        <View style={styles.separator} />
        <RateContainer testID="bike-details-modal-rate" rate={data?.rate} />
        <View style={styles.separator} />
        <Text style={styles.addressTitle}>Full adress after booking</Text>
        <View style={styles.mapContainer}>
          <Image resizeMode="contain" source={MapImage} />
        </View>
      </View>
    </ScrollView>

    <View testID="bike-details-modal-footer" style={styles.footerContainer}>
      <TouchableOpacity style={styles.favoriteButton}>
        <Image source={FavoriteBigIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCloseModal}
        style={styles.rentBikeButton}
      >
        <Text style={styles.rentBikeButtonText}>Rent Bike</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default BikeDetailsModal;
