const fs = require('fs')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret-puk-1234')

const gUsers = require('../data/user.json')

module.exports = {
    query,
    getById,
    remove,
    save,
    checkLogin,
    getLoginToken,
    validateToken
}

function query(filterBy) {
    return Promise.resolve(gUsers)
}

function getById(userId) {
    const user = gUsers.find((user) => user._id === userId)
    if (!user) return Promise.reject('Unknown user')
    return Promise.resolve(user)
}

function remove(userId) {
    const idx = gUsers.findIndex((user) => user._id === userId)
    if (idx < 0) return Promise.reject('Unknown user')
    gUsers.splice(idx, 1)
    return _saveUsersToFile()
}

function save(user) {
    if (user._id) {
        const idx = gUsers.findIndex((currUser) => currUser._id === user._id)
        gUsers[idx] = user
    } else {
        user._id = _makeId()
        gUsers.unshift(user)
    }
    return _saveUsersToFile().then(() => ({ _id: user._id, fullname: user.fullname }))
}

function checkLogin({ username, password }) {
    var user = gUsers.find(user => user.username === username)
    if (user) {
        user = { _id: user._id, fullname: user.fullname }
    }
    return Promise.resolve(user)
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}



function _makeId(length = 5) {
    var txt = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gUsers, null, 2)

        fs.writeFile('data/user.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}