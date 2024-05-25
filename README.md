
# Color Change Game with Palette

## Overview

This game is a color-changing puzzle where you need to repaint all highlighted (white) cells on the board. The game features a tutorial to guide new players through the mechanics, multiple difficulty levels, and additional functionalities like sorting colors and displaying high scores.

## Installation

To run this game, you'll need to have Python installed along with the `pygame` library. 

1. **Clone the Repository**

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install Pygame**

    ```sh
    pip install pygame
    ```

## Running the Game

To start the game, run the `main.py` file:

```sh
python main.py
```

## Game Controls

### Tutorial Steps

1. **Select yellow from the palette.**
    - Click on the yellow color in the palette.

2. **Paint the top left cell yellow.**
    - Click on the top-left cell to paint it yellow.

3. **Select green from the palette.**
    - Click on the green color in the palette.

4. **Repaint the remaining cells green.**
    - Click on any remaining cell to paint it green.

5. **Notice the numbers on the palette.**
    - The numbers indicate how many of each color are currently on the board.

6. **Repaint white cells in a specific way to move forward.**
    - Follow the game rules to repaint all the white cells.

7. **Ensure you have exactly 5 of a color (except white) to move forward.**
    - Achieve the required number of cells of the same color.

8. **The new color becomes the highlighted color.**
    - The new color will be used for the next set of repaints.

9. **Avoid exceeding 3 clicks on any cell to prevent losing.**
    - Be mindful of the number of clicks per cell.

10. **Good luck and have fun!**
    - The tutorial ends, and all buttons (reset, difficulty, sort) will be available.

### Gameplay

- **Select a Color:** Click on any color in the palette at the bottom of the screen.
- **Paint a Cell:** Click on any cell in the grid to repaint it with the selected color.
- **Reset Game:** Click the "Reset" button to start a new game.
- **Change Difficulty:** Click the "Difficulty" button to cycle through easy, medium, and hard levels.
- **Sort Colors:** Click the "Sort" button to sort the cells by color.

## Code Structure

### `main.py`

This is the main file to run the game. It contains the `Game` class which manages the game state, user interactions, and the tutorial.

### `board.py`

This file defines the `Board` class responsible for rendering the game board, palette, and buttons.

### `state.py`

This file contains the `State` class which manages the game logic, including cell colors, click counts, scores, and game-over conditions.

## Additional Notes

- The game automatically updates and displays the number of each color on the palette.
- The highlighted color (white) is always displayed as white, regardless of its original color.
- The game provides feedback through messages displayed on the screen.

## Future Improvements

- Add more levels and game mechanics.
- Include sound effects and animations.
- Implement a scoring system that takes into account the speed and efficiency of color changes.

Enjoy the game!
