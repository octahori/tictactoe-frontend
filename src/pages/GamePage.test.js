import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import GamePage from './GamePage';

// Mock the gameApi module
jest.mock('../api/gameApi', () => ({
  createGame: jest.fn(() => Promise.resolve({
    data: {
      data: {
        id: '1',
        board: { grid: [['', '', ''], ['', '', ''], ['', '', '']] },
        status: 'IN_PROGRESS',
        currentPlayerSymbol: 'X'
      }
    }
  })),
  makeMove: jest.fn(),
}));

import { createGame } from '../api/gameApi';

describe('GamePage component', () => {
  test('renders setup panel and calls createGame on start', async () => {
    
    render(<GamePage />);

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();

    await userEvent.click(startButton);

    await waitFor(() => {
      expect(createGame).toHaveBeenCalledWith(3, 'X');
    });
  });
});
