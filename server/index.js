const express = require('express');
const db = require('./dbconfig');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.get('/getShows', (req, res) => {
    db.query('SELECT ShowId, DATE_FORMAT(Date, "%W, %M %e") as Date, TIME_FORMAT(Time, "%l:%i %p") as Time, Venue, City, State \
              FROM Shows \
              ORDER BY Date ASC;', (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                res.send(result);
    });
});

app.get('/getPerformers', (req, res) => {
    db.query('SELECT ShowId, Name \
              FROM Other_Performers;', (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                res.send(result);
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        db.query('SELECT * FROM Login \
                  WHERE User = ?', [username], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        if (result.length > 0) {
                            for (let i = 0; i < result.length; i++) {
                                console.log(result[i]);
                                if (result[i].Password === password) {
                                    console.log('user authenticated');
                                    res.send({ status: 'good' });
                                } else {
                                    console.log('incorrect password');
                                    res.send({ status: 'bad' });
                                }
                            }
                        } else {
                            console.log('incorrect username');
                            res.send({ status: 'bad' });
                        }
                    } else {
                        console.log('no results');
                        res.send({ status: 'bad' });
                    }
                });
    }
});

app.post('/newshow', (req, res) => {
    const date = req.body.date;
    let time = req.body.time;
    const venue = req.body.venue;
    const city = req.body.city;
    const state = req.body.state;

    if (time === '') {
        time = null;
    }

    if (date && venue && city && state) {
        db.query('INSERT INTO Shows (Date, Time, Venue, City, State) \
                  VALUES(?, ?, ?, ?, ?);', [date, time, venue, city, state], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                    res.send(result);
        });
    }
});

app.post('/newperformer', (req, res) => {
    const showId = req.body.id;
    const performer = req.body.performer;

    if (showId && performer) {
        db.query('INSERT INTO Other_Performers (ShowId, Name) \
                  VALUES(?,?);', [showId, performer], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                    res.send(result);
        });
    }
});

app.post('/deleteshow', (req, res) => {
    const showId = req.body.id;
    console.log('Deleting show Id# ', showId);
    if (showId) {
        db.query('DELETE FROM Shows WHERE ShowId = ?;', [showId], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            res.send(result);
        });
    }
});

app.post('/deleteperformer', (req, res) => {
    const showId = req.body.id;
    console.log('Deleting all performers for show Id# ', showId);
    if (showId) {
        db.query('DELETE FROM Other_Performers WHERE ShowId = ?;', [showId], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            res.send(result);
        });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});