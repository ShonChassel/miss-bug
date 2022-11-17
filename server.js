const express = require('express')
const cookieParser = require('cookie-parser')

const bugService = require('./services/bug.service')
const userService = require('./services/user.service')

const app = express()



// Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())





//?----LIST----
app.get('/api/bug', (req, res) => {
    const { title, page } = req.query

    const filterBy = {
        title: title || '',
        page: +page || 0,
    }
    bugService.query(filterBy).then(bugs => res.send(bugs))


})

//?----READ----
app.get('/api/bug/:bugId', (req, res) => {
    const bugId = req.params.bugId
    let visitedBugs = JSON.parse(req.cookies.visitCount || '[]');

    if (visitedBugs.length === 3) return res.status(401).send('Wait for a bit')
    if (!visitedBugs.includes(bugId)) visitedBugs.push(bugId)

    res.cookie('visitCount', JSON.stringify(visitedBugs), { maxAge: 7000 })
    bugService.getById(bugId)
        .then(bug => res.send(bug))

})

//?----ADD----
app.post('/api/bug/', (req, res) => {
    console.log('req.body', req.body)
    const { title, description, severity, creator } = req.body

    const bug = {
        title,
        description,
        severity,
        createdAt: Date.now(),
        _id: req.query._id,
        creator,
    }

    bugService.save(bug).then((savedBug) => {
        res.json(savedBug)
    })
})

//?----UPDATE----
app.put('/api/bug/:bugId', (req, res) => {
    const { title, description, severity, _id, creator } = req.body

    const bug = {
        title,
        description,
        severity,
        createdAt: Date.now(),
        _id,
        creator,
    }
    bugService.save(bug).then(savedBug => {
        res.send(savedBug)
    })
})



//?----DELETE----
app.delete('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId)
        .then(() => {
            res.send('bug removed!')
        })
        .catch((err) => {
            console.log('OOPS:', err)
            res.status(404).send('cant delete bug')
        })
})

//?-----------LOGIN--------------
app.post('/api/auth/login', (req, res) => {
    console.log('req.body', req.body)
    userService.checkLogin(req.body)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)

            } else {
                res.status(401).send('Invalid login')
            }
        })
})

//?-------- SIGNUP------------------
app.post('/api/auth/signup', (req, res) => {
    console.log(req.body);
    userService.save(req.body)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
})

//?--------LOGOUT---------
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('logged out')
})




const PORT = process.env.PORT || 3030

app.listen(PORT, () =>
    console.log(`Server listening on port http://127.0.0.1:${PORT}/`)
)