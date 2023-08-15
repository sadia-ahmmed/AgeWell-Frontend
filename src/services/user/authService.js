import { IP_ADDRESS, IP_PORT } from "../../../configs";

/**
 * Invoke the login service to backend
 * @param {String} email The json body of the user information
 * @param {String} password The json body of the user information
 * @param {String} token The json body of the user information
 * @returns {String} message of success/failure
 */
const invokeLoginService = (email, password, token, authCtx) => {
    const body = JSON.stringify({ email, password, token })

    fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/login`, {
        headers: { 'Content-Type': 'application/json', },
        method: "POST",
        mode: 'cors',
        body: body,
    })
        .then(res => res.json())
        .then((result) => {
            authCtx.setUserCache({
                ...result,
                token
            })
            authCtx.setLoggedIn(true)
        }).catch((err) => {
            return false
        });
}

/**
 * Invoke the logout service to backend
 * @param {Any} user The json body of the user information
 * @returns {String} message of success/failure
 */
const invokeLogoutService = (user) => {
    const body = JSON.stringify({ uid: user.uid })

    fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/logout`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.user_access_token}` },
        method: "POST",
        mode: 'cors',
        body: body,
    })
        .then(res => res.json())
        .then((result) => {
            return true
        }).catch((err) => {
            return false
        });
}

/**
 * Invoke the signup service to backend
 * @param {Any} user The json body of the user information
 * @returns {String} message of success/failure
 */
const invokeSignupService = (user) => {
    const body = JSON.stringify(user)

    fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/signup`, {
        headers: { 'Content-Type': 'application/json', },
        method: "POST",
        mode: 'cors',
        body: body,
    })
        .then(res => res.json())
        .then((result) => {
            return result.message
        }).catch((err) => {
            return err
        });
}

export { invokeLoginService, invokeLogoutService, invokeSignupService }