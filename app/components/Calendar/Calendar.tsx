import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { styles, CALENDAR_COLORS, CALENDAR_RADIUS, CALENDAR_FONT } from './styles';

interface CalendarModalProps {
  visible: boolean;
  startDate?: string;
  endDate?: string;
  onDayPress: (day: any) => void;
  onSelect: () => void;
  onClose: () => void;
  selectLabel?: string;
  calendarTheme?: object;
}

const getMarkedDates = (startDate?: string, endDate?: string) => {
  const today = new Date().toISOString().split('T')[0];
  if (!startDate) {
    return {
      [today]: {
        customStyles: {
          container: {
            borderWidth: 1,
            borderColor: CALENDAR_COLORS.todayBorder,
            backgroundColor: CALENDAR_COLORS.transparent,
          },
          text: {
            color: CALENDAR_COLORS.todayText,
            fontWeight: CALENDAR_FONT.weightBold,
          },
        },
      },
    };
  }
  const marked: any = {};
  marked[today] = {
    customStyles: {
      container: {
        borderWidth: 1,
        borderColor: CALENDAR_COLORS.todayBorder,
        backgroundColor: CALENDAR_COLORS.transparent,
      },
      text: {
        color: CALENDAR_COLORS.todayText,
        fontWeight: CALENDAR_FONT.weightBold,
      },
    },
  };
  if (!endDate || startDate === endDate) {
    marked[startDate] = {
      customStyles: {
        container: {
          backgroundColor: CALENDAR_COLORS.selectedDayBackground,
          borderRadius: CALENDAR_RADIUS.day,
        },
        text: {
          color: CALENDAR_COLORS.selectedDayText,
          fontWeight: CALENDAR_FONT.weightBold,
        },
      },
    };
    return marked;
  }
  let current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    if (dateStr === startDate) {
      marked[dateStr] = {
        customStyles: {
          container: {
            backgroundColor: CALENDAR_COLORS.selectedDayBackground,
            borderRadius: CALENDAR_RADIUS.day,
          },
          text: {
            color: CALENDAR_COLORS.selectedDayText,
            fontWeight: CALENDAR_FONT.weightBold,
          },
        },
      };
    } else if (dateStr === endDate) {
      marked[dateStr] = {
        customStyles: {
          container: {
            backgroundColor: CALENDAR_COLORS.selectedDayBackground,
            borderRadius: CALENDAR_RADIUS.day,
          },
          text: {
            color: CALENDAR_COLORS.selectedDayText,
            fontWeight: CALENDAR_FONT.weightBold,
          },
        },
      };
    } else {
      marked[dateStr] = {
        customStyles: {
          container: {
            backgroundColor: CALENDAR_COLORS.rangeBackground,
            borderRadius: CALENDAR_RADIUS.day,
          },
          text: {
            color: CALENDAR_COLORS.rangeText,
            fontWeight: CALENDAR_FONT.weightBold,
          },
        },
      };
    }
    current.setDate(current.getDate() + 1);
  }
  return marked;
};

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  startDate,
  endDate,
  onDayPress,
  onSelect,
  onClose,
  selectLabel = 'Select',
  calendarTheme = {},
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onClose}>
    <View style={styles.modalOverlay}>
      <View style={styles.calendarModal}>
        <View style={styles.modalHandle} />
        <RNCalendar
          markingType="custom"
          markedDates={getMarkedDates(startDate, endDate)}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: CALENDAR_COLORS.background,
            calendarBackground: CALENDAR_COLORS.background,
            textSectionTitleColor: CALENDAR_COLORS.todayText,
            selectedDayBackgroundColor: CALENDAR_COLORS.serviceFee,
            selectedDayTextColor: CALENDAR_COLORS.selectedDayText,
            todayTextColor: CALENDAR_COLORS.serviceFee,
            dayTextColor: CALENDAR_COLORS.todayText,
            monthTextColor: CALENDAR_COLORS.todayText,
            arrowColor: CALENDAR_COLORS.todayText,
            textDisabledColor: CALENDAR_COLORS.disabledText,
            textDayFontWeight: CALENDAR_FONT.weightBold,
            textMonthFontWeight: CALENDAR_FONT.weightBold,
            textDayHeaderFontWeight: CALENDAR_FONT.weightBold,
            textDayFontSize: CALENDAR_FONT.dayFontSize,
            textMonthFontSize: CALENDAR_FONT.monthFontSize,
            textDayHeaderFontSize: CALENDAR_FONT.dayHeaderFontSize,
            ...calendarTheme,
          }}
          style={{ borderRadius: CALENDAR_RADIUS.modal }}
        />
        <TouchableOpacity style={styles.selectButton} onPress={onSelect}>
          <Text style={styles.selectButtonText}>{selectLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default CalendarModal; 