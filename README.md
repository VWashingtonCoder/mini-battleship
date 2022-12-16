# Project: Mini Battleship
You are going to create your own small version of the classic board game Battleship. This is a terminal-based game.

This project will significantly increase your coding skills and help you master fundamental data structures and algorithms.

## 📣  Getting Started:
1) Download the readline-sync npm package for this project.
2) You WILL NOT need HTML/CSS to build this game. It is 💯 terminal-based, using only JavaScript.
3) Read the TIPS at the bottom of this document 🙂

**IMPORTANT**: Please create a new .js file for each "Part" of this project and include it in the same project folder. This will help me review each "Part" vs reviewing a final "Part 4" version. (i.e. part-1.js, part-2.js, etc)

## 🛠 Requirements: Part 1
1) When the application loads, print the text, "Press any key to start the game."
2) When the user presses the key, your code will randomly place two different ships in two separate locations on the board. Each ship is only 1 unit long (In the real game ships are 2+ in length).
3) The prompt will then say, "Enter a location to strike ie 'A2' "
4) The user will then enter a location. If there is a ship at that location the prompt will read, "Hit. You have sunk a battleship. 1 ship remaining."
5) If there is not a ship at that location the prompt will read, "You have missed!"
6) If you enter a location you have already guessed the prompt will read, "You have already picked this location. Miss!"
7) When both of the battleships have been destroyed the prompt will read, "You have destroyed all battleships. Would you like to play again? Y/N"
8) If "Y" is selected the game starts over. If "N" then the application ends itself.

![battle-ship-board-example](./assets/images/battleship-grid.jpg)