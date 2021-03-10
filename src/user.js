class User {
    
    static loginLinkHandler = () => {
        loginDiv.hidden = false;
        signupDiv.hidden = true;
    }

    static signupLinkHandler = () => {
        loginDiv.hidden = true;
        signupDiv.hidden = false;
    }
    
    static loginFormHandler = (e) => {
        e.preventDefault();
        const usernameInput = e.target.getElementById("login-username").value
        const passwordInput = e.target.getElementById("login-password").value
        this.loginFetch(usernameInput, passwordInput)
    }

    static signupFormHandler = (e) => {
        e.preventDefault();
        const usernameInput = e.target.getElementById("signup-username").value
        const passwordInput = e.target.getElementById("signup-password").value
        this.signupFetch(usernameInput, passwordInput)
    }

    static loginFetch = (username, password) => {
        const inputData = {user: {
            username: username,
            password: password
        }}
        fetch("http://localhost:3000/api/v1/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(inputData)
        })
        .then((response) => response.json())
        .then(json => {
            localStorage.setItem('jwt_token', json.jwt)
            const userId = json.user.data.id
            //this show now hide the login and show the main page
            loginDiv.hidden = true;
            mainContainer.hidden = false;
            Deck.getDecks(userId)
        })
    }

    static signupFetch = (username, password) => {
        const inputData = {user: {
            username: username,
            password: password
        }}
        fetch("http://localhost:3000/api/v1/users", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(inputData)
        })
        .then((response) => response.json())
        .then(json => {
            localStorage.setItem('jwt_token', json.jwt)
            const userId = json.user.data.id
            //this show now hide the login and show the main page
            signupDiv.hidden = true;
            mainContainer.hidden = false;
            Deck.getDecks(userId)
        })
    }

}