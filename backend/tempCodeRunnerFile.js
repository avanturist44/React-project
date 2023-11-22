app.post('dictionary/vocabulary/1/add', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = verifyToken(token)
  const username = decodedToken.username
  const data = req.body.data
  console.log(data.word)
  if (decodedToken) {
    db.query("INSERT INTO User_Words (username, word, meaning, example) VALUES (?,?,?,?)", [username, data.word, data.meaning, data.example], (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result && result.length > 0) {
        res.send(result)
      }
    })
  }
  else {
    res.status(401).json({ error: 'Invalid token' });
  }
})