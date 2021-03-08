const endPoint = "http://localhost:3000/api/v1/decks";
const decksList = document.getElementById('decks-list')
let currentDecks = null; // this will maintain state; which deck is currently being used


document.addEventListener('DOMContentLoaded', () => {
    Deck.getDecks()

    const newDeckBtn = document.getElementById('new-deck-btn')
    newDeckBtn.addEventListener('click', Deck.handleNewDeckDisplay)

    const newDeckForm = document.getElementById('new-deck-form')
    newDeckForm.addEventListener('submit', (e) => Deck.handleNewDeckSubmit(e))
})

//fetch http://localhost:3000/api/v1/decks
//fetch http://localhost:3000/api/v1/users/1

// Site Should Load With No Decks Showing, FlashCard space empty, and where the decks would go a login for user
//After User login, then site should make a fetch request and add all the decks of the user
//User clicks on a deck, fetch request made to load flashcard