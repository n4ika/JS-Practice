const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear");
const figlet = require("figlet");

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.findPlayer();
  }

  findPlayer() {
    for (let row = 0; row < this.field.length; row++) {
      for (let col = 0; col < this.field[row].length; col++) {
        if (this.field[row][col] === pathCharacter) {
          this.playerRow = row;
          this.playerCol = col;
          return;
        }
      }
    }
  }

  showWelcome() {
    clear();
    console.log(
      chalk.cyan(
        figlet.textSync("Find Your Hat!", {
          font: "Standard",
          horizontalLayout: "default",
        })
      )
    );
    console.log(
      chalk.yellow(
        "\nNavigate to find your hat (^) without falling in holes (O)!\n"
      )
    );
    console.log(chalk.gray("Press Enter to start..."));
    prompt("");
  }

  print() {
    let currentField = "";
    for (let row of this.field) {
      for (let char of row) {
        if (char === pathCharacter) {
          currentField += chalk.yellow(char);
        } else if (char === hat) {
          currentField += chalk.green(char);
        } else if (char === hole) {
          currentField += chalk.red(char);
        } else {
          currentField += chalk.gray(char);
        }
      }
      currentField += "\n";
    }
    console.log(currentField);
  }

  isOutOfBounds() {
    return (
      this.playerRow < 0 ||
      this.playerRow >= this.field.length ||
      this.playerCol < 0 ||
      this.playerCol >= this.field[0].length
    );
  }

  isOnHole() {
    return this.field[this.playerRow][this.playerCol] === hole;
  }

  isOnHat() {
    return this.field[this.playerRow][this.playerCol] === hat;
  }

  askForDirection() {
    const direction = prompt("Which way? (w/a/s/d): ");
    if (direction === "w") {
      this.playerRow -= 1;
    } else if (direction === "s") {
      this.playerRow += 1;
    } else if (direction === "a") {
      this.playerCol -= 1;
    } else if (direction === "d") {
      this.playerCol += 1;
    } else {
      console.log("Invalid input. Please use w/a/s/d.");
      this.askForDirection();
      return;
    }
  }

  playGame() {
    this.showWelcome();
    let playing = true;

    while (playing) {
      clear();
      console.log(chalk.cyan.bold("=== FIND YOUR HAT ===\n"));
      this.print();
      this.askForDirection();
      if (this.isOutOfBounds()) {
        console.log("Out of bounds - you lose!");
        playing = false;
      } else if (this.isOnHole()) {
        console.log("Fell in a hole - you lose!");
        playing = false;
      } else if (this.isOnHat()) {
        console.log("Found your hat - you win!");
        playing = false;
      } else {
        this.field[this.playerRow][this.playerCol] = pathCharacter;
      }
    }
  }

  static generateField(height, width, percentage) {
    const field = [];
    //Generate field
    for (let row = 0; row < height; row++) {
      const newRow = [];
      for (let col = 0; col < width; col++) {
        newRow.push(fieldCharacter);
      }
      field.push(newRow);
    }

    //Place path character
    let startRow = Math.floor(Math.random() * height);
    let startCol = Math.floor(Math.random() * width);

    field[startRow][startCol] = pathCharacter;

    //Place hat
    let hatRow = Math.floor(Math.random() * height);
    let hatCol = Math.floor(Math.random() * width);

    while (
      (hatRow === startRow && hatCol === startCol) ||
      (hatRow === 0 && hatCol === 0)
    ) {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    }

    field[hatRow][hatCol] = hat;

    //Place holes
    const totalCells = height * width;
    const numHoles = Math.floor(totalCells * percentage);
    let holesPlaced = 0;

    while (holesPlaced < numHoles) {
      const holeRow = Math.floor(Math.random() * height);
      const holeCol = Math.floor(Math.random() * width);

      if (field[holeRow][holeCol] === fieldCharacter) {
        field[holeRow][holeCol] = hole;
        holesPlaced++;
      }
    }
    return field;
  }
}

const randomField = Field.generateField(5, 8, 0.2);
const myGame = new Field(randomField);
myGame.playGame();
