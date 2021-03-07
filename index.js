const endPoint = "http://localhost:3000/api/v1/decks";
const decksList = document.getElementById('decks-list')



document.addEventListener('DOMContentLoaded', () => {
    Deck.getDecks()

    const newDeckBtn = document.getElementById('new-deck-btn')
    newDeckBtn.addEventListener('click', handleNewDeckDisplay)

    const newDeckForm = document.getElementById('new-deck-form')
    newDeckForm.addEventListener('submit', (e) => handleNewDeckSubmit(e))
})


const handleNewDeckDisplay = () => {
    const newDeckForm = document.getElementById('new-deck')
    if (newDeckForm.style.display === 'none') {
        newDeckForm.style.display = ''
    } else {
        newDeckForm.style.display = 'none'
    }
}

const handleNewDeckSubmit = (e) => {
    e.preventDefault()
    const inputTitle = document.querySelector('#input-title').value
    const inputUserId = parseInt("1") //need to remove the hard-coded user

    postNewDeck(inputTitle, inputUserId)
    // reset form
    const deckForm = document.getElementById('new-deck-form')
    deckForm.reset()
    // hide form
    handleNewDeckDisplay()
}

const postNewDeck = (title, user_id) => {
    const inputData = {title, user_id}

    fetch(endPoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(inputData)
    })
    .then(resp => resp.json())
    .then(deck => {
        const newDeck = new Deck(deck.data, deck.data.attributes)
        newDeck.renderDeck()
    })
}

//fetch http://localhost:3000/api/v1/decks
//fetch http://localhost:3000/api/v1/users/1

// Site Should Load With No Decks Showing, FlashCard space empty, and where the decks would go a login for user
//After User login, then site should make a fetch request and add all the decks of the user
//User clicks on a deck, fetch request made to load flashcard