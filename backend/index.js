const express = require('express');
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.query("SELECT * FROM Users WHERE username = ?", [username], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result && result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const tokenPayload = { username: result[0].username }
          const token = jwt.sign(tokenPayload, process.env.secret_key, { expiresIn: '6h' })
          res.send({ username, token })
        }
        else if (error) {
          res.send({ message: "Wrong username/password combination" })
        }
        else {
          res.send({ message: "Something went wrong" })
        }
      })
    }
    else {
      res.send({ message: 'User does not exist' })
    }
  })
})

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}

app.get('/dictionary', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const username = decodedToken.username
  if (decodedToken) {
    db.query("SELECT * FROM User_Words WHERE username = ?", [username], (err, result) => {
      if (err) {
        res.send('Something went wrong')
      }
      else if (result && result.length > 0) {
        res.send(result)
      }
    })
  }
  else {
    res.status(401).json({ error: 'Invalid token' });
  }
})

app.post('/deleteWord', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const username = decodedToken.username
  const word = req.body.word
  if (decodedToken) {
    db.query("DELETE FROM User_Words WHERE username = ? AND word = ?", [username, word], (err, result) => {
      if (err) {
        res.send('Something went wrong')
      }
      else if (result) {
        res.send('Word was successfully deleted')
      }
    })
  }
  else {
    res.status(401).json({ error: 'Invalid token' });
  }
})

app.post('/add', (req, res) => {
  const username = req.body.username
  const word = req.body.word
  const meaning = req.body.meaning
  const example = req.body.example
  db.query("INSERT INTO User_Words (username, word, meaning, example) VALUES (?,?,?,?)", [username, word, meaning, example], (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result && result.length > 0) {
      res.send(result)
    }
  })
})

app.get('/dictionary/vocabulary/1', (req, res) => {
  db.query("SELECT * FROM Slang_Words_From_Social_Media_2023", (err, result) => {
    if (err) {
      res.send('Something went wrong')
    }
    else if (result && result.length > 0) {
      res.send(result)
    }
  })
})

app.post('/dictionary/vocabulary/1/delete', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const word = req.body.word
  if (decodedToken) {
    db.query("DELETE FROM Slang_Words_From_Social_Media_2023 WHERE word = ?", [word], (err, result) => {
      if (err) {
        res.send('Something went wrong')
      }
      else if (result) {
        res.send('Word was successfully deleted')
      }
    })
  }
  else {
    res.status(401).json({ error: 'Invalid token' });
  }
})

app.post('/dictionary/vocabulary/1/add', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const username = decodedToken.username
  const data = req.body.data
  if (decodedToken) {
    for (let i = 0; i < data.length; i++) {
      db.query("INSERT INTO User_Words (username, word, meaning, example) VALUES (?,?,?,?)", [username, data[i].word, data[i].meaning, data[i].example], (err, result) => {
        if (err) {
          console.log(err)
        }
        if (result && result.length > 0) {
          res.send(result)
        }
      })
    }
  }
})

app.get('/dictionary/vocabulary/2', (req, res) => {
  db.query("SELECT * FROM Slang_Words_From_Video_Games_2023", (err, result) => {
    if (err) {
      res.send('Something went wrong')
    }
    else if (result && result.length > 0) {
      res.send(result)
    }
  })
})

app.post('/dictionary/vocabulary/2/delete', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const word = req.body.word
  const data = req.body.data
  if (decodedToken) {
    db.query("DELETE FROM Slang_Words_From_Social_Media_2023 WHERE word = ?", [word], (err, result) => {
      if (err) {
        res.send('Something went wrong')
      }
      else if (result) {
        res.send('Word was successfully deleted')
      }
    })
  }
  else {
    res.status(401).json({ error: 'Invalid token' });
  }
})

app.post('/dictionary/vocabulary/2/add', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const username = decodedToken.username
  const data = req.body.data
  console.log(data.word)
  if (decodedToken) {
    for (let i = 0; i < data.length; i++) {
      db.query("INSERT INTO User_Words (username, word, meaning, example) VALUES (?,?,?,?)", [username, data[i].word, data[i].meaning, data[i].example], (err, result) => {
        if (err) {
          console.log(err)
        }
        if (result && result.length > 0) {
          res.send(result)
        }
      })
    }
  }
  else {
    res.status(401).json({ error: 'Invalid token' });
  }
})

app.get('/dictionary/vocabulary/3', (req, res) => {
  db.query("SELECT * FROM Slang_Words_From_WallStreet", (err, result) => {
    if (err) {
      res.send('Something went wrong')
    }
    else if (result && result.length > 0) {
      res.send(result)
    }
  })
})

app.post('/dictionary/vocabulary/3/delete', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const word = req.body.word
  if (decodedToken) {
    db.query("DELETE FROM Slang_Words_From_WallStreet WHERE word = ?", [word], (err, result) => {
      if (err) {
        res.send('Something went wrong')
      }
      else if (result) {
        res.send('Word was successfully deleted')
      }
    })
  }
  else {
    res.status(401).json({ error: 'Invalid token' });
  }
})

app.post('/dictionary/vocabulary/3/add', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const username = decodedToken.username
  const data = req.body.data
  if (decodedToken) {
    for (let i = 0; i < data.length; i++) {
      db.query("INSERT INTO User_Words (username, word, meaning, example) VALUES (?,?,?,?)", [username, data[i].word, data[i].meaning, data[i].example], (err, result) => {
        if (err) {
          console.log(err)
        }
        if (result && result.length > 0) {
          res.send(result)
        }
      })
    }
  }
  else {
    res.status(401).json({ error: 'Invalid token' });
  }
})

app.listen(8800, () => {
  console.log('Connected to the backend!')
})