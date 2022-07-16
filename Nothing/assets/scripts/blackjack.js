class Gui {
  static renderOutput(output) {
    const newOutput = document.createElement("p");
    newOutput.innerText = output;
    outputScreen.appendChild(newOutput);
    newOutput.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  static clearOutput() {
    outputScreen.innerHTML = "";
  }

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

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.dealt = false;
  }

  convertFace() {
    let faceValue = this.value + 1;
    if (faceValue > 10) {
      faceValue = FACE_CARDS[13 - faceValue];
    }
    return faceValue;
  }

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

class Deck {
  constructor() {
    this.cards = this.loadDeck();
  }

  loadDeck() {
    const cards = { hearts: [], spades: [], clubs: [], diamonds: [] };
    for (let suit in cards) {
      for (let i = 0; i < 13; i++) {
        cards[suit].push(new Card(i, suit));
      }
    }

    return cards;
  }

  getCard(value, suit) {
    suit = SUITS[suit];
    suit = this.cards[suit];
    return suit[value];
  }

  isDealt(card) {
    return card.dealt;
  }
}

class Player {

  constructor() {
    this.total = 0;
    this.hand = [];
  }

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

  split(currentHand) {
    // will need to handle two decks at once and figure out what split means.. or get rid of button
  }
}

class Jimbo extends Player {

  jimboTurn() {
    let jimboHit;
    while (this.total < JIMBO_MAX) {
      jimboHit = this.hit();

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

  ifBust(player) {
    return player.total > MAX_VALUE;
  }

  ifBlackJack(player) {
    return player.total === MAX_VALUE;
  }

  displayJimbo() {
    Gui.renderOutput(
      `Jimbo is showing ${jimbo.hand[0].convertFace()} of ${
        jimbo.hand[0].suit
      }.`
    );
  }

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

// Event handler functions

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
