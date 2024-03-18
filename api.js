const User = require("./models")

async function getBookInfo(bookTitle) {
    const queryString = bookTitle.replace(' ', '+');
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryString}`);
    const results = await response.json()
    if (results["error"]) {
        return null
    }
    return results;
}

async function getAuthorWorks(authorName) {
    const queryString = authorName.replace(' ', '+');
    const response = await fetch(`https://openlibrary.org/search.json?author=${queryString}&limit=6`);
    if (!response) {
        return null
    }
    const results = await response.json();
    return results;
}

module.exports = function (app) {

    app.route('/api/book-info').get(async function (req, res) {
        try {
            const bookTitle = req.query.title;
            const bookInfo = await getBookInfo(bookTitle);
            let bookQuery = '';
            if (bookInfo["items"][0]["volumeInfo"]["industryIdentifiers"][0]["type"] === "ISBN_13" || bookInfo["items"][0]["volumeInfo"]["industryIdentifiers"][0]["type"] === "ISBN_10") {
                bookQuery = JSON.stringify("ISBN:" + bookInfo["items"][0]["volumeInfo"]["industryIdentifiers"][0]["identifier"])
            } else {
                bookQuery = JSON.stringify(bookInfo["items"][0]["volumeInfo"]["industryIdentifiers"][0]["identifier"])
            }
            if (req.isAuthenticated()) {
                const doc = await User.findOne({ username: req.session['passport']['user'] });
                res.render('title', {
                    title_result: bookInfo["items"][0]["volumeInfo"]["title"],
                    author_result: bookInfo["items"][0]["volumeInfo"]["authors"][0],
                    description: bookInfo["items"][0]["volumeInfo"]["description"],
                    bookISBN: bookQuery,
                    validUser: true,
                    background: doc.background
                })
            } else {
                res.render('title', {
                    title_result: bookInfo["items"][0]["volumeInfo"]["title"],
                    author_result: bookInfo["items"][0]["volumeInfo"]["authors"][0],
                    description: bookInfo["items"][0]["volumeInfo"]["description"],
                    bookISBN: bookQuery,
                    validUser: false,
                    background: 'default'
                })
            }
        } catch (e) {
            console.log(e)
            res.render('error')
        }
    });

    app.route('/api/author-info').get(async function (req, res) {

        try {
            const authorName = req.query.author;
            const authorInfo = await getAuthorWorks(authorName);
            let worksArray = [];
            for (let i = 0; i < authorInfo["docs"].length || i <= 5; i++) {
                worksArray.push(authorInfo["docs"][i]["title"])
            }
            if (req.isAuthenticated()) {
                const doc = await User.findOne({ username: req.session['passport']['user'] });
                res.render('author', {
                    authorName: authorInfo["docs"][0]["author_name"][0],
                    works: worksArray,
                    validUser: true,
                    background: doc.background
                })
            } else {
                res.render('author', {
                    authorName: authorInfo["docs"][0]["author_name"][0],
                    works: worksArray,
                    validUser: false,
                    background: 'default'
                })
            }
        } catch (e) {
            console.log(e);
            res.render('error')
        }
    })
}



