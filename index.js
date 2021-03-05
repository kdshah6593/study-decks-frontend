document.addEventListener('DOMContentLoaded', () => {
    alert('LOADED')
    const endPoint = "http://localhost:3000/api/v1/decks";
    fetch(endPoint)
    .then(response => response.json())
    .then(json => json.data.forEach(deck => {
        const markup = `
        <li>
            <h3>${deck.attributes.title}
            <button>edit</button>
            </h3>
        </li>`;

        document.querySelector('#decks-list').innerHTML += markup;
        })
    );
});

//fetch http://localhost:3000/api/v1/decks
//fetch http://localhost:3000/api/v1/users/1

// Site Should Load With No Decks Showing, FlashCard space empty, and where the decks would go a login for user
//After User login, then site should make a fetch request and add all the decks of the user
//User clicks on a deck, fetch request made to load flashcard