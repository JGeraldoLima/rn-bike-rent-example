import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, ToastAndroid, Platform, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Bike } from '@app/models/Bike';
import { BackIcon, CalendarIcon } from '@app/assets';
import { sharedStyles } from '../../components/sharedStyles';
import { Calendar } from 'react-native-calendars';
import useRentAmount from '../../hooks/useRentAmount';
import useBooking from '../../hooks/useBooking';

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

  const getMarkedDates = () => {
    if (!startDate) {
      // Only today
      return {
        [today]: {
          customStyles: {
            container: {
              borderWidth: 1,
              borderColor: '#fff',
              backgroundColor: 'transparent',
            },
            text: {
              color: '#fff',
              fontWeight: 'bold',
            },
          },
        },
      };
    }
    const marked: any = {};
    // Mark today
    marked[today] = {
      customStyles: {
        container: {
          borderWidth: 1,
          borderColor: '#fff',
          backgroundColor: 'transparent',
        },
        text: {
          color: '#fff',
          fontWeight: 'bold',
        },
      },
    };
    
    if (!endDate || startDate === endDate) {
      marked[startDate] = {
        customStyles: {
          container: {
            backgroundColor: '#fff',
            borderRadius: 20,
          },
          text: {
            color: '#1F49D1',
            fontWeight: 'bold',
          },
        },
      };
      return marked;
    }
    // Range selection
    let current = new Date(startDate);
    const end = new Date(endDate);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      if (dateStr === startDate) {
        marked[dateStr] = {
          customStyles: {
            container: {
              backgroundColor: '#fff',
              borderRadius: 20,
            },
            text: {
              color: '#1F49D1',
              fontWeight: 'bold',
            },
          },
        };
      } else if (dateStr === endDate) {
        marked[dateStr] = {
          customStyles: {
            container: {
              backgroundColor: '#fff',
              borderRadius: 20,
            },
            text: {
              color: '#1F49D1',
              fontWeight: 'bold',
            },
          },
        };
      } else {
        marked[dateStr] = {
          customStyles: {
            container: {
              backgroundColor: '#3A5DE7',
              borderRadius: 20,
            },
            text: {
              color: '#fff',
              fontWeight: 'bold',
            },
          },
        };
      }
      current.setDate(current.getDate() + 1);
    }
    return marked;
  };

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
          {rentAmountError && <Text style={{ color: 'red' }}>{rentAmountError}</Text>}
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
      <Modal
        visible={calendarVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCalendarVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModal}>
            <View style={styles.modalHandle} />
            <Calendar
              markingType="custom"
              markedDates={getMarkedDates()}
              onDayPress={onDayPress}
              theme={{
                backgroundColor: '#1F49D1',
                calendarBackground: '#1F49D1',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#FFD775',
                selectedDayTextColor: '#1F49D1',
                todayTextColor: '#FFD775',
                dayTextColor: '#fff',
                monthTextColor: '#fff',
                arrowColor: '#fff',
                textDisabledColor: '#A0A0A0',
                textDayFontWeight: 'bold',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 22,
                textDayHeaderFontSize: 14,
              }}
              style={{ borderRadius: 20 }}
            />
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => {
                setConfirmedStartDate(startDate);
                setConfirmedEndDate(endDate);
                setCalendarVisible(false);
              }}
            >
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, position: 'relative', height: 60 },
  backButton: { marginBottom: 0, marginRight: 16, borderColor: '#E0E0E0', borderWidth: 1, zIndex: 2 },
  backIcon: { width: 24, height: 24, tintColor: '#222' },
  title: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 34, fontWeight: 'bold', color: '#000', zIndex: 1 },
  bikeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 30, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#E0E0E0' },
  bikeImage: { width: 80, height: 80, borderRadius: 12, marginRight: 16, backgroundColor: '#eee' },
  bikeInfo: { flex: 1 },
  bikeName: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  bikeTypeBadge: { backgroundColor: '#FFE082', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2, alignSelf: 'flex-start', marginVertical: 4 },
  bikeTypeText: { color: '#222', fontWeight: '600', fontSize: 12 },
  bikeRateContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  bikeRate: { fontSize: 18, color: '#222', marginTop: 4, fontWeight: 'bold' },
  bikeRateUnit: { fontSize: 18, color: '#222', marginTop: 4},
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#222' },
  datePicker: { backgroundColor: '#fff', borderRadius: 30, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#E0E0E0' },
  calendarIcon: { width: 24, height: 24, marginRight: 10, tintColor: '#1F49D1' },
  datePickerText: { fontSize: 16, color: '#222' },
  overviewDivider: { height: 1, backgroundColor: '#E0E0E0', marginBottom: 10 },
  overviewRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  overviewLabel: { color: '#888', fontSize: 14 },
  overviewValue: { color: '#222', fontSize: 14 },
  overviewTotalLabel: { color: '#222', fontWeight: 'bold', fontSize: 16 },
  overviewTotalValue: { color: '#222', fontWeight: 'bold', fontSize: 24 },
  addButton: { backgroundColor: '#1F49D1', borderRadius: 24, margin: 20, paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-end' },
  calendarModal: { backgroundColor: '#1F49D1', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 0 },
  modalHandle: { alignSelf: 'center', width: 60, height: 6, borderRadius: 3, backgroundColor: '#fff', marginBottom: 16 },
  selectButton: { backgroundColor: '#FFD775', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 20, marginBottom: 10 },
  selectButtonText: { color: '#222', fontWeight: 'bold', fontSize: 18 },
  confirmationOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  confirmationModal: { backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', width: '90%' },
  confirmationTitle: { fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  confirmationSubtitle: { fontSize: 16, color: '#222', marginBottom: 16 },
  confirmationImage: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 16 },
  confirmationBikeName: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  confirmationBadge: { backgroundColor: '#FFE082', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 24 },
  confirmationBadgeText: { color: '#222', fontWeight: '600', fontSize: 14 },
  confirmationButton: { backgroundColor: '#1F49D1', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center', marginTop: 8 },
  confirmationButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default Booking; 