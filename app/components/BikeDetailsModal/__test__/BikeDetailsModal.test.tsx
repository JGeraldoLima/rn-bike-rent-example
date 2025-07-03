import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BikeDetailsModal } from '@app/components';
import { mockedBike } from '@app/mocks';

describe('BikeDetailsModal component', () => {
  const onPress = jest.fn();

  beforeEach(() => {
    render(
      <NavigationContainer>
        <BikeDetailsModal
          testID="bike-details-modal"
          handleCloseModal={onPress}
          data={mockedBike}
        />
      </NavigationContainer>
    );
  });

  it('should be visible', () => {
    const bikeDetailsModal = screen.getByTestId('bike-details-modal');
    expect(bikeDetailsModal).toBeVisible();
  });

  it('should have bike images', () => {
    const bikeDetailsModalImg = screen.getByTestId(mockedBike.imageUrls[0]);
    expect(bikeDetailsModalImg).toBeVisible();
  });

  it('should have bike info', () => {
    const bikeDetailsModalInfo = screen.getByTestId('bike-details-modal-info');
    expect(bikeDetailsModalInfo).toBeVisible();
  });

  it('should have scroll view', () => {
    const bikeDetailsModalScrollView = screen.getByTestId(
      'bike-details-modal-scrollview'
    );
    expect(bikeDetailsModalScrollView).toBeVisible();
  });

  it('should have bike rate', () => {
    const bikeDetailsModalRate = screen.getByTestId('bike-details-modal-rate');
    expect(bikeDetailsModalRate).toBeVisible();
  });

  it('should have footer', () => {
    const bikeDetailsModalFooter = screen.getByTestId(
      'bike-details-modal-footer'
    );
    expect(bikeDetailsModalFooter).toBeVisible();
  });
});
