const flashcardEndPoint = "http://localhost:3000/api/v1/flashcards";

class Flashcard {

    // static all = []

    // constructor(flashcard, flashcardAttributes) {
    //     this.id = flashcard.id;
    //     this.front = flashcardAttributes.front;
    //     this.back = flashcardAttributes.back;
    //     this.deckId = flashcardAttributes.deck_id;

    //     Flashcard.all.push(this);
    // }
    
    //append the flashcard passed into it; if no flashcard passed in, then do first flashcard of deck
    static displayFlashcard = (flashcard) => {
        const deckFlashcards = Flashcard.getFlashcards()
        debugger
        if (!flashcard) {
            if (deckFlashcards === undefined) {
                Flashcard.newFlashcard()
            } else {
                const theFlashcard = deckFlashcards[0]
                currentFlashcard = 0;
                Flashcard.appendFlashcard(theFlashcard)
            }
        } else {
            const theFlashcard = deckFlashcards[flashcard]
            Flashcard.appendFlashcard(theFlashcard)
        }
    }

    static appendFlashcard = (obj) => {
        flashcardContainer.innerHTML = "";
        const flashcardP = document.createElement('p');
        flashcardP.id = "front"
        flashcardP.innerText = obj.front;
        flashcardContainer.append(flashcardP);
        Flashcard.statusCheck();
    }

    static nextFlashcard = () => {
        currentFlashcard++;
        Flashcard.displayFlashcard(currentFlashcard)
    }

    static previousFlashcard = () => {
        currentFlashcard--;
        Flashcard.displayFlashcard(currentFlashcard)
    }

    static lastFlashcard = () => {
        currentFlashcard = currentDeck.flashcards.length - 1;
        Flashcard.displayFlashcard(currentFlashcard)
    }

    //check if current flashcard is first or last in array of flashcards; if so, disable buttons
    static statusCheck = () => {
        const theDeck = Deck.search(currentDeck)
        if (currentFlashcard === 0) {
            previousFlashcardBtn.disabled = true;
            nextFlashcardBtn.disabled = false;
        } else if (currentFlashcard === (theDeck.flashcards.length - 1)) {
            nextFlashcardBtn.disabled = true;
            previousFlashcardBtn.disabled = false;
        } else {
            previousFlashcardBtn.disabled = false;
            nextFlashcardBtn.disabled = false;
        }
    }

    //flip Flashcard
    static flipFlashcard = () => {
        const fcId = document.getElementById("front")
        const fc = Deck.search(currentDeck).flashcards[currentFlashcard]

        if (fcId === null) {
            flashcardContainer.innerHTML = "";
            const flashcardP = document.createElement('p');
            flashcardP.id = "front";
            flashcardP.innerText = fc.front;
            flashcardContainer.append(flashcardP)
        } else {
            flashcardContainer.innerHTML = "";
            const flashcardP = document.createElement('p');
            flashcardP.id = "back";
            flashcardP.innerText = fc.back;
            flashcardContainer.append(flashcardP)
        }
    }

    //new flashcard
    static newFlashcard = () => {
        flashcardContainer.innerHTML = `
        <form id='new-flashcard-form'>
            <label for="front">Front: </label>
            <input id='input-front' type='text' name='front' value="" placeholder="Front of Flashcard">
            <br>
            <label for="back">Back: </label>
            <input id='input-back' type='text' name='back' value="" placeholder="Back of Flashcard">
            <br>
            <input id='create-flashcard-button' type='submit' name='flashcard-submit' value="Create New Flashcard">
        </form>`
        const newForm = document.getElementById('new-flashcard-form')
        newForm.addEventListener('submit', Flashcard.handleNewFlashcardSubmit)
    }

    static handleNewFlashcardSubmit = (e) => {
        e.preventDefault()
        console.log("I've submitted a new flashcard")

        const inputFront = document.querySelector('#input-front').value
        const inputBack = document.querySelector('#input-back').value
        const inputDeckId = Deck.search(currentDeck).id

        Flashcard.postNewFlashcard(inputFront, inputBack, inputDeckId)
        //remove form and append Ajax data
    }

    static postNewFlashcard = (front, back, deck_id) => {
        const inputData = {front, back, deck_id}

        fetch(flashcardEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(inputData)
        })
        .then(resp => resp.json())
        .then(flashcard => {
            new Flashcard(flashcard.data, flashcard.data.attributes)
            Flashcard.lastFlashcard()
        })
    }

    static getFlashcards = () => {
        const deckId = parseInt(Deck.search(currentDeck).id)
        fetch(flashcardEndPoint)
        .then(response => response.json())
        .then(json => {
            let arr = json.data.filter(flashcard => flashcard.attributes.deck_id === deckId )
            return arr;
        });
    }

}