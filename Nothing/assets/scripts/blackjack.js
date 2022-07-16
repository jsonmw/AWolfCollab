// Static methods for manipulating the GUI of the game

class Gui {
  // renders the given string in the game screen

  static renderOutput(output) {
    const newOutput = document.createElement("p");
    newOutput.innerText = output;
    outputScreen.appendChild(newOutput);
    newOutput.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  // clears the game screen

  static clearOutput() {
    outputScreen.innerHTML = "";
  }

  // enables or disables the input buttons

  static toggleButtons() {
    if (gameOn) {
      for (let button of inputButtons) {
        console.log(button);
        button.classList.remove("faded-input");
      }
    } else {
      for (let button of inputButtons) {
        console.log(button);
        button.classList.add("faded-input");
        console.log(button);
      }
    }
  }
}

// global variables

let currentGame;
let currentDeck;
let human;
let jimbo;
let gameOn = false;

// DOM objects

const playAsker = document.getElementById("ask-to-play");
const playButton = document.getElementById("bj-play");
const wholeGame = document.getElementById("bj-game");
const outputScreen = document.getElementById("computer-player-output");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
const splitButton = document.getElementById("split-button");
const ddownButton = document.getElementById("ddown-button");
const inputButtons = document.querySelectorAll(".bj-input");
const bjNewGameButton = document.getElementById("bj-new-game-button");
const bjExitButton = document.getElementById("bj-exit-button");

// Message Constants

const GREETING = "Hello, I am jimbo. Welcome to my BlackJack game.";
const PLAYER_BUST = "You have busted. Jimbo wins!";
const STAY_MESSAGE = "You have stayed. Let's see what our guy Jimbo does!";
const JIMBO_BUST = "Oh no! Jimbo BUSTED! FUCK!";
const BLACKJACK = "*borat voice* very nice! BLACKJACK!";
const GAME_OVER = "The game has ended";
const PLAYER_WINS = "Congratulations! You have defeated Jimbo!";
const PLAYER_DRAW = "It's tied. You win on a technicality.";
const PLAYER_LOSES = "JIMBO IS VICTORIOUS!";

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
    this.value = value;
    this.suit = suit;
    this.dealt = false;
  }

  // Adds one to 0-index and converts to face card string if 10+

  convertFace() {
    let faceValue = this.value + 1;
    if (faceValue > 10) {
      faceValue = FACE_CARDS[13 - faceValue];
    }
    return faceValue;
  }
  // calculates the actual added value of the card in terms of the given player
  // total score, i.e. if Ace is 11 or 1, converting face cards to 10.

  getAddedValue(player) {
    let addedValue;

    if (this.value < 9) {
      addedValue = this.value + 1;
    } else if (this.value > 11) {
      if (player.total > 10) {
        addedValue = 1;
      } else {
        addedValue = 11;
      }
    } else {
      addedValue = 10;
    }
    return addedValue;
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
    return suit[value];
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
    this.hand = []; // adds cards to the current hand. Useful for split maybe?
  }

  // hits and adds the new card to the running total.

  hit() {
    let success = false;
    let card;

    // draws a random card and plays it if not dealt

    while (!success) {
      const value = Math.floor(Math.random() * 13);
      const suit = Math.floor(Math.random() * 4);
      card = currentDeck.getCard(value, suit);

      success = !currentDeck.isDealt(card);

      if (success) {
        this.total += card.getAddedValue(this);
        card.dealt = true;
        this.hand.push(card);
      }
    }
    return card;
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
    let jimboHit;
    while (this.total < JIMBO_MAX) {
      setTimeout((jimboHit = this.hit()), 2000);

      Gui.renderOutput(
        `Jimbo hits for ${jimboHit.convertFace()}! His total is now ${
          this.total
        }`
      );
    }

    if (this.total > MAX_VALUE) {
      Gui.renderOutput(JIMBO_BUST);
    }

    currentGame.determineWinner();
  }
}

// Holds information about the instantiated individual game

class Game {
  constructor() {
    currentDeck = new Deck();
    human = new Player();
    jimbo = new Jimbo();
    jimbo.hit();
    gameOn = true;
    Gui.toggleButtons();

    Gui.renderOutput(GREETING);
    this.displayJimbo();
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
    Gui.renderOutput(
      `Jimbo is showing ${jimbo.hand[0].convertFace()} of ${
        jimbo.hand[0].suit
      }.`
    );
  }

  // Checks results of game to determine winner

  determineWinner() {
    if (
      (human.total > jimbo.total && !(human.total > MAX_VALUE)) ||
      (jimbo.total > MAX_VALUE && human.total <= MAX_VALUE)
    ) {
      Gui.renderOutput(PLAYER_WINS);
    } else if (human.total === jimbo.total) {
      Gui.renderOutput(PLAYER_DRAW);
    } else {
      Gui.renderOutput(PLAYER_LOSES);
    }
    gameOn = false;
    Gui.toggleButtons();
  }
}

// Event handler functions \\

function playButtonHandler() {
  wholeGame.classList.remove("invisible");
  playAsker.classList.add("invisible");
  currentGame = new Game();
  gameOn = true;
  Gui.toggleButtons();
}

function exitButtonHandler() {
  wholeGame.classList.add("invisible");
  playAsker.classList.remove("invisible");
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
      `You hit for ${hitCard.convertFace()}! Your total is now ${human.total}.`
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
    Gui.renderOutput(STAY_MESSAGE);
    jimbo.jimboTurn();
  }
}
