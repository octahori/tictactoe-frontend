import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from './Board';

describe('Board component', () => {
  const grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  test('renders the correct number of cells', () => {
    const handleClick = jest.fn();
    render(<Board grid={grid} onCellClick={handleClick} disabled={false} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(9);
  });

  test('calls onCellClick with the correct indices', async () => {
    
    const handleClick = jest.fn();
    render(<Board grid={grid} onCellClick={handleClick} disabled={false} />);

    const firstButton = screen.getAllByRole('button')[0];
    await userEvent.click(firstButton);

    expect(handleClick).toHaveBeenCalledWith(0, 0);
  });
});
