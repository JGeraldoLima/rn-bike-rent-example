import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';
import NavBarLeftItem from '../';

describe('NavBarLeftItem component', () => {
  beforeEach(() => {
    render(<NavBarLeftItem />);
  });

  it('should be visible', () => {
    const navBarLeftItemButton = screen.getByTestId('nav-bar-left-item-button');
    expect(navBarLeftItemButton).toBeVisible();
  });
});
