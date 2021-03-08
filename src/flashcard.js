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
        const flashcardP = document.createElement('p');
        flashcardP.innerText = obj.front;
        flashcardContainer.append(flashcardP);
        Flashcard.statusCheck();
    }

    //need to handle if no next
    static nextFlashcard = () => {
        currentFlashcard++;
        Flashcard.displayFlashcard(currentDeck, currentFlashcard)
    }
    //need to handle if no previous
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
}