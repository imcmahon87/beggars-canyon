const express = require('express');
const session = require('express-session');
const db = require('./dbconfig');
const cors = require('cors');


const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false
}));

let loggedIn = false;

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

app.get('/loggedin', function (req, res) {
    loggedIn = true;
    return res.send('loggedin');
});

app.get('/checkloggedin', function (req, res) {
    if (loggedIn === true) {
        return res.send(true);
    } else {
        return res.send(false);
    }
});

app.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
        console.log('session destroyed');
    });
    loggedIn = false;
    return res.send('logged out');
});


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});