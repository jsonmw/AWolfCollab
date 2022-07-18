// Static methods for manipulating the GUI of the game

class Gui {
  // renders the given string in the game screen

  static renderOutput(...outputs) {
    for (const output of outputs) {
      const newOutput = document.createElement("p");
      newOutput.innerText = output;
      outputScreen.appendChild(newOutput);
      newOutput.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    Gui.renderScore();
    Gui.renderMoney();
  }

  //  renders score in score boxes

  static renderScore() {
    if (humanScore.hasChildNodes()) {
      humanScore.removeChild(humanScore.firstChild);
    }
    if (jimboScore.hasChildNodes()) {
      jimboScore.removeChild(jimboScore.firstChild);
    }

    const humanOutput = document.createElement("p");
    humanOutput.innerText = `${human.total}`;
    const jimboOutput = document.createElement("p");
    jimboOutput.innerText = `${jimbo.total}`;

    humanScore.appendChild(humanOutput);
    jimboScore.appendChild(jimboOutput);
  }

  static renderMoney() {
    if (currentMoney.hasChildNodes()) {
      currentMoney.removeChild(currentMoney.firstChild);
    }
    const moneyOutput = document.createElement("p");
    moneyOutput.innerText = `\$ ${human.wallet}`;
    currentMoney.appendChild(moneyOutput);
  }

  // clears the game screen

  static clearOutput() {
    outputScreen.innerHTML = "";
  }

  // enables or disables the input buttons

  static toggleHitStayButtons() {
    if (gameOn) {
      hitButton.classList.remove("faded-input");
      stayButton.classList.remove("faded-input");
    } else {
      hitButton.classList.add("faded-input");
      stayButton.classList.add("faded-input");
    }
    Gui.toggleSplit();
    Gui.toggledDDown();
  }

  static toggleSplit() {
    if (human.hand.length == 2 && human.hand[0].value === human.hand[1].value) {
      splitButton.classList.remove("faded-input");
    } else {
      splitButton.classList.add("faded-input");
    }
  }

  static toggledDDown() {
    if (human.hand.length == 2) {
      ddownButton.classList.remove("faded-input");
    } else {
      ddownButton.classList.add("faded-input");
    }
  }

  static toggleNewGameButton() {
    if(gameOn) {
      bjNewGameButton.classList.add("faded-input");
    } else {
      bjNewGameButton.classList.remove("faded-input");
    }
  } 
}

// global variables

// let wallet = 1000;
let currentGame;
let currentDeck;
let human;
let jimbo;
let gameOn = false;

// DOM objects

const playAsker = document.getElementById("ask-to-play");
const playButton = document.getElementById("bj-play");
const textGame = document.getElementById("text-game");
const outputScreen = document.getElementById("computer-player-output");
const bjScores = document.getElementById("bj-scores");
const humanScore = document.getElementById("human-score");
const jimboScore = document.getElementById("jimbo-score");
const currentMoney = document.getElementById("money-box");
const playerInput = document.getElementById("human-player-input");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
const splitButton = document.getElementById("split-button");
const ddownButton = document.getElementById("ddown-button");
const inputButtons = document.querySelectorAll(".bj-input");
const bjNewGameButton = document.getElementById("bj-new-game-button");
const bjExitButton = document.getElementById("bj-exit-button");

// Message Constants

const SPACING = `-------------------------------------------
    `;
const GREETING = "Hello, I am jimbo. Welcome to my BlackJack game.";
const PLAYER_BUST = "You have busted. Great idea to hit, dingus!";
const STAY_MESSAGE = "You have stayed. Let's see what our guy Jimbo does!";
const JIMBO_BUST = "Oh no! Jimbo BUSTED! FUCK!";
const BLACKJACK = "*borat voice* very nice! BLACKJACK!";
const GAME_OVER = "The game has ended";
const PLAYER_WINS = `Congratulations! You have defeated Jimbo!`;
const PLAYER_DRAW = `It's tied. Jimbo falls back to sleep.`;
const PLAYER_LOSES = `JIMBO IS VICTORIOUS!`;

// Misc constants

const MAX_VALUE = 21;
const JIMBO_MAX = 17;
const SUITS = ["hearts", "spades", "clubs", "diamonds"];
const FACE_CARDS = ["ace", "king", "queen", "jack"];

// Event Listeners

playButton.addEventListener("click", playButtonHandler);
hitButton.addEventListener("click", hitButtonHandler);
stayButton.addEventListener("click", stayButtonHandler);
bjExitButton.addEventListener("click", exitButtonHandler);
bjNewGameButton.addEventListener("click", newGameHandler);

// CLASSES \\

// Constructs an individual card

class Card {
  constructor(value, suit) {
    this.value = value + 2;
    this.suit = suit;
    this.dealt = false;
  }

