const functions = require('firebase-functions')
const admin = require('firebase-admin')
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')

const serviceAccountKey = require('./serviceAccountKey.json')
const userRoute = require('./routes/user')

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({ origin: true }))
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", '*')
    next()
})

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

app.get('/', (req, res) => {
    return res.send('This is Server')
})

app.use('/api/users', userRoute)

exports.app = functions.https.onRequest(app);