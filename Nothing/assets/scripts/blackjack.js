// Static methods for manipulating the GUI of the game \\

class Gui {
  // Renders the given string in the game screen

  static renderOutput(...outputs) {
    for (const output of outputs) {
      const newOutput = document.createElement("p");
      newOutput.innerText = output;
      outputScreen.appendChild(newOutput);
      newOutput.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    Gui.renderScore();
    Gui.renderMoney();
    Gui.renderBet();
    this.toggleAllGameButtons();
  }

  //  Renders score in score boxes

  static renderScore() {
    if (humanScore.hasChildNodes()) {
      humanScore.removeChild(humanScore.firstChild);
    }
    if (jimboScore.hasChildNodes()) {
      jimboScore.removeChild(jimboScore.firstChild);
    }

    let humanOutput = document.createElement("p");
    let jimboOutput = document.createElement("p");
    if (gameOn) {
      humanOutput.innerText = `${human.hands[human.hands.length-1].total}`;
      jimboOutput.innerText = `${jimbo.hands[0].total}`;
    } else {
      humanOutput.innerText = "0";
      jimboOutput.innerText = "0";
    }

    humanScore.appendChild(humanOutput);
    jimboScore.appendChild(jimboOutput);
  }

  // Renders the bet in the current bet screen

  static renderBet() {
    if (human) {
      console.log("displaying " + human.currentBet);
      bjBetEntry.value = `$ ${human.currentBet}`;
    } else {
      bjBetEntry.value = `$ ${MIN_BET}`;
    }
  }

  //   Renders the funds screen

  static renderMoney() {
    if (currentMoney.hasChildNodes()) {
      currentMoney.removeChild(currentMoney.firstChild);
    }
    let moneyOutput = document.createElement("p");
    if (human) {
      moneyOutput.innerText = `\$ ${human.wallet}`;
    } else {
      moneyOutput.innerText = "$ 0";
    }
    currentMoney.appendChild(moneyOutput);
  }

  // Clears the game output screen

  static clearOutput() {
    outputScreen.innerHTML = "";
  }

  // Enables or disables the input buttons

  static toggleAllGameButtons() {
    Gui.toggleHitButton();
    Gui.toggleStayButton();
    Gui.toggleSplit();
    Gui.toggledDDown();
    Gui.toggleNewPlayerButton();
    Gui.toggleNewGameButton();
    Gui.toggleBetButton();
  }

  // Individual button toggles

  static toggleBetButton() {
    if (gameOn || !human) {
      bjBetButton.classList.add("faded-input");
      bjBetEntry.classList.add("bj-bet-saved");
      bjBetEntry.setAttribute("disabled", "disabled");
    } else {
      bjBetButton.classList.remove("faded-input");
      bjBetEntry.classList.remove("bj-bet-saved");
      bjBetEntry.removeAttribute("disabled");
    }
  }

  static toggleHitButton() {
    if (gameOn && !human.doubled) {
      hitButton.classList.remove("faded-input");
    } else {
      hitButton.classList.add("faded-input");
    }
  }

  static toggleStayButton() {
    if (gameOn) {
      stayButton.classList.remove("faded-input");
    } else {
      stayButton.classList.add("faded-input");
    }
  }

  static toggleSplit() {
    if (
      human &&
      human.cards &&
      human.hands[human.hands.length - 1].cards.length == 3 &&
      human.hands[human.hands.length - 1].cards[1].value ===
        human.hands[human.handslength - 1].cards[2].value
    ) {
      splitButton.classList.remove("faded-input");
    } else {
      splitButton.classList.add("faded-input");
    }
  }

  static toggledDDown() {
    if (
      gameOn &&
      human.hands.length > 0 &&
      human.hands[human.hands.length-1].cards.length === 2
    ) {
      ddownButton.classList.remove("faded-input");
      this.canDouble = true;
    } else {
      this.canDouble = false;
      ddownButton.classList.add("faded-input");
    }
  }

  static toggleNewPlayerButton() {
    if (!human) {
      bjNewPlayerButton.classList.remove("faded-input");
    } else {
      bjNewPlayerButton.classList.add("faded-input");
      bjNewGameButton.classList.remove("faded-input");
    }
  }

  static toggleNewGameButton() {
    if (!human || human.wallet < 1) {
      bjNewGameButton.classList.add("faded-input");
    }
    if (gameOn) {
      bjNewGameButton.classList.add("invisible");
      hitButton.classList.remove("invisible");
    } else {
      bjNewGameButton.classList.remove("invisible");
      hitButton.classList.add("invisible");
    }
  }
}

// -------------------UTILITY--------------------- \\

// Global variables

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
const bjBetEntry = document.getElementById("bj-bet-input");
const bjBetButton = document.getElementById("bet-changer");
const playerInput = document.getElementById("human-player-input");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
const splitButton = document.getElementById("split-button");
const ddownButton = document.getElementById("ddown-button");
const inputButtons = document.querySelectorAll(".bj-input");
const bjNewPlayerButton = document.getElementById("bj-new-player-button");
const bjNewGameButton = document.getElementById("bj-new-game-button");
const bjExitButton = document.getElementById("bj-exit-button");

// Misc constants

const MAX_VALUE = 21;
const JIMBO_MAX = 17;
const STARTING_FUNDS = 1500;
const MIN_BET = 25;
const SUITS = ["hearts", "spades", "clubs", "diamonds"];
const FACE_CARDS = ["ace", "king", "queen", "jack"];

// Message Constants

const SPACING = `-------------------------------------------
    `;
const GREETING = "Hello, I am jimbo. Welcome to my BlackJack game.";
const BET_SUCCESS = `Jimbo drools at your new bet of `;
const BET_FAIL = "Jimbo groans audibly -- Try a valid bet!";
const PLAYER_BUST = "You have busted. Great idea to hit, dingus!";
const STAY_MESSAGE = "You have stayed. Let's see what our guy Jimbo does!";
const JIMBO_BUST = "Oh no! Jimbo BUSTED! FUCK!";
const BLACKJACK = "*borat voice* very nice! BLACKJACK!";
const GAME_OVER = "The game has ended";
const PLAYER_WINS = `Congratulations! You have defeated Jimbo!`;
const PLAYER_DRAW = `It's tied. Jimbo falls back to sleep.`;
const PLAYER_LOSES = `JIMBO IS VICTORIOUS!`;
const JIMBO_INSULT_BROKE =
  "Yeah right pal, not with that scuz. Jimbo beckons you to the mines!";
const JIMBO_INSULT_DDOWN = `You? Double down? You're too poor!! No one wants to work in the mines anymore!`;
const JIMBO_INSULT_ISF =
  "Jimbo shrieks from deep within the mine! You don't have enough money for that bet!";
const JIMBO_INSULT_MIN_BET = `Jimbo points to a sign on the wall that says, "MINIMUM BET IS $${MIN_BET}".`;

// Event Listeners

bjBetButton.addEventListener("click", betButtonHandler);
playButton.addEventListener("click", playButtonHandler);
hitButton.addEventListener("click", hitButtonHandler);
stayButton.addEventListener("click", stayButtonHandler);
splitButton.addEventListener("click", splitButtonHandler);
ddownButton.addEventListener("click", ddownButtonHandler);
bjExitButton.addEventListener("click", exitButtonHandler);
bjNewGameButton.addEventListener("click", newGameHandler);
bjNewPlayerButton.addEventListener("click", newPlayerHandler);

// -------------------CLASSES--------------------- \\

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

  calculateNewTotal (hand) {
    let addedValue;
    console.log("hitting for " + this.value);
    if (this.value < 10) {
      addedValue = this.value;
    } else if (this.value === 14) {
      addedValue = 11;
      hand.aces++;
    } else {
      addedValue = 10;
    }
    hand.total += addedValue;

    if (hand.total > 21 && hand.aces > 0) {
      hand.total -= 10;
      hand.aces --;
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

class Hand {
  constructor(...cards) {
    this.aces = 0;
    this.cards = [...cards];
    this.total = 0;
  }
}
// A blackjack player

class Player {
  constructor() {
    // game specific

    this.total = 0;
    // this.hand = []; // adds cards to the current hand. Useful for split maybe?
    this.hands = [];
    this.handsLeft = 0;
    this.currentBet = MIN_BET;
    this.doubled = false;
    this.usedSplit = false;

    // persistent between games

    this.wallet = STARTING_FUNDS;
    this.wins = 0;
    this.losse = 0;
    this.ties = 0;
    this.busts = 0;
  }

  // hits and adds the new card to the running total.

  newHand() {
    const newHand = new Hand();
    console.log("new hand = ");
    console.log(newHand);
    this.hit(newHand);
    this.hit(newHand);
    // newHand.total = newHand.cards[0].value + newHand.cards[1].value;
    this.handsLeft++;
    return newHand;
  }

  hit(givenHand) {
    let success = false;
    let card;

    // draws a random card and plays it if not dealt

    while (!success) {
      const value = Math.floor(Math.random() * 13) + 2; // how to get a random whole number in javascript
      const suit = Math.floor(Math.random() * 4);
      card = currentDeck.getCard(value, suit);
      // console.log(card.value);
      success = !currentDeck.isDealt(card);

      if (success) {
        card.calculateNewTotal(givenHand);
        card.dealt = true;
        givenHand.cards.push(card);
      }
    }
    return card;
  }

  //   Unfinished

  split() {
    const hand2 = new Hand();
    hand2.push(this.hands[this.hands.length - 1].cards[1].pop());
    this.hands.push[hand2];
    this.usedSplit = true;
  }

  // Doubles current bet but allows for only one more hit.

  doubleDown() {
    Gui.toggledDDown();
    if (this.wallet >= this.currentBet * 2) {
      this.currentBet *= 2;
      return true;
    }
    return false;
  }

  // Resets values to original data

  clearGameSpecific() {
    this.hands = [];
    this.handsLeft = 0;
    this.doubled = false;
    currentDeck = new Deck();
  }
}

// Every story needs a bad guy

class Jimbo extends Player {
  // Executes one complete Jimbo game after the player stops.

  jimboTurn() {
    this.hands[0].cards[0].calculateNewTotal(jimbo.hands[0]); // add the first card back into total
    Gui.renderOutput(
      `Jimbo starts with a ${this.hands[0].cards[0].convertFace()} of ${
        this.hands[0].cards[0].suit
      } and a
        ${this.hands[0].cards[1].convertFace()} of ${
        this.hands[0].cards[1].suit
      }. His starting total is ${this.hands[0].total}.`,
      SPACING
    );

    let jimboHit;
    while (this.hands[0].total < JIMBO_MAX && this.hands[0].total < human.hands[human.hands.length-1].total) {
      if (this.hands[0].total > MAX_VALUE) {
        Gui.renderOutput(JIMBO_BUST);
        break;
      }
      jimboHit = this.hit(this.hands[0]);

      Gui.renderOutput(
        `Jimbo hits for ${jimboHit.convertFace()}! His total is now ${
          this.hands[0].total
        }`,
        SPACING
      );
    }

    if (this.hands[0].total === MAX_VALUE && this.hands[0].cards.length === 2) {
      Gui.renderOutput(BLACKJACK);
    }

    currentGame.determineWinner(human.hands[human.hands.length-1]);
  }
}

// Holds information about an active game

class Game {
  constructor() {
    this.hasSplit = false;

    human.clearGameSpecific();

    jimbo = new Jimbo();
    jimbo.hands[0] = jimbo.newHand();
    human.hands[0] = human.newHand();
    gameOn = true;

    Gui.toggleAllGameButtons();
    Gui.toggleNewGameButton();
    Gui.renderMoney();

    this.startingHand();
    if (gameOn) {
      this.displayJimbo();
    }
  }

  // Displays the starting hand text and checks for player BlackJack

  startingHand() {
    Gui.renderOutput(
      `You start with a ${human.hands[human.hands.length-1].cards[0].convertFace()} of ${
        human.hands[human.hands.length-1].cards[0].suit
      } and a ${human.hands[human.hands.length-1].cards[1].convertFace()} of ${
        human.hands[human.hands.length-1].cards[1].suit
      }. Your starting total is ${human.hands[human.hands.length-1].total}.`
    );

    // this.hasSplit = split();

    if (this.ifBlackJack(human)) {
      const originalBet = human.currentBet;
      human.currentBet *= 1.5;
      Gui.renderOutput(BLACKJACK);
      this.determineWinner(human.hands[human.hands.length-1]);
      human.currentBet = originalBet; // resets bet after hand
    }

    if (this.hasSplit) {
      // const stringVersion = ['one', 'two'];
      // for(hand in human.hands) {
      //   renderOutput(`Playing hand ${stringVersion[human.hands.indexOf(hand)]}: `)
      //   this.startingHand();
      // }
      // if (gameOn) {
      //   this.displayJimbo();
      // }
    }
  }

  // Checks if given player busted

  ifBust(hand) {
    return hand.total > MAX_VALUE;
  }

  // Checks for blackjack

  ifBlackJack(hand) {
    return hand.total === MAX_VALUE && hand.length === 2;
  }

  // Outputs Jimbo's current visible card

  displayJimbo() {
    if (jimbo.hands[0].total === MAX_VALUE) {
      Gui.renderOutput("Just a sec... looks like Jimbo has a...");
      Gui.renderOutput(BLACKJACK);
      this.determineWinner(human.hands[human.hands.length-1]);
      return;
    }

    jimbo.hands[0].total = jimbo.hands[0].cards[1].value;

    if (jimbo.hands[0].total == 14) {
      jimbo.hands[0].total = 11; // only display shown card in total
    } else if (jimbo.hands[0].total >= 10) {
      jimbo.hands[0].total = 10;
    }

    Gui.renderOutput(
      `Jimbo is showing ${jimbo.hands[0].cards[1].convertFace()} of ${
        jimbo.hands[0].cards[1].suit
      }.`,
      SPACING
    );
  }

  // Checks results of game to determine winner

  determineWinner(hand) {
    console.log('Determining winner of ' + hand.total)
    if (
      (hand.total > jimbo.hands[0].total && !(hand.total > MAX_VALUE)) ||
      (jimbo.hands[0].total > MAX_VALUE && hand.total <= MAX_VALUE)
    ) {
      human.wallet += human.currentBet;
      Gui.renderOutput(PLAYER_WINS);
      Gui.renderOutput(`You have won \$${human.currentBet}!`, SPACING);
    } else if (hand.total === jimbo.hands[0].total) {
      Gui.renderOutput(PLAYER_DRAW, SPACING);
    } else {
      human.wallet -= human.currentBet;
      Gui.renderOutput(PLAYER_LOSES);
      Gui.renderOutput(
        `Jimbo slurps up \$ ${human.currentBet} from your wallet!`,
        SPACING
      );
    }
    if (human.doubled) {
      human.currentBet /= 2;
    }
    gameOn = false;
    Gui.toggleAllGameButtons();
    Gui.toggleNewGameButton();
  }
}

// -------------------HANDLERS--------------------- \\

function betButtonHandler() {
  if (human && !gameOn) {
    let betValue = bjBetEntry.value.trim().replace("$", "").replace(",", ""); // scrubs input
    betValue = +betValue; // parses int

    // validates entered text was a number or gives appropriate insult

    if (!isNaN(betValue) && betValue <= human.wallet) {
      if (betValue >= MIN_BET) {
        human.currentBet = betValue;
        Gui.renderOutput(`${BET_SUCCESS}${human.currentBet}!`, SPACING);
      } else {
        Gui.renderOutput(JIMBO_INSULT_MIN_BET, SPACING);
      }
    } else {
      Gui.clearOutput();
      Gui.renderOutput(JIMBO_INSULT_ISF, SPACING);
      Gui.renderBet();
      Gui.renderOutput(`Try something you can afford. Like ${human.wallet}!`);
    }
  }
}

function playButtonHandler() {
  currentDeck = new Deck();
  textGame.classList.remove("invisible");
  playAsker.classList.add("invisible");
  Gui.renderOutput(GREETING, SPACING);
}

function exitButtonHandler() {
  textGame.classList.add("invisible");
  playAsker.classList.remove("invisible");

  // Wipes current game data

  human = undefined;
  jimbo = undefined;
  gameOn = false;
  Gui.clearOutput();
  Gui.renderMoney();
  Gui.toggleNewPlayerButton();
  Gui.toggleNewGameButton();
}

function newPlayerHandler() {
  if (!human) {
    Gui.clearOutput();
    human = new Player();
    Gui.renderOutput(GREETING, SPACING);
    Gui.toggleNewPlayerButton();
    Gui.toggleNewGameButton();
  }
}

function newGameHandler() {
  if (!gameOn && human) {
    Gui.clearOutput();
    if (human.wallet === 0) {
      Gui.renderOutput(JIMBO_INSULT_BROKE, SPACING);
      human = undefined;
      Gui.toggleNewPlayerButton();
    } else if (human.wallet < human.currentBet) {
      Gui.renderOutput(JIMBO_INSULT_ISF, SPACING);
    } else {
      human.newHand();
      currentGame = new Game();
    }
  }
}

function hitButtonHandler() {
  if (gameOn && !human.doubled) {
    const hitCard = human.hit(human.hands[human.hands.length-1]);
    Gui.toggledDDown();
    Gui.renderOutput(
      `You hit for ${hitCard.convertFace()}! Your total is now ${human.hands[human.hands.length-1].total}.`,
      SPACING
    );

    if (currentGame.ifBust(human.hands[human.hands.length-1])) {
      Gui.renderOutput(PLAYER_BUST);
      currentGame.determineWinner(human.hands[human.hands.length-1]);
    } else if (currentGame.ifBlackJack(human.hands[human.hands.length-1])) {
      Gui.renderOutput(BLACKJACK);
      currentGame.determineWinner(human.hands[human.hands.length-1]);
    }
  }
  Gui.toggleHitButton();
}

function stayButtonHandler() {
  if (gameOn) {
    Gui.renderOutput(STAY_MESSAGE, SPACING);
    human.handsLeft--;
    if (human.handsLeft === 0) {
      jimbo.jimboTurn();
    }
  }
}

function splitButtonHandler() {
  if (
    human &&
    human.hands[human.hands.length-1].length == 2 &&
    human.hand[human.hands.length-1].card.value === human.hand[human.hands.length-1].card.value
  ) {
    human.split();
  }
}

function ddownButtonHandler() {
  if (human.doubleDown() && !human.hasSplit) {
    Gui.renderOutput(
      `You have doubled down! 
        Your current bet is now \$ ${human.currentBet}.`,
      SPACING
    );
    hitButtonHandler();
    human.doubled = true;
    Gui.toggleHitButton();
  } else {
    Gui.renderOutput(JIMBO_INSULT_DDOWN, SPACING);
  }
}