  // Adds one to 0-index and converts to face card string if 10+

  convertFace() {
    let faceValue = this.value;
    if (faceValue > 10) {
      console.log("converting a " + faceValue);
      faceValue = FACE_CARDS[14 - faceValue];
      console.log("into " + faceValue);
    }
    return faceValue;
  }

  // Calculates the actual added value of the card in terms of the given player
  // total score, i.e. if Ace is 11 or 1, converting face cards to 10.

  calculateNewTotal(player) {
    let addedValue;
    console.log("hitting for " + this.value);
    if (this.value < 11) {
      addedValue = this.value;
    } else if (this.value === 14) {
      addedValue = 11;
      player.hasAce = true;
    } else {
      addedValue = 10;
    }
    player.total += addedValue;

    if (player.total > 21 && player.hasAce) {
      player.total -= 10;
    }
  }
}

// holds a deck of 52 cards

class Deck {
  constructor() {
    this.cards = this.shuffle();
  }

  // builds deck and fills with cards

  shuffle() {
    const cards = { hearts: [], spades: [], clubs: [], diamonds: [] };
    for (let suit in cards) {
      for (let i = 0; i < 13; i++) {
        cards[suit].push(new Card(i, suit));
      }
    }

    return cards;
  }

  // returns the card in the current deck with the given value, suit

  getCard(value, suit) {
    suit = SUITS[suit];
    suit = this.cards[suit];
    return suit[value - 2];
  }

  // verifies if the given card in the deck has been dealt.

  isDealt(card) {
    return card.dealt;
  }
}

// A blackjackplayer

class Player {
  constructor() {
    this.total = 0;
    this.hasAce = false;
    this.hand = []; // adds cards to the current hand. Useful for split maybe?

    // persistent

    this.wallet = 1000;
    this.wins = 0;
    this.losse = 0;
    this.ties = 0;
    this.busts = 0;
  }

  // hits and adds the new card to the running total.

  hit() {
    let success = false;
    let card;

    // draws a random card and plays it if not dealt

    while (!success) {
      const value = Math.floor(Math.random() * 13) + 2; // how to get a random whole number in javascript
      const suit = Math.floor(Math.random() * 4);
      card = currentDeck.getCard(value, suit);
      console.log(card.value);
      success = !currentDeck.isDealt(card);

      if (success) {
        card.calculateNewTotal(this);
        card.dealt = true;
        this.hand.push(card);
      }
    }
    return card;
  }

  clearGame() {
    this.total = 0;
    this.hasAce = 0;
    this.hand = [];
  }

  //   Unfinished

  //   split(currentHand) {
  //     // will need to handle two decks at once and figure out what split means.. or get rid of button
  //   }

  //   doubleDown(currentHand) {
  //     // not sure I actually even know what this does in blackjack.
  //   }
}

// Every story needs a bad guy

class Jimbo extends Player {
  // Executes one complete Jimbo game after the player stops.

