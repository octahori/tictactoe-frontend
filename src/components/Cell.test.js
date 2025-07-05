import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cell from './Cell';

describe('Cell component', () => {
  test('displays value', () => {
    render(<Cell value="X" onClick={() => {}} disabled={false} />);
    expect(screen.getByRole('button')).toHaveTextContent('X');
  });

  test('onClick is called when button is clicked', async () => {
    
    const handleClick = jest.fn();

    render(<Cell value="" onClick={handleClick} disabled={false} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('button is disabled when disabled prop is true', () => {
    render(<Cell value="" onClick={() => {}} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
