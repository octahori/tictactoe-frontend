import axios from 'axios';

const BASE_URL = 'https://tictactoe-4f63c6b7f2cb.herokuapp.com/game';

export const createGame = (boardSize, firstPlayerSymbol) => {
  return axios.post(BASE_URL, {
    boardSize,
    firstPlayerSymbol
  });
};

export const makeMove = (gameId, row, col, symbol, overwrite = false) => {
  return axios.post(`${BASE_URL}/${gameId}/move`, {
    row,
    col,
    symbol,
    overwrite
  });
};

export const getGame = (gameId) => {
  return axios.get(`${BASE_URL}/${gameId}`);
};
