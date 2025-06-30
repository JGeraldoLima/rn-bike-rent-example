import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';
import { BikeDetailsModal } from '@app/components';
import { mockedBike } from '@app/mocks';

describe('BikeDetailsModal component', () => {
  const onPress = jest.fn();

  beforeEach(() => {
    render(
      <BikeDetailsModal
        testID="bike-details-modal"
        handleCloseModal={onPress}
        data={mockedBike}
      />
    );
  });

  it('should be visible', () => {
    const bikeDetailsModal = screen.getByTestId('bike-details-modal');
    expect(bikeDetailsModal).toBeVisible();
  });

  it('should has bike images', () => {
    const bikeDetailsModalImg = screen.getByTestId(mockedBike.imageUrls[0]);
    expect(bikeDetailsModalImg).toBeVisible();
  });

  it('should has bike info', () => {
    const bikeDetailsModalInfo = screen.getByTestId('bike-details-modal-info');
    expect(bikeDetailsModalInfo).toBeVisible();
  });

  it('should has scroll view', () => {
    const bikeDetailsModalScrollView = screen.getByTestId(
      'bike-details-modal-scrollview'
    );
    expect(bikeDetailsModalScrollView).toBeVisible();
  });

  it('should has bike rate', () => {
    const bikeDetailsModalRate = screen.getByTestId('bike-details-modal-rate');
    expect(bikeDetailsModalRate).toBeVisible();
  });

  it('should has footer', () => {
    const bikeDetailsModalFooter = screen.getByTestId(
      'bike-details-modal-footer'
    );
    expect(bikeDetailsModalFooter).toBeVisible();
  });
});
