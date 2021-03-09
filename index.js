const endPoint = "http://localhost:3000/api/v1/decks";
const decksList = document.getElementById('decks-list')
const flashcardContainer = document.getElementById('flashcard-container')
const nextFlashcardBtn = document.getElementById('next-btn')
const previousFlashcardBtn = document.getElementById('previous-btn')
const flipFlashcardBtn = document.getElementById('flip-btn')
const newFlashcardBtn = document.getElementById('new-flashcard-btn')
const editFlashcardBtn = document.getElementById('edit-flashcard-btn')
const deleteFlashcardBtn = document.getElementById('delete-flashcard-btn')
let currentDeck = null; // this will maintain state; which deck is currently being used; based on dataset id
let currentFlashcard = null; // this will maintain state; which flashcard user is on


document.addEventListener('DOMContentLoaded', () => {
    Deck.getDecks()

    const newDeckBtn = document.getElementById('new-deck-btn')
    newDeckBtn.addEventListener('click', Deck.handleNewDeckDisplay)

    const newDeckForm = document.getElementById('new-deck-form')
    newDeckForm.addEventListener('submit', (e) => Deck.handleNewDeckSubmit(e))

    nextFlashcardBtn.addEventListener('click', Flashcard.nextFlashcard)

    previousFlashcardBtn.addEventListener('click', Flashcard.previousFlashcard)

    flipFlashcardBtn.addEventListener('click', Flashcard.flipFlashcard)

    newFlashcardBtn.addEventListener('click', Flashcard.newFlashcard)

    editFlashcardBtn.addEventListener('click', Flashcard.editFlashcard)

    deleteFlashcardBtn.addEventListener('click', Flashcard.deleteFlashcard)

})

//fetch http://localhost:3000/api/v1/decks
//fetch http://localhost:3000/api/v1/users/1

// Site Should Load With No Decks Showing, FlashCard space empty, and where the decks would go a login for user
//After User login, then site should make a fetch request and add all the decks of the user
//User clicks on a deck, fetch request made to load flashcard