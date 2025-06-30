import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { mockedBike } from '@app/mocks';
import BikeCard from '../';

describe('BikeCard component', () => {
  const onPress = jest.fn();

  beforeEach(() => {
    render(<BikeCard data={mockedBike} onPress={onPress} />);
  });

  it('should be clickable', () => {
    const bikeCardButton = screen.getByTestId('bike-card-button');
    fireEvent.press(bikeCardButton);

    expect(onPress).toHaveBeenCalled();
  });

  it('should has an image', () => {
    const bikeCardImage = screen.getByTestId('bike-card-image');
    expect(bikeCardImage).toBeVisible();
  });

  it('should has a fav icon', () => {
    const bikeCardFavIcon = screen.getByTestId('bike-card-fav-icon');
    expect(bikeCardFavIcon).toBeVisible();
  });

  it('should has the bike model', () => {
    const bikeCardFavIcon = screen.getByTestId('bike-card-model');
    expect(bikeCardFavIcon).toBeVisible();
  });

  it('should has the bike type', () => {
    const bikeCardType = screen.getByTestId('bike-card-type');
    expect(bikeCardType).toBeVisible();
  });

  it('should has the bike rate', () => {
    const bikeCardRate = screen.getByTestId('bike-card-rate');
    expect(bikeCardRate).toBeVisible();
  });
});
