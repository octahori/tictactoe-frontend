import React from 'react';
import Cell from './Cell';
import './Board.css';

export default function Board({ grid, onCellClick, disabled }) {
  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${grid.length}, clamp(30px, 6vw, 60px))` }}>
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            value={cell}
            onClick={() => onCellClick(i, j)}
            disabled={disabled}
          />
        ))
      )}
    </div>
  );
}
