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
        const usernameInput = e.target.querySelector("#login-username").value
        const passwordInput = e.target.querySelector("#login-password").value
        this.loginFetch(usernameInput, passwordInput)
    }

    static signupFormHandler = (e) => {
        e.preventDefault();
        const usernameInput = e.target.querySelector("#signup-username").value
        const passwordInput = e.target.querySelector("#signup-password").value
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
        .then((response) => {
            if(response.status === 401) {
                User.renderError(response)
            } else {
                return response.json()
            }
        })
        .then(json => {
            localStorage.setItem('jwt_token', json.jwt)
            const userId = json.user.data.id
            localStorage.setItem('currentUser', userId)

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
        .then((response) => {
            if(response.status === 406) {
                User.renderError(response)
            } else {
                return response.json()
            }
        })
        .then(json => {
            localStorage.setItem('jwt_token', json.jwt)
            const userId = json.user.data.id
            localStorage.setItem('currentUser', userId)

            signupDiv.hidden = true;
            mainContainer.hidden = false;
            Deck.getDecks(userId)
        })
    }

    static renderError = (response) => {
        response.json().then(error => {
            console.log(error)
            const mesg = error.errors[0];
            alert(mesg);
        })
    }
}