export const CALENDAR_COLORS = {
  background: '#1F49D1',
  todayBorder: '#fff',
  todayText: '#fff',
  selectedDayBackground: '#fff',
  selectedDayText: '#1F49D1',
  rangeBackground: '#3A5DE7',
  rangeText: '#fff',
  serviceFee: '#FFD775',
  modalOverlay: 'rgba(0,0,0,0.2)',
  selectButton: '#FFD775',
  selectButtonText: '#222',
  transparent: 'transparent',
  disabledText: '#A0A0A0',
};

export const CALENDAR_RADIUS = {
  modal: 24,
  day: 20,
  handle: 3,
  selectButton: 16,
};

export const CALENDAR_FONT = {
  weightBold: 'bold',
  dayFontSize: 16,
  monthFontSize: 22,
  dayHeaderFontSize: 14,
};

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: CALENDAR_COLORS.modalOverlay, justifyContent: 'flex-end' },
  calendarModal: { backgroundColor: CALENDAR_COLORS.background, borderTopLeftRadius: CALENDAR_RADIUS.modal, borderTopRightRadius: CALENDAR_RADIUS.modal, padding: 20, paddingBottom: 0 },
  modalHandle: { alignSelf: 'center', width: 60, height: 6, borderRadius: CALENDAR_RADIUS.handle, backgroundColor: CALENDAR_COLORS.todayBorder, marginBottom: 16 },
  selectButton: { backgroundColor: CALENDAR_COLORS.selectButton, borderRadius: CALENDAR_RADIUS.selectButton, paddingVertical: 16, alignItems: 'center', marginTop: 20, marginBottom: 10 },
  selectButtonText: { color: CALENDAR_COLORS.selectButtonText, fontWeight: CALENDAR_FONT.weightBold, fontSize: 18 },
}); 