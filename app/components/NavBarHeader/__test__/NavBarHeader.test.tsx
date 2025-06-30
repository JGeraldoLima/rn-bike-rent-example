import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';
import NavBarHeader from '../';

describe('NavBarHeader component', () => {
  beforeEach(() => {
    render(<NavBarHeader title="Bike Rental" />);
  });

  it('should be visible', () => {
    const navBarHeader = screen.getByTestId('nav-bar-header');
    expect(navBarHeader).toBeVisible();
  });
});
