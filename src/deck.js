let deckCount = 0;

class Deck {
    static all = []
    
    constructor(deck, deckAttributes) {
        // set properties of each deck
        this.id = deck.id;
        this.title = deckAttributes.title;
        this.userId = deckAttributes.user_id;
        this.flashcards = deckAttributes.flashcards;

        //remember all decks
        Deck.all.push(this)
    }

    static search = (num) => {
        return this.all[num]
    }

    //render and attach Syllabus to DOM
    renderDeck = () => {
        const deckLi = document.createElement('li');
        const deckP = document.createElement('p');
        const deckDelBtn = document.createElement('button');

        deckLi.dataset.id = deckCount
        deckLi.id = this.title

        deckP.innerText = `${this.title}`
        deckP.style.display = 'inline'

        deckDelBtn.classList.add('delete-deck-btn', 'btn', 'btn-sm', 'btn-danger')
        deckDelBtn.style.display = 'inline'
        deckDelBtn.innerText = 'Delete'
        
        deckCount++;

        //add eventListeners for click on LI
        deckP.addEventListener('click', this.handleDeckClick)
        deckDelBtn.addEventListener('click', this.deleteDeck)

        deckLi.append(deckP);
        deckLi.append(deckDelBtn)
        decksList.append(deckLi);
    }

    handleDeckClick = (e) => {
        console.log("I'm clicking on this Deck")
        console.log(e.target)
        let parent = e.target.parentElement
        currentDeck = parseInt(parent.dataset.id) //string number to integer number
        currentFlashcard = null //resets flashcards
        Flashcard.getFlashcards()
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

    // delete fetch request
    deleteDeck = () => {
        console.log("im inside the delete request")
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
            currentDeck = parseInt(newDeck.id) - 1 //same as dataset-id of the li its in
            currentFlashcard = null
            currentDeckFlashcards = [];
            Flashcard.displayFlashcard(currentFlashcard)
        })
    }

}