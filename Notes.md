Next Steps
# Click on a Deck, Then First FlashCard Appends to the DOM
1. Listen for a click on Deck LI element
2. This will trigger a function on Deck to get associated flashcards
    - use a find feature through the Deck.all to get the deck, then have flashcards attribute available
3. This will call another function to display flashcard (always display first flashcard in array if no flashcard number is passed)
4. Then next and previous buttons will show different flashcard depending on +1 or -1 of previous flashcard in array (use array index with for loop)



Future Steps
1. Create Previous and Next Buttons in One line (either button disappears at beginning or end of array of flashcards)
2. Next Row of Buttons has Edit Flashcard, New Flashcard, Flip Flashcard
3. Need to store CurrentDeck global variable when that deck is clicked on

4. Implement .catch() in fetch requests to handle errors.