document.querySelector('.nav-form').addEventListener('submit', e => {
    e.preventDefault();
    let queryString = '';
    if (e.target[0].value && e.target[1].value) {
      queryString = e.target[0].value + ' ' + e.target[1].value;
      window.location = `/api/book-info?title=${queryString}`;
    } else if (e.target[0].value) {
      queryString = e.target[0].value;
      window.location = `/api/book-info?title=${queryString}`;
    } else if (e.target[1].value) {
      queryString = e.target[1].value;
      window.location = `/api/author-info?author=${queryString}`
    } else {
      alert('Please enter a book title and/or an author.')
    }
  });