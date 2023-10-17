const express = require('express');
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
require('dotenv').config()
saltRounds = 10

const app = express()

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const db = mysql.createConnection({
  user: process.env.user,
  host: process.env.host,
  password: process.env.password,
  database: process.env.database
})

app.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hash) => {

    if (err) {
      res.send(err)
    }

    db.query("INSERT INTO Users (username,password) VALUES (?,?)", [username, hash], (err, result) => {
      if (err) {
        res.send(err)
      }
      else if (result) {
        res.send('User was successfully signed up!')
      }
    })
  })
})


app.listen(8800, () => {
  console.log('Connected to the backend!')
})