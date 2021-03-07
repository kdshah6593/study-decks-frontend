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


}