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
    }


    static nextFlashcard = () => {
        currentFlashcard++;
        Flashcard.displayFlashcard(currentDeck, currentFlashcard)
    }

}