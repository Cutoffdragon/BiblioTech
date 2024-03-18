document.getElementById('list-button').addEventListener('click', async e => {
    e.preventDefault();
    const book = document.getElementById('list-button').value;
    const author = document.getElementById('fav-book-btn').value;
    console.log(book);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/bookadd', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        bookTitle: book + " by " + author
    }));
    window.location='/redirect'
});

document.getElementById('fav-book-btn').addEventListener('click', async e => {
    e.preventDefault();
    const book = document.getElementById('list-button').value;
    const author = document.getElementById('fav-book-btn').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/favbook', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        bookTitle: book + " by " + author
    }));
    window.location = '/redirect'
});