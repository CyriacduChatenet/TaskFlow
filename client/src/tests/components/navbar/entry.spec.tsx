import { render, fireEvent } from '@testing-library/react';

import { NavbarEntry } from '../../../app/components/navbar/entry.component';

describe('NavbarEntry', () => {
  test('renders the title correctly', () => {
    const title = 'Home';
    const { getByText } = render(<NavbarEntry title={title} />);
    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  test('changes the style on mouse enter', () => {
    const title = 'Home';
    const { getByText } = render(<NavbarEntry title={title} />);
    const entryElement = getByText(title);
    fireEvent.mouseEnter(entryElement);
    expect(entryElement).toHaveClass('border-[#3AC0A8] text-white');
  });

  test('resets the style on mouse leave', () => {
    const title = 'Home';
    const { getByText } = render(<NavbarEntry title={title} />);
    const entryElement = getByText(title);
    fireEvent.mouseEnter(entryElement);
    fireEvent.mouseLeave(entryElement);
    expect(entryElement).toHaveClass('border-gray-800 text-gray-400');
  });
});