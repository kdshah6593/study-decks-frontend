const flashcardEndPoint = "http://localhost:3000/api/v1/flashcards";
let currentDeckFlashcards = [];

class Flashcard { 
    // Get Flashcards of Current Deck
    static getFlashcards = () => {
        currentDeckFlashcards = [];
        const deckId = parseInt(Deck.search(currentDeck).id)
        fetch(flashcardEndPoint , {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            let arr = json.data.filter(flashcard => flashcard.attributes.deck_id === deckId)
            arr.forEach(card => currentDeckFlashcards.push(card))
            Flashcard.displayFlashcard(currentFlashcard);
        });
    }
    
    // Display Flashcard Methods
    static displayFlashcard = (fcNum) => {
        if (fcNum === null) {
            if (currentDeckFlashcards.length === 0) {
                this.statusCheck();
                this.newFlashcard();
            } else {
                const theFlashcard = currentDeckFlashcards[0]
                currentFlashcard = 0;
                this.appendFlashcard(theFlashcard)
            }
        } else {
            const theFlashcard = currentDeckFlashcards[fcNum]
            this.appendFlashcard(theFlashcard)
        }
    }

    static appendFlashcard = (obj) => {
        flashcardContainer.innerHTML = "";
        const flashcardP = document.createElement('p');
        flashcardP.id = "front";
        flashcardP.dataset.id = obj.id;
        flashcardP.innerText = obj.attributes.front;
        flashcardContainer.append(flashcardP);
        Flashcard.statusCheck();
    }

    static nextFlashcard = () => {
        currentFlashcard++;
        this.displayFlashcard(currentFlashcard)
    }

    static previousFlashcard = () => {
        currentFlashcard--;
        this.displayFlashcard(currentFlashcard)
    }

    static lastFlashcard = () => {
        currentFlashcard = currentDeckFlashcards.length - 1;
        this.displayFlashcard(currentFlashcard)
    }

    static flipFlashcard = () => {
        $('.flip').toggleClass('flip-active');
        const fcId = document.getElementById("front")
        const fcDataId = document.querySelector('#flashcard-container p').dataset.id
        const fc = currentDeckFlashcards.find(e => e.id === fcDataId)

        if (fcId === null) {
            flashcardContainer.innerHTML = "";
            const flashcardP = document.createElement('p');
            flashcardP.id = "front";
            flashcardP.dataset.id = fc.id;
            flashcardP.innerText = fc.attributes.front;
            flashcardContainer.append(flashcardP)
        } else {
            flashcardContainer.innerHTML = "";
            const flashcardP = document.createElement('p');
            flashcardP.id = "back";
            flashcardP.className= "flip-active";
            flashcardP.dataset.id = fc.id;
            flashcardP.innerText = fc.attributes.back;
            flashcardContainer.append(flashcardP)
        }
    }

    //Button Toggle Methods
    static statusCheck = () => {
        const theDeck = currentDeckFlashcards
        if (currentFlashcard === 0) {
            previousFlashcardBtn.disabled = true;
            if (currentDeckFlashcards[1]) {
                nextFlashcardBtn.disabled = false;
            } else {
                nextFlashcardBtn.disabled = true;
            }
        } else if (currentFlashcard === (theDeck.length - 1)) {
            nextFlashcardBtn.disabled = true;
            previousFlashcardBtn.disabled = false;
        } else if (currentFlashcard === null) {
            previousFlashcardBtn.disabled = true;
            nextFlashcardBtn.disabled = true;
        } else {
            previousFlashcardBtn.disabled = false;
            nextFlashcardBtn.disabled = false;
        }
    }

    //Post New Flashcard Methods
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
    }

    static postNewFlashcard = (front, back, deck_id) => {
        const inputData = {front, back, deck_id}

        fetch(flashcardEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify(inputData)
        })
        .then((response) => {
            if(response.status === 422) {
                User.renderError(response)
            } else {
                return response.json()
            }
        })
        .then(flashcard => {
            currentDeckFlashcards.push(flashcard.data);
            Flashcard.lastFlashcard()
        })
    }

    // Edit Flashcard Methods
    static editFlashcard = () => {
        const fcId = document.querySelector('#flashcard-container p').dataset.id
        fetch(flashcardEndPoint + `/${fcId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            const fc = json.data
            Flashcard.renderEditForm(fc)
        });
    }

    static renderEditForm(card) {
        flashcardContainer.innerHTML = `
        <form id='edit-flashcard-form'>
            <input type='hidden' id='input-id' name='id' value='${card.id}'>
            <input type='hidden' id='input-deck-id' name='deck-id' value='${card.attributes.deck_id}'>
            <label for="front">Front: </label>
            <input id='input-front' type='text' name='front' value="${card.attributes.front}">
            <br>
            <label for="back">Back: </label>
            <input id='input-back' type='text' name='back' value="${card.attributes.back}">
            <br>
            <input id='create-flashcard-button' type='submit' name='flashcard-submit' value="Update Flashcard">
        </form>`
        const editForm = document.getElementById('edit-flashcard-form')
        editForm.addEventListener('submit', Flashcard.handleEditFlashcardSubmit)
    }

    static handleEditFlashcardSubmit = (e) => {
        e.preventDefault()

        const inputFront = document.querySelector('#input-front').value
        const inputBack = document.querySelector('#input-back').value
        const inputId = document.querySelector('#input-id').value
        const inputDeckId = parseInt(document.querySelector('#input-deck-id').value)

        Flashcard.updateFlashcard(inputId, inputFront, inputBack, inputDeckId)
    }

    static updateFlashcard = (id, front, back, deck_id) => {
        const updateData = {front, back, deck_id}
        fetch(flashcardEndPoint + `/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify(updateData)
        })
        .then(resp => resp.json())
        .then(updatedFC => {
            Flashcard.appendFlashcard(updatedFC.data)
            Flashcard.getFlashcards()
        })
    }

    // Delete Flashcard Methods
    static deleteFlashcard = () => {
        const r = confirm("Are you sure you want to Delete?")
        if (r !== true) {
            this.displayFlashcard(currentFlashcard)
        } else {
            const fcId = document.querySelector('#flashcard-container p').dataset.id // "6"
            const fc = currentDeckFlashcards.find(e => e.id === fcId) // flashcard object
    
            fetch(flashcardEndPoint + `/${fc.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                currentFlashcard = null;
                Flashcard.getFlashcards();
            })

        }
    }

}