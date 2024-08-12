# Ultimate Tic Tac Toe

## Overview

This project is a web-based version of the Ultimate Tic Tac Toe game, developed using React and Vite and hosted on Firebase. The game combines the classic Tic Tac Toe with a strategic twist, offering a more complex and engaging gameplay experience. The game is built with modular and reusable components, making it easy to understand, maintain, and extend.

## Game Rules

Ultimate Tic Tac Toe is a more complex version of the classic Tic Tac Toe. Here's how to play:

- **Objective**: Win three of the smaller Tic Tac Toe boards in a row (horizontally, vertically, or diagonally) to win the overall game.
- **Board Setup**: The game features a 3x3 grid of smaller Tic Tac Toe boards, each with its own 3x3 grid.
- **Gameplay**:
    - Players take turns placing their mark (X or O) in one of the small boards.
    - Your move in a small board determines where your opponent must play next. For example, if you place your mark in the top-right cell of a small board, your opponent must play in the top-right small board on their turn.
    - If the small board where your opponent is supposed to play is already won or full, they can play in any available cell.
- **Winning**:
    - To win a small board, align three of the same marks in a row within that board.
    - To win the overall game, align three small boards in a row (horizontally, vertically, or diagonally).
- **Draw**: The game ends in a draw if all cells are filled and no player has achieved three small boards in a row.

## Features

- **Dynamic and Responsive Design**: The game board automatically adjusts its size based on the screen width, ensuring a smooth experience across different devices, from desktops to mobile phones.
- **Interactive Game Logic**: Implements the logic for Ultimate Tic Tac Toe, allowing two players to compete by placing their marks (X or O) on a 3x3 grid of smaller Tic Tac Toe boards.
- **Real-Time Updates**: The game state, including the tiles and the overall winner, updates in real-time based on player actions.
- **Scoring System**: A scoring system tracks the number of wins for each player.
- **Customizable Player Names**: The scoreboard allows users to customize player names by entering a new name (up to 13 characters) in an input field. This feature replaces the default names ("Player_X" and "Player_O") with user-defined names, adding a personalized touch to the gameplay experience.
- **Reset Functionality**: A reset button allows players to restart the game at any point, clearing the board and resetting the scores.
- **Rules Explanation**: A detailed section explaining the rules of the game is included, accessible through a collapsible details element.
- **Page Reload Warning**: To prevent accidental clearing of the scoreboard, the game features a mechanism that warns users if they attempt to reload or exit the page. This provides a prompt to confirm their action, helping to avoid unintentional loss of their score and progress.
- **Offline Play and PWA Support**: The game includes Progressive Web App (PWA) functionality, enabling offline access and installation on mobile devices for a native-like experience. This feature is implemented using the PWA Vite plugin, which provides seamless integration and support for offline capabilities. Additionally, a favicon generator was used to create the necessary icons for various device displays. Note that this feature is available only on the `pwa` branch of the repository. The `main` branch does not include PWA support and is intended for the standard web version.

## Project Structure

The project is structured into multiple React components, each handling a specific aspect of the game:

- **App Component**: The main component that ties everything together. It manages the overall state of the game, including the board tiles, active tiles, small game results, player turns, and game status.
- **Game Component**: Handles the core logic of the game, including checking for winners in the smaller boards and the overall game, updating the board states, and determining the next player's move.
- **Board Component**: Responsible for rendering each of the nine smaller Tic Tac Toe boards. It also includes the logic to render the grid lines and the interaction with each tile.
- **Tile Component**: Represents each individual cell in the Tic Tac Toe boards. Handles user interactions, such as clicking on a tile to place a mark.
- **Score Component**: Displays the current score of both players, updating in real-time as the game progresses. Additionally, it includes input fields for players to change their names, with a character limit of 13 to ensure proper display and functionality.
- **Reset Component**: A simple button component that allows players to reset the game and start over.
- **Rules Component**: Provides an expandable/collapsible section with the detailed rules of the game.

## Key Implementation Details

### Game State Management

The game state is managed using React's `useState`, `useEffect`, and `useRef` hooks. The main state variables include:

- **tiles**: A 2D array representing the state of each cell in all nine small boards.
- **smallGames**: An array tracking the winner of each small board.
- **activeTiles**: A 2D array that controls which tiles are active and can be clicked based on the game rules.
- **playerTurn**: A string indicating the current player's turn ("X" or "O").
- **scoreX and scoreO**: Track the scores for Player X and Player O, respectively.
- **isGameActive**: A boolean that determines whether the game is still in progress or if a winner has been declared.
- **containerRef**: A useRef hook used to manage direct access to DOM elements for responsive adjustments. It scales the game board based on screen size to ensure visual consistency across devices, keeping the game proportionate and user-friendly on various screen sizes.

### Game Logic

The game logic is implemented in several functions within the `Game` component:

- **handleTileClick**: This function is called when a player clicks on a tile. It updates the board (2D array "tiles"), switches the player's turn, and determines where the next player should play. If the board where the next player should play is either won or full, they are allowed to play in any available tile. This logic is managed using a separate 2D array ("activeTiles"), which has the same size as the board and tracks whether each tile is active (true) or inactive (false)
- **checkSmallGameWinner**: This function checks if any of the small boards have been won by a player.  If a player wins a small board, the board is marked, and the lines on the small board are animated to transform into X or O, depending on which player won.
- **checkWinner**: Determines if a player has won the overall game by winning three small boards in a row and  it triggers the `updateScore` function to update the score and sets the game to inactive, and updates the title to "X Wins!" or "O Wins!" depending on the winner.
- **checkForDraw**: Checks if the game has ended in a draw by evaluating if all cells are filled without a winner and updates the title to "Draw!".

### Styling

The game's CSS is designed to create a visually engaging and responsive experience. Key aspects include:

- **Winning Line Animations**: An impressive feature is the animation of winning lines. When a player wins, lines across the board transform into "X" or "O" shapes, visually celebrating the victory and clearly marking the winning combination.
- **Interactive Tiles**: Tiles are styled with hover effects to enhance user interaction. For instance, `x-hover` and `o-hover` classes provide visual feedback when hovering over tiles, adding to the game's responsiveness.
- **Tile Interaction on Mobile**: On mobile devices, where hover effects are not applicable, tiles change color to a brighter shade to indicate they are active and playable. This adaptation enhances usability on touch devices, making it clear which tiles can be interacted with.
- **Player Turn Indicator**: The scoreboard dynamically adjusts the brightness of player names based on whose turn it is. This visual cue helps players easily identify which player's turn it is and adds to the overall engagement of the game.
- **Scoreboard Styling Variations**: The scoreboard has two distinct styles: one for larger screens (e.g., computer monitors) and another optimized for smaller screens (e.g., phones, smaller desktops). This ensures the scoreboard remains functional and visually appealing across different devices.
- **Responsive Layout**: Flexbox is extensively used to create a flexible and centered layout. The body and #root elements are styled to center the game vertically and horizontally, ensuring a balanced and focused presentation. This flexibility allows the game to adapt smoothly to different screen sizes and orientations.
- **Grid Layout**: The game board uses a `grid` layout for both the large and small boards, facilitating precise alignment of tiles and dynamic interaction. This layout supports the game's complex structure and visual clarity.

## Firebase Hosting

The game is hosted using Firebase, which provides a reliable and fast platform for web application hosting. Firebase Hosting allows for easy deployment and global distribution of the application, ensuring a seamless experience for users. 

You can access the live version of the game at the following link: [Ultimate Tic-Tac-Toe](https://ultimate-tic-tac-toe-d450c.web.app/).

## Future Improvements

- **Multiplayer Mode**: Adding online multiplayer support using WebSockets.
