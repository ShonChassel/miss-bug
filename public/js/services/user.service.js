
const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
    getLoggedInUser,
    login,
    signup,
    logout
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function login({ username, password }) {
    return axios.post('/api/auth/login', { username, password })
        .then(res => res.data)
        .then(user => {
            return setLoggedinUser(user)
        })
}

function signup({ username, password, fullname }) {
    console.log('username', username)
    console.log('password', password)
    console.log('fullname', fullname)
    
    const user = { username, password, fullname }
    return axios.post('/api/auth/signup', user)
        .then(res => res.data)
        .then(user => {
            console.log('user', user)
            return setLoggedinUser(user)
        })
}

function setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}

function logout() {
    return axios.post('/api/auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        })
}