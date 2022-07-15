class Gui {
    static renderOutput(output) {
        const newOutput = document.createElement("p");
        newOutput.innerText = output;
        outputScreen.appendChild(newOutput);
    }
}

const gameOn = false;
// DOM objects
const outputScreen = document.getElementById("computer-player-output");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
const splitButton = document.getElementById("split-button");
const ddownButton = document.getElementById("ddown-button");
const bjExitButton = document.getElementById("bj-exit-button");

// Message Constants
const GREETING = "Hello, I am jimbo. Welcome to my BlackJack game.";
const SUITS = ["hearts", "spades", "clubs", "diamonds"];

// Event Listeners
hitButton.addEventListener("click", hitButtonHandler.bind(null, output));

function hitButtonHandler(output) {

    if(gameOn) {
        Gui.renderOutput(output);
        
    }

}

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.dealt = false;
    }
}

class Deck {
    constructor() {
        this.deck = this.loadDeck;
    }
    
    loadDeck() {
        const deck = { hearts: [], spades: [], clubs: [], diamonds: [] };
        for (const suit in deck) {
            for (const i = 0; i < 13; i++) {
                deck[suit[i]] = new Card(i, suit);
            }
        }
        
        return deck;
    }
    
    getCard(value, suit) {
        return this.deck[(value, suit)];
    }
    
    isDealt(card) {
        return deck[(card.value, card.suit)].dealt;
    }
}

class Player {
    constructor(deck) {
        this.total = 0;
        this.deck = deck; 
        this.hand = [];
    }
    
    hit() {
        let success = false;

        // draws a random card and plays it if not dealt
        while (!success) {
            const value = Math.floor(Math.random() * 14);
            const suit = Math.floor(Math.random() * 5);
            const card = deck.getCard(value, suit);
            
            success = this.deck.isDealt(card);
            
            if (success) {
                total += card.value;
                card.dealt = true;
                this.hand.push(card);
            }
        }
    }
    
    split(currentHand) {
        // will need to handle two decks at once and figure out what split means
    }
}

class Human extends Player {

}

class Jimbo extends Player {}

class Game {
    constructor(){
        this.deck = new Deck();
        this.human = new Human(this.deck);
        this.jimbo = new Jimbo(this.deck);
        Gui.renderOutput.bind(null, GREETING);
    }
}

class App {
    static init() {
        new Game();
        gameOn = true;
    }
}

App.init();

console.log(hitButton);
console.log(outputScreen);
