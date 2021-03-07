// add a form for create new deck based on new deck button
class Deck {
    static all = []
    
    constructor(deck, deckAttributes) {
        // set properties of each deck
        this.id = deck.id;
        this.title = deckAttributes.title;
        this.userId = deckAttributes.user_id;
        this.flashcards = deckAttributes.flashcards;

        //setup the html element that will contain the deckLi

        //add eventListener for click on LI

        //remember all decks
        Deck.all.push(this)
    }

    //will use flashcards() return array
    displayFlashcard = () => {

    }

    //render and attach Syllabus to DOM
    renderDeck = () => {
        const deckLi = document.createElement('li');
        deckLi.dataset.id = this.id
        deckLi.id = this.title
        deckLi.innerText = `${this.title}`
        decksList.append(deckLi);
    }

    static getDecks = () => {
        fetch(endPoint)
        .then(response => response.json())
        .then(json => json.data.forEach(deck => {
            let newDeck = new Deck(deck, deck.attributes)
            newDeck.renderDeck()
            })
        );
    }

    //change this to handleNewDeckSubmit / postNewDeck methods
    static createDeck = () => {

    }

    // delete fetch request
    static deleteDeck = () => {

    }


    static handleNewDeckDisplay = () => {
        const newDeckForm = document.getElementById('new-deck')
        if (newDeckForm.style.display === 'none') {
            newDeckForm.style.display = ''
        } else {
            newDeckForm.style.display = 'none'
        }
    }

    static handleNewDeckSubmit = (e) => {
        e.preventDefault()
        const inputTitle = document.querySelector('#input-title').value
        const inputUserId = parseInt("1") //need to remove the hard-coded user
    
        this.postNewDeck(inputTitle, inputUserId)
        // reset form
        const deckForm = document.getElementById('new-deck-form')
        deckForm.reset()
        // hide form
        this.handleNewDeckDisplay()
    }
    
    static postNewDeck = (title, user_id) => {
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

}