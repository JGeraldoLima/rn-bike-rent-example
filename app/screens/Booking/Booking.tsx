import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, ToastAndroid, Platform, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Bike } from '@app/models/Bike';
import { BackIcon, CalendarIcon } from '@app/assets';
import { sharedStyles } from '../../components/sharedStyles';
import {useRentAmount} from '@app/hooks';
import {useBooking}  from '@app/hooks';
import { CalendarModal } from '@app/components';
import { styles, BOOKING_COLORS, BOOKING_RADIUS } from './styles';

interface BookingScreenParams {
  bike: Bike;
  startDate?: string;
  endDate?: string;
}

type BookingRouteProp = RouteProp<{ Booking: BookingScreenParams }, 'Booking'>;

const Booking: React.FC = () => {
  const route = useRoute<BookingRouteProp>();
  const navigation = useNavigation();
  const { bike } = route.params;

  // Date range state
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [confirmedStartDate, setConfirmedStartDate] = useState<string | undefined>(undefined);
  const [confirmedEndDate, setConfirmedEndDate] = useState<string | undefined>(undefined);
  const [bookingTrigger, setBookingTrigger] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // Handle date selection
  const onDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(undefined);
    } else if (startDate && !endDate) {
      if (day.dateString < startDate) {
        setEndDate(startDate);
        setStartDate(day.dateString);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  };

  // Use hooks for rent amount and booking
  const userId = 0; // using fake user id from env or hardcoded for now
  const {
    rentAmount,
    rentAmountLoading,
    rentAmountError,
    fee,
    totalAmount,
  } = useRentAmount(
    bike.id ?? null,
    userId,
    confirmedStartDate ?? null,
    confirmedEndDate ?? null
  );

  const {
    booking,
    bookingLoading,
    bookingError,
  } = useBooking(
    bike.id ?? null,
    userId,
    confirmedStartDate ?? null,
    confirmedEndDate ?? null,
    bookingTrigger
  );

  // Show confirmation modal on successful booking
  useEffect(() => {
    if (booking && !bookingLoading && !bookingError) {
      setConfirmationVisible(true);
      setBookingTrigger(false); // reset trigger
    }
  }, [booking, bookingLoading, bookingError]);

  // Show toast on error
  useEffect(() => {
    if (rentAmountError) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(rentAmountError, ToastAndroid.LONG);
      } else {
        Alert.alert('Error', rentAmountError);
      }
    }
    if (bookingError) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(bookingError, ToastAndroid.LONG);
      } else {
        Alert.alert('Error', bookingError);
      }
    }
  }, [rentAmountError, bookingError]);

  const handleAddToBooking = () => {
    setBookingTrigger(true);
  };

  const handleGoHome = () => {
    setConfirmationVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={[sharedStyles.squareRoundedButton, styles.backButton]}
            onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Booking</Text>
        </View>
        <View style={styles.bikeCard}>
          <Image source={{ uri: bike.imageUrls[0] }} style={styles.bikeImage} />
          <View style={styles.bikeInfo}>
            <Text style={styles.bikeName}>{bike.name}</Text>
            <View style={styles.bikeTypeBadge}><Text style={styles.bikeTypeText}>{bike.type}</Text></View>
            <View style={styles.bikeRateContainer}>
                <Text style={styles.bikeRate}>{bike.rate} €/</Text>
                <Text style={styles.bikeRateUnit}>Day</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Select date and time</Text>
        <TouchableOpacity style={styles.datePicker} onPress={() => setCalendarVisible(true)}>
          <Image source={CalendarIcon} style={styles.calendarIcon} />
          <Text style={styles.datePickerText}>
            {startDate && endDate
              ? `From ${formatDate(startDate)} to ${formatDate(endDate)}`
              : 'Select dates'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Booking Overview</Text>
        <View style={styles.overviewDivider} />
        <View>
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>Subtotal</Text>
            <Text style={styles.overviewValue}>{rentAmount !== null ? rentAmount.toFixed(2) : '-'} €</Text>
          </View>
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>Service Free</Text>
            <Text style={styles.overviewValue}>{fee !== null ? fee.toFixed(2) : '-'} €</Text>
          </View>
          <View style={styles.overviewRow}>
            <Text style={styles.overviewTotalLabel}>Total</Text>
            <Text style={styles.overviewTotalValue}>{totalAmount !== null ? totalAmount.toFixed(2) : '-'} €</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToBooking}>
        <Text style={styles.addButtonText}>Add to booking</Text>
      </TouchableOpacity>
      <CalendarModal
        visible={calendarVisible}
        startDate={startDate}
        endDate={endDate}
        onDayPress={onDayPress}
        onSelect={() => {
          setConfirmedStartDate(startDate);
          setConfirmedEndDate(endDate);
          setCalendarVisible(false);
        }}
        onClose={() => setCalendarVisible(false)}
      />
      <Modal
        visible={confirmationVisible}
        transparent
        animationType="fade"
        onRequestClose={handleGoHome}>
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationModal}>
            <Text style={styles.confirmationTitle}>Thank you!</Text>
            <Text style={styles.confirmationSubtitle}>Your bike is booked.</Text>
            <Image source={{ uri: bike.imageUrls[0] }} style={styles.confirmationImage} />
            <Text style={styles.confirmationBikeName}>{bike.name}</Text>
            <View style={styles.confirmationBadge}><Text style={styles.confirmationBadgeText}>{bike.type}</Text></View>
            <TouchableOpacity style={styles.confirmationButton} onPress={handleGoHome}>
              <Text style={styles.confirmationButtonText}>Go to Home Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Booking; 