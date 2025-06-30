import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';
import NavBarRightItem from '../';

describe('NavBarLeftItem component', () => {
  beforeEach(() => {
    render(<NavBarRightItem location="SFO" />);
  });

  it('should be visible', () => {
    const navBarRightItemButton = screen.getByTestId(
      'nav-bar-right-item-button'
    );
    expect(navBarRightItemButton).toBeVisible();
  });
});
