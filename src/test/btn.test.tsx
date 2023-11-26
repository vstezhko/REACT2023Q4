import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Btn from '@/components/Btn';

describe('Btn', () => {
  it('renders button with title', () => {
    const { getByText } = render(<Btn onClick={() => {}} title="Click me" />);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  it('calls onClick handler when button is clicked', () => {
    const onClickMock = vi.fn();
    const { getByText } = render(
      <Btn onClick={onClickMock} title="Click me" />
    );
    const buttonElement = getByText('Click me');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
