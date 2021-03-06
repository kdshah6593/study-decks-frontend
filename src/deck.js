// add a form for create new deck based on new deck button
class Deck {
    static all = []
    
    constructor(id, title, user_id) {
        // set properties of each deck
        this.id = id;
        this.title = title;
        this.userId = user_id;

        //setup the html element that will contain the deckLi

        //add eventListener for click on LI

        //remember all decks
    }

    //render a single deck


    //attach the single deck to DOM

    //returns an array of the deck's flashcards
    flashcards = () => {

    }
    //will use flashcards() return array
    displayFlashcard = () => {

    }




    // ALL API requests for the decks; should be static
    static getDecks = () => {
        fetch(endPoint)
        .then(response => response.json())
        .then(json => json.data.forEach(deck => {
            const deckLi = document.createElement('li');
            deckLi.dataset.id = deck.id
            deckLi.id = deck.attributes.title
            deckLi.innerText = `${deck.attributes.title}`
            decksList.append(deckLi);
            })
        );
    }

    static createDeck = () => {

    }


    static deleteDeck = () => {

    }


}