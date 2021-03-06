1. Create a render function for decks to use in the fetch request .then function

2. Move the new deck form function + addeventlistener to Deck object
3. Add that when new deck form is submitted - prevent default and change form back to display:none




1. Implement .catch() in fetch requests to handle errors.



click on a deck, then the first flashcard appends to the DOM and

1. Listen for a click on Deck LI element
2. This will trigger a function on Deck to get associated flashcards (fetch request the specific deck)
3. Put all flashcards into an array
4. This will call another function to display flashcard (always display first flashcard in array if no flashcard number is passed)
5. Then next and previous buttons will show different flashcard depending on +1 or -1 of previous flashcard in array (use array index with for loop)