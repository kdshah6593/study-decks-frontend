class Flashcard {
    
    //append the flashcard passed into it; if no flashcard passed in, then do first flashcard of deck
    static displayFlashcard = (deck, flashcard) => {
        const theDeck = Deck.search(deck)
        if (!flashcard) {
            const theFlashcard = theDeck.flashcards[0]
            currentFlashcard = 0;
            Flashcard.appendFlashcard(theFlashcard)
        } else {
            const theFlashcard = theDeck.flashcards[flashcard]
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
        Flashcard.displayFlashcard(currentDeck, currentFlashcard)
    }

    static previousFlashcard = () => {
        currentFlashcard--;
        Flashcard.displayFlashcard(currentDeck, currentFlashcard)
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
    
}