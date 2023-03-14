import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const PORT = process.env.PORT || 8800

const app = express()

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "books",
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello, this is the index route for the backend server")
})

/* GET all books */
app.get('/books', (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

/* POST (insert) a single book */
app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err)
        return res.json(data)
    })
})

/* DELETE single book */
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = " DELETE FROM books WHERE id = ? "

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err)
        return res.json(data)
    })
})

/* UPDATE single book */
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
})

app.listen(PORT, () => {
    console.log(`Connected to backend on server port ${PORT}`)
})