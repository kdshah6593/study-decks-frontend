const endPoint = "http://localhost:3000/api/v1/decks";
const decksList = document.getElementById('decks-list')


document.addEventListener('DOMContentLoaded', () => {
    alert('LOADED')
    Deck.getDecks()
});

//fetch http://localhost:3000/api/v1/decks
//fetch http://localhost:3000/api/v1/users/1

// Site Should Load With No Decks Showing, FlashCard space empty, and where the decks would go a login for user
//After User login, then site should make a fetch request and add all the decks of the user
//User clicks on a deck, fetch request made to load flashcard