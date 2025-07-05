import axios from 'axios';
import { createGame, makeMove, getGame } from './gameApi';

jest.mock('axios');

describe('gameApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createGame calls POST /game with correct payload', () => {
    axios.post.mockResolvedValue({ data: {} });
    createGame(3, 'X');
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/game'),
      { boardSize: 3, firstPlayerSymbol: 'X' }
    );
  });

  test('makeMove calls POST /game/:id/move with correct payload', () => {
    axios.post.mockResolvedValue({ data: {} });
    makeMove('123', 0, 1, 'O', true);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/game/123/move'),
      { row: 0, col: 1, symbol: 'O', overwrite: true }
    );
  });

  test('getGame calls GET /game/:id', () => {
    axios.get.mockResolvedValue({ data: {} });
    getGame('456');
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/game/456'));
  });
});
