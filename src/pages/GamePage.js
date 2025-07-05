import React, { useState } from "react";
import { createGame, makeMove } from "../api/gameApi";
import Board from "../components/Board";
import { MIN_BOARD_SIZE, MAX_BOARD_SIZE } from "../constants/gameConfig";
import "./GamePage.css";

const getErrorMessage = (error) => {
  const { response } = error || {};
  if (response) {
    const { status, data } = response;
    if (data) {
      let { message } = data;
      if (typeof message === "string") {
        message = message.replace(/^\[[A-Z0-9_]+\]\s*/i, "").trim();
        if (message) return message;
      }
    }
    return `Request failed with status ${status}`;
  }
  return error?.message || "Unknown error";
};

export default function GamePage() {
  const [game, setGame] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [symbol, setSymbol] = useState("X");
  const [boardSize, setBoardSize] = useState(3);
  const [loading, setLoading] = useState(false);
  const [useOverwrite, setUseOverwrite] = useState(false);

  const handleStartGame = async () => {
    try {
      const res = await createGame(boardSize, symbol);
      const { data: gameData } = res.data;
      setGame(gameData);
      setGameId(gameData.id);
      
    } catch (e) {
      alert(getErrorMessage(e));
    }
  };

  const handleCellClick = async (row, col) => {
    if (!game || game.status !== "IN_PROGRESS") return;

    const cellValue = game.board.grid[row][col];
    if (cellValue === "" && useOverwrite) {
      alert("Overwrite power-up can only be used on a cell containing the opponent's symbol.");
      return;
    }

    if (cellValue !== "") {
      if (!useOverwrite || cellValue === game.currentPlayerSymbol) return;
    }

    setLoading(true);
    try {
      const res = await makeMove(
        gameId,
        row,
        col,
        game.currentPlayerSymbol,
        useOverwrite
      );
      const { data: updatedGame } = res.data;
      setGame(updatedGame);
      
    } catch (e) {
      alert(getErrorMessage(e));
    } finally {
      setUseOverwrite(false);
      setLoading(false);
    }
  };

  const resetGame = () => {
    setUseOverwrite(false);
    setGame(null);
    setGameId(null);
    setSymbol("X");
    setBoardSize(3);
    setLoading(false);
  };

  return (
    <div className="game-container">
      <h1>Power Up - Tic Tac Toe</h1>

      {!game && (
        <div className="setup-panel">
          <label>
            Board Size:
            <input
              type="number"
              min={MIN_BOARD_SIZE}
              max={MAX_BOARD_SIZE}
              value={boardSize}
              onChange={(e) => setBoardSize(parseInt(e.target.value))}
            />
          </label>
          <label>
            Your Symbol:
            <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
              <option value="X">❌</option>
              <option value="O">⭕</option>
            </select>
          </label>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      )}

      {game && (
        <div>
          <div className="game-status">
            <h2>Status: {game.status === "IN_PROGRESS" ? "IN PROGRESS" : game.status.replace("_", " ")}</h2>
            {game.status === "IN_PROGRESS" && (
              <p>Current Turn: {game.currentPlayerSymbol}</p>
            )}
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 12 }}>
            <input
              type="checkbox"
              checked={useOverwrite}
              disabled={loading || game.status !== "IN_PROGRESS"}
              onChange={(e) => setUseOverwrite(e.target.checked)}
            />
            Use Overwrite power-up
          </label>

          <Board
            grid={game.board.grid}
            onCellClick={handleCellClick}
            disabled={loading}
          />

          {game.status !== "IN_PROGRESS" && (
            <div className="game-status">
              {game.status === "DRAW" && <h2>IT'S A DRAW!</h2>}
              {game.status.endsWith("_WINS") && (
                <h2>{game.status.replace("_", " ")}!</h2>
              )}
              <button onClick={resetGame}>
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