  jimboTurn() {
    this.total += jimbo.hand[0].value;
    Gui.renderOutput(
      `Jimbo starts with a ${this.hand[0].convertFace()} of ${
        this.hand[0].suit
      } and a
        ${this.hand[1].convertFace()} of ${
        this.hand[1].suit
      }. His starting total is ${this.total}.`,
      SPACING
    );

    let jimboHit;
    while (this.total < JIMBO_MAX) {
      if (this.total > MAX_VALUE) {
        Gui.renderOutput(JIMBO_BUST);
        break;
      }
      jimboHit = this.hit();

      Gui.renderOutput(
        `Jimbo hits for ${jimboHit.convertFace()}! His total is now ${
          this.total
        }`,
        SPACING
      );
    }

    if (this.total < MAX_VALUE) {
      Gui.renderOutput(
        `Jimbo stays.
          `
      );
    } else if (this.total === MAX_VALUE) {
      Gui.renderOutput(BLACKJACK);
    }

    currentGame.determineWinner();
  }
}

// Holds information about the instantiated individual game

class Game {
  constructor() {
    currentDeck = new Deck();
    if (!human) {
      human = new Player();
    } else {
      human.clearGame();
    }

    jimbo = new Jimbo();
    jimbo.hit();
    jimbo.hit();
    human.hit();
    human.hit();
    gameOn = true;

    Gui.toggleHitStayButtons();
    Gui.toggleNewGameButton();
    Gui.renderMoney();

    this.startingHand();
    if (gameOn) {
      this.displayJimbo();
    }
  }

  startingHand() {
    Gui.renderOutput(
      `You start with a ${human.hand[0].convertFace()} of ${
        human.hand[0].suit
      } and a
          ${human.hand[1].convertFace()} of ${
        human.hand[1].suit
      }. Your starting total is ${human.total}.`
    );

    if (this.ifBlackJack(human)) {
      Gui.renderOutput(BLACKJACK);
      this.determineWinner();
    }
  }

  // Checks if given player busted

  ifBust(player) {
    return player.total > MAX_VALUE;
  }

  // Checks for blackjack

  ifBlackJack(player) {
    return player.total === MAX_VALUE;
  }

  // Outputs Jimbo's current visible card

  displayJimbo() {
    if (jimbo.total === MAX_VALUE) {
      Gui.renderOutput(BLACKJACK);
      this.determineWinner();
      return;
    }

    jimbo.total = jimbo.hand[1].value;

    if (jimbo.total == 14) {
      jimbo.total = 11; // only display shown card in total
    } else if (jimbo.total >= 10) {
      jimbo.total = 10;
    }

    Gui.renderOutput(
      `Jimbo is showing ${jimbo.hand[1].convertFace()} of ${
        jimbo.hand[0].suit
      }.`,
      SPACING
    );
  }

  // Checks results of game to determine winner

  determineWinner() {
    if (
      (human.total > jimbo.total && !(human.total > MAX_VALUE)) ||
      (jimbo.total > MAX_VALUE && human.total <= MAX_VALUE)
    ) {
      human.wallet += 100;
      Gui.renderOutput(PLAYER_WINS);
    } else if (human.total === jimbo.total) {
      Gui.renderOutput(PLAYER_DRAW);
    } else {
      human.wallet -= 100;
      Gui.renderOutput(PLAYER_LOSES);
    }
    gameOn = false;
    Gui.toggleHitStayButtons();
    Gui.toggleNewGameButton();
  }
}

// Event handler functions \\

function playButtonHandler() {
  textGame.classList.remove("invisible");
  playAsker.classList.add("invisible");
  Gui.renderOutput(GREETING, SPACING);
  // Gui.toggleHitStayButtons();
  // gameOn = true;
  // Gui.toggleHitStayButtons();
}

function exitButtonHandler() {
  textGame.classList.add("invisible");
  playAsker.classList.remove("invisible");
  human = null;
  jimbo = null;
  Gui.clearOutput();
}

function newGameHandler() {
    Gui.clearOutput(); 
    currentGame = new Game();
}

function hitButtonHandler() {
  if (gameOn) {
    const hitCard = human.hit();

    Gui.renderOutput(
      `You hit for ${hitCard.convertFace()}! Your total is now ${human.total}.`,
      SPACING
    );

    if (currentGame.ifBust(human)) {
      Gui.renderOutput(PLAYER_BUST);
      currentGame.determineWinner();
    } else if (currentGame.ifBlackJack(human)) {
      Gui.renderOutput(BLACKJACK);
      currentGame.determineWinner();
    }
  } else {
    stayButtonHandler();
  }
}

function stayButtonHandler() {
  if (gameOn) {
    Gui.renderOutput(STAY_MESSAGE, SPACING);
    jimbo.jimboTurn();
  }
}
