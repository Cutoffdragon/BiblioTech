const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models");

module.exports = (app) => {
    app.route('/')
        .get(async function (req, res) {
            if (req.isAuthenticated()) {
                const doc = await User.findOne({ username: req.session['passport']['user'] });
                res.render('index', { validUser: true, username: req.session['passport']['user'], background: doc.background })
            } else {
                res.render('index', { validUser: false })
            }
        });

    app.route('/loginpage')
        .get(async function (req, res) {
            if (req.isAuthenticated()) {
                const doc = await User.findOne({ username: req.session['passport']['user'] });
                res.render('profile', { username: req.session['passport']['user'], background: doc.background })
            } else {
                res.render('loginpage')
            }
        });

    app.post('/register', function (req, res, next) {
        User.register(
            new User({
                username: req.body.username,
                favoriteGenre: "None",
                description: "None",
                favoriteAuthor: "None",
                favoriteBook: "None",
                background: "default"
            }), req.body.password, function (err, msg) {
                if (err) {
                    res.render('loginpage', { failedLogin: true })
                } next();
            }
        );
    }, passport.authenticate('local', {
        failureRedirect: '/loginfail',
        successRedirect: '/info'
    }), (err, req, res, next) => {
        if (err) next(err);
    });

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/loginfail',
        successRedirect: '/profile'
    }), (err, req, res, next) => {
        if (err) next(err);
    });

    app.get('/loginfail', async function(req, res) {
        res.render('loginpage', { failedLogin: true })
    })

    app.get('/profile', async function (req, res) {
        if (req.isAuthenticated()) {
            const doc = await User.findOne({ username: req.session['passport']['user'] });
            res.render('profile', {
                username: req.session['passport']['user'],
                favoriteGenre: doc.favoriteGenre,
                description: doc.description,
                favoriteBook: doc.favoriteBook,
                favoriteAuthor: doc.favoriteAuthor,
                bookList: doc.bookList,
                booksFinished: doc.booksFinished.length,
                background: doc.background,
            })
        } else {
            res.redirect('/loginpage')
        }
    })

    app.get('/info', async function (req, res) {
        if (req.isAuthenticated()) {
            const doc = await User.findOne({ username: req.session['passport']['user'] });
            if (doc.favoriteGenre !== "None") {
                res.render('info', {username: req.session['passport']['user'], newUser: false})
            } else {
                res.render('info', { username: req.session['passport']['user'], newUser: true })
            }
        } else {
            res.redirect('/loginpage')
        }
    });

    app.get('/finishedbooks', async function (req, res) {
        const doc = await User.findOne({ username: req.session['passport']['user'] });
        res.render('booklist', { username: req.session['passport']['user'], booksFinished: doc.booksFinished, background: doc.background })
    });

    app.get('/redirect', async function (req, res) {
        const doc = await User.findOne({ username: req.session['passport']['user'] });
        await doc.save();
        res.redirect('/profile')
    })

    app.post('/info-update', async function (req, res) {
        const doc = await User.findOne({ username: req.session['passport']['user'] });
        await User.findOneAndUpdate({ username: req.session['passport']['user'] }, {
            favoriteGenre: req.body.favorite_genre,
            description: req.body.description,
            background: req.body.background
        });
        await doc.save();
        res.redirect('/profile');
    });

    app.post('/bookadd', async function (req, res) {
        if (req.isAuthenticated()) {
            const doc = await User.findOne({ username: req.session['passport']['user'] });
            if (doc.bookList.includes(req.body.bookTitle)) {
                console.log('Book already exists in your reading list.');
            } else {
                doc.bookList.push(req.body.bookTitle);
                await doc.save();
                res.redirect('/profile')
            }
        }
    });

    app.post('/bookcomplete', async function (req, res) {
        if (req.isAuthenticated()) {
            let doc = await User.findOne({ username: req.session['passport']['user'] });
            doc.bookList.splice(doc.bookList.indexOf(req.body.bookTitle), 1);
            if (doc.booksFinished.includes(req.body.bookTitle)) {
                console.log('Book has already been completed.');
                await doc.save();
                res.redirect('/profile')
            } else {
                doc.booksFinished.push(req.body.bookTitle);
                await doc.save();
                res.redirect('/profile')
            }
        }
    });

    app.post('/bookremove', async function (req, res) {
        if (req.isAuthenticated()) {
            let doc = await User.findOne({ username: req.session['passport']['user'] });
            doc.bookList.splice(doc.bookList.indexOf(req.body.bookTitle), 1);
            doc.save();
            res.redirect('/profile')
        }
    });

    app.post('/favbook', async function (req, res) {
        if (req.isAuthenticated()) {
            const doc = await User.findOne({ username: req.session['passport']['user'] });
            await User.findOneAndUpdate({ username: req.session['passport']['user'] }, {
                favoriteBook: req.body.bookTitle
            });
            await doc.save();
        }
    });

    app.post('/favauthor', async function (req, res) {
        if (req.isAuthenticated()) {
            const doc = await User.findOne({ username: req.session['passport']['user'] });
            await User.findOneAndUpdate({ username: req.session['passport']['user'] }, {
                favoriteAuthor: req.body.authorName
            });
            await doc.save();
        }
    });


    app.route('/logout')
        .get((req, res) => {
            req.logout(function (err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        });

    //404 Not Found Middleware
    app.use(function (req, res, next) {
        res.status(404)
            .type('text')
            .send('Not Found');
    });
}