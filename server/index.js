const express = require('express');
const session = require('express-session');
const db = require('./dbconfig');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../.env.local' });

// For production/SSL
var https = require('https');
var privateKey  = fs.readFileSync('./server.key', 'utf8');
var certificate = fs.readFileSync('./server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false
}));

const transporter = nodemailer.createTransport({
    host: 'smtp.dreamhost.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

let loggedIn = false;

// Image Upload Configuration

const checkFileType = function (file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};

const storageEngineGallery = multer.diskStorage({
    destination: "../gallery",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const storageEngineCarousel = multer.diskStorage({
    destination: "../carousel",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadGallery = multer({
    storage: storageEngineGallery,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

const uploadCarousel = multer({
    storage: storageEngineCarousel,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log('Beggars canyon server running on port ' + PORT);
});

// Get / Post Requests

app.post('/submitmessage', (req, res) => {
    let data = req.body;
    const mail = {
        from: data.name,
        to: process.env.EMAIL,
        subject: 'New Message from BeggarsCanyon.com',
        text: `${data.name} <${data.email}> \n${data.message}`
    };
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        } else {
            console.log('email successfully sent');
            res.status(200).send('Email successfully sent!');
        }
    });
    /*transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });*/
});

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

app.get('/getimages', (req, res) => {
    db.query('SELECT ImageId, File, Description \
              FROM Images;', (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                res.send(result);
    });
});

app.get('/getcarouselimages', (req, res) => {
    db.query('SELECT ImageId, File, Description \
              FROM Carousel;', (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                res.send(result);
    });
});

app.get('/getimageorder', (req, res) => {
    fs.readFile('./images.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log('File read error', err);
            return;
        }
        try {
            const imageOrder = JSON.parse(jsonString);
            res.send(imageOrder);
        } catch (err) {
            console.log('Error parsing JSON string', err);
        }
    });
});

app.get('/getcarouselimageorder', (req, res) => {
    fs.readFile('./carousel.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log('File read error', err);
            return;
        }
        try {
            const imageOrder = JSON.parse(jsonString);
            res.send(imageOrder);
        } catch (err) {
            console.log('Error parsing JSON string', err);
        }
    });
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

app.post('/uploadimage', uploadGallery.array('files'), (req, res) => {
    //console.log(req.body);
    //console.log(req.files);
    const description = req.body.description;
    const filename = req.files[0].filename;
    console.log(req.body.description);
    console.log(req.files[0].filename);

    if (description && filename) {
        db.query('INSERT INTO Images (File, Description) \
                  VALUES (?, ?);', [filename, description], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                    //res.send(result);
                    db.query('SELECT ImageId FROM Images WHERE File = ?;', [filename], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`File ${filename} at:`);
                        console.log(result[0].ImageId);
                        res.send(result);

                        // Read/Write JSON file with image order
                        const imageId = result[0].ImageId;
                        fs.readFile('./images.json', 'utf8', (err, jsonString) => {
                            if (err) {
                                console.log('File read error', err);
                                return;
                            }
                            try {
                                const imageArray = JSON.parse(jsonString);
                                console.log(imageArray);
                                imageArray.order.push(imageId);
                                const newJsonString = JSON.stringify(imageArray);
                                fs.writeFile('./images.json', newJsonString, err => {
                                    if (err) {
                                        console.log('Error writing file', err);
                                    } else {
                                        console.log('Successfully updated image order');
                                    }
                                });
                            } catch (err) {
                                console.log('Error parsing JSON string', err);
                            }
                        });

                    });
        });
    }
});

app.post('/uploadcarousel', uploadCarousel.array('carouselfiles'), (req, res) => {
    //console.log(req.body);
    //console.log(req.files);
    const description = req.body.carouseldescription;
    const filename = req.files[0].filename;
    console.log(req.body.carouseldescription);
    console.log(req.files[0].filename);

    if (description && filename) {
        db.query('INSERT INTO Carousel (File, Description) \
                  VALUES (?, ?);', [filename, description], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                    //res.send(result);
                    db.query('SELECT ImageId FROM Carousel WHERE File = ?;', [filename], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`File ${filename} at:`);
                        console.log(result[0].ImageId);
                        res.send(result);

                        // Read/Write JSON file with image order
                        const imageId = result[0].ImageId;
                        fs.readFile('./carousel.json', 'utf8', (err, jsonString) => {
                            if (err) {
                                console.log('File read error', err);
                                return;
                            }
                            try {
                                const imageArray = JSON.parse(jsonString);
                                console.log(imageArray);
                                imageArray.order.push(imageId);
                                const newJsonString = JSON.stringify(imageArray);
                                fs.writeFile('./carousel.json', newJsonString, err => {
                                    if (err) {
                                        console.log('Error writing file', err);
                                    } else {
                                        console.log('Successfully updated image order');
                                    }
                                });
                            } catch (err) {
                                console.log('Error parsing JSON string', err);
                            }
                        });

                    });
        });
    }
});

app.post('/updateimageorder', (req, res) => {
    const newOrder = req.body;
    try {
        const newJsonString = JSON.stringify(newOrder);
        fs.writeFile('./images.json', newJsonString, err => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully updated image order');
                res.send(newJsonString);
            }
        });
    } catch (err) {
        console.log('Error parsing JSON string', err);
    }
});

app.post('/updatecarouselorder', (req, res) => {
    console.log(req.body);
    const newOrder = req.body;
    try {
        const newJsonString = JSON.stringify(newOrder);
        fs.writeFile('./carousel.json', newJsonString, err => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully updated image order');
                res.send(newJsonString);
            }
        });
    } catch (err) {
        console.log('Error parsing JSON string', err);
    }
});

app.post('/deletecarousel', (req, res) => {
    console.log(req.body);
    const imageData = req.body;
    const imageId = imageData.ImageId;
    const imageFile = imageData.File;

    // Update carousel.json
    fs.readFile('./carousel.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log('File read error', err);
            return;
        }
        try {
            const imageArray = JSON.parse(jsonString);
            console.log(imageArray);
            const deleteImage = imageArray.order.indexOf(imageId);
            imageArray.order.splice(deleteImage, 1);
            const newJsonString = JSON.stringify(imageArray);
            fs.writeFile('./carousel.json', newJsonString, err => {
                if (err) {
                    console.log('Error writing file', err);
                } else {
                    console.log('Successfully updated image order');
                }
            });
        } catch (err) {
            console.log('Error parsing JSON string', err);
        }
    });

    // Delete file on filesystem
    fs.unlink('../carousel/' + imageFile, function(err) {
        if(err && err.code === 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
        }
    });

    // Delete database entry
    db.query('DELETE FROM Carousel WHERE ImageId = ?;', [imageId], (err, result) => {
      if (err) {
          console.log(err);
      }
      console.log(result);
      res.send(result);
    });
});

app.post('/deleteimage', (req, res) => {
    console.log(req.body);
    const imageData = req.body;
    const imageId = imageData.ImageId;
    const imageFile = imageData.File;

    // Update images.json
    fs.readFile('./images.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log('File read error', err);
            return;
        }
        try {
            const imageArray = JSON.parse(jsonString);
            console.log(imageArray);
            const deleteImage = imageArray.order.indexOf(imageId);
            imageArray.order.splice(deleteImage, 1);
            const newJsonString = JSON.stringify(imageArray);
            fs.writeFile('./images.json', newJsonString, err => {
                if (err) {
                    console.log('Error writing file', err);
                } else {
                    console.log('Successfully updated image order');
                }
            });
        } catch (err) {
            console.log('Error parsing JSON string', err);
        }
    });

    // Delete file on filesystem
    fs.unlink('../gallery/' + imageFile, function(err) {
        if(err && err.code === 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
        }
    });

    // Delete database entry
    db.query('DELETE FROM Images WHERE ImageId = ?;', [imageId], (err, result) => {
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

/*
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});*/