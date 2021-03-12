const deckEndPoint = "https://study-decks-backend.herokuapp.com/api/v1/decks";
const userEndPoint = "https://study-decks-backend.herokuapp.com/api/v1/users";

let deckCount = 0;

class Deck {
    static all = []
    
    constructor(deck) {
        this.id = deck.id;
        this.title = deck.title;
        this.userId = deck.user_id;

        Deck.all.push(this)
    }

    static search = (num) => {
        return this.all[num]
    }

    // Get all User Decks
    static getDecks = (id) => {
        fetch(userEndPoint + `/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json.data.attributes.decks.length === 0) {
                alert("Click New Deck in the Left Menu to Get Started!")
            } else {
                json.data.attributes.decks.forEach(deck => {
                let newDeck = new Deck(deck)
                newDeck.renderDeck()
            })}   
        });
    }

    //Render & Attach Deck to DOM
    renderDeck = () => {
        const deckLi = document.createElement('li');
        const deckP = document.createElement('p');
        const deckDelBtn = document.createElement('button');

        deckLi.className = 'list-group-item d-flex justify-content-between align-items-center'
        deckLi.dataset.id = deckCount
        deckLi.id = this.title

        deckP.innerText = `${this.title}`
        deckP.style.display = 'inline'

        deckDelBtn.classList.add('delete-deck-btn', 'btn', 'btn-sm', 'btn-danger')
        deckDelBtn.style.display = 'inline'
        deckDelBtn.innerText = 'Delete'
        
        deckCount++;

        deckP.addEventListener('click', this.handleDeckClick)
        deckDelBtn.addEventListener('click', this.deleteDeck)

        deckLi.append(deckP);
        deckLi.append(deckDelBtn)
        decksList.append(deckLi);
    }

    handleDeckClick = (e) => {
        let parent = e.target.parentElement
        const deckLis = document.querySelectorAll(".list-group-item")
        deckLis.forEach(deckLi => deckLi.classList.remove("clicked"));
        parent.className += " clicked";
        currentDeck = parseInt(parent.dataset.id) //string number to integer number
        currentFlashcard = null //resets flashcards
        const fcId = document.getElementById("back")
        if (fcId == null) {
            Deck.enableButtons()
            Flashcard.getFlashcards()
        } else {
            $('.flip').toggleClass('flip-active');
            Deck.enableButtons()
            Flashcard.getFlashcards()
        }
    }

    static enableButtons = () => {
        nextFlashcardBtn.disabled = false;
        previousFlashcardBtn.disabled = false;
        flipFlashcardBtn.disabled = false;
        newFlashcardBtn.disabled = false;
        editFlashcardBtn.disabled = false;
        deleteFlashcardBtn.disabled = false;
    }

    // Post New Deck Methods
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
        const inputUserId = parseInt(localStorage.getItem('currentUser'))
    
        this.postNewDeck(inputTitle, inputUserId)
        // reset form
        const deckForm = document.getElementById('new-deck-form')
        deckForm.reset()
        // hide form
        this.handleNewDeckDisplay()
    }
    
    static postNewDeck = (title, user_id) => {
        const inputData = {title, user_id}
    
        fetch(deckEndPoint, {
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
        .then(deck => {
            console.log(deck);
            const deckData = Object.assign({}, {id: parseInt(deck.data.id)}, {type: deck.data.type}, deck.data.attributes)
            const newDeck = new Deck(deckData)
            newDeck.renderDeck()
            const newDeckDataId = document.querySelector("#decks-list").lastElementChild.dataset.id
            document.querySelector("#decks-list").lastElementChild.className += " clicked"
            currentDeck = parseInt(newDeckDataId)
            currentFlashcard = null
            currentDeckFlashcards = [];
            Deck.enableButtons()
            Flashcard.displayFlashcard(currentFlashcard)
        })
    }

    // Delete Deck Method
    deleteDeck = (e) => {
        const r = confirm("Are you sure? This will also delete also associated flashcards.")
        if (r !== true) {
            decksList.innerHTML = "";
            currentDeck = null;
            currentFlashcard = null;
            deckCount = 0;
            Deck.all.forEach(deck => {
                deck.renderDeck();
            })
        } else {
            const deckId = parseInt(e.target.parentElement.dataset.id) // index in Deck.all
            const deck = Deck.search(deckId) // actual deck
    
            fetch(deckEndPoint + `/${deck.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            })
            .then(resp => resp.json())
            .then(decks => {
                console.log(decks);
                currentDeck = null;
                currentFlashcard = null;
                deckCount = 0;
                Deck.all.splice(deckId, 1)
                decksList.innerHTML = "";
    
                Deck.all.forEach(deck => {
                    deck.renderDeck();
                })
            })

        }
    }
     
}