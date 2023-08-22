const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const memoCollection = require('./models/db-instance.js');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const PORT = 1000 || process.env.PORT;

let url = 'mongodb+srv://maimemory:maimemory@cluster0.qoqwbws.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('debug', true);

mongoose.connect(url)
.then(() => {
    console.log('Database Connected!');
})
.catch(err => {
    console.log(err);
})

app.get('/read', (req, res) => {
    memoCollection.find()
    .then(data => {
        // console.log(data);
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
})

app.post('/create', (req, res) => {
    const newMemo = req.body;

    memoCollection.create(newMemo)
    .then(result => {
        // console.log(res);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
})

app.patch('/update/:id', (req, res) => {
    const id = req.params.id;
    const newDetail = req.body.newDetail;

    memoCollection.findByIdAndUpdate({ _id: id}, {
        detail: newDetail
    })
    .then(result => {
        // console.log(res);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
})

app.delete('/delete/:date', (req, res) => {
    const date = req.params.date;

    memoCollection.findOneAndDelete({ date: date})
    .then(result => {
        // console.log(res);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})


