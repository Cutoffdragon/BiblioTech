document.getElementById('fav-author-btn').addEventListener('click', async e => {
    e.preventDefault();
    const author = document.getElementById('fav-author-btn').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/favauthor', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        authorName: author
    }));
    window.location = '/redirect'
});