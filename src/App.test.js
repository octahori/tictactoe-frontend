import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent(/power up - tic tac toe/i);
});
