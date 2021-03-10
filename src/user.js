class User {
    
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
            console.log(json)
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
            console.log(json)
        })
    }

}