# Power-Up Tic Tac Toe (Frontend)

A lightweight React SPA that lets you play an enhanced Tic-Tac-Toe game with “Overwrite” power-ups. The app consumes a REST API (`/game`, see `.src/api/gameApi.js`).

> ⚠️ **Status: Inactive**
> 
> This application is currently **not live**. The deployment has been taken down, so there is no public URL available at the moment. You can still clone the repository and run it locally for learning purposes.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Start development server (auto-reloads on save)

```bash
npm start
```

The app runs on `http://localhost:3000`.

3. Run unit tests (watch mode)

```bash
npm test
```

4. Build for production

```bash
npm run build
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Tech Stack

* React 19 + React-Scripts 5
* Axios — REST communication
* Testing Library + Jest — unit tests

## Project Structure (key parts)

```
src/
 ├─ api/          # REST API helpers
 ├─ components/   # Reusable UI components (Board, Cell)
 ├─ pages/        # Page-level components (GamePage)
 └─ constants/    # Shared constants
```