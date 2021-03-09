Next Steps
# Delete Flashcard
1. Click delete flashcard button, eventlistener
2. The eventlistener handles the click and sends a delete fetch request to backend
3. Change the currentFlashcard back to 0 or null
4. Run getFlashcards()

# Delete a Deck (will destroy all flashcards with it)
1. CLick delete deck button, alert about deleting
2. Event listener handles the click and sends a delete fetch request to the backend
3. Change currentDeck back to null, currentFlashcard back to null
4. Run getDecks()


# Disable / Enable Buttons Appropriately
1. Buttons should be disabled with new form? edit form?


# Future Steps
1. Bootstrap CSS
2. User Login / Authentication
4. Implement .catch() in fetch requests to handle errors.