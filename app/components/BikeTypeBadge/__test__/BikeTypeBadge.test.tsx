import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';
import { mockedBike } from '@app/mocks';
import BikeTypeBadge from '../';

describe('BikeTypeBadge component', () => {
  beforeEach(() => {
    render(<BikeTypeBadge testID="bike-card-type" type={mockedBike.type} />);
  });

  it('should be visible', () => {
    const bikeTypeBadge = screen.getByTestId('bike-card-type');
    expect(bikeTypeBadge).toBeVisible();
  });
});
