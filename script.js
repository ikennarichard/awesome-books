const booKTitle = document.querySelector('.book_title');
const bookAuthor = document.querySelector('.book_author');
const addBookBtn = document.querySelector('.addbook_btn');
const bookDisplayScreen = document.querySelector('.book_display');
const formElem = document.querySelector('form');

const booksArray = localStorage.getItem('books_store') ? JSON.parse(localStorage.getItem('books_store')) : [];

// add books to local storage


function addBook() {
  let title = booKTitle.value;
  let author = bookAuthor.value;

  let booksObj = {
    title: title,
    author: author,
  }

  booksArray.push(booksObj);
  localStorage.setItem('books_store', JSON.stringify(booksArray));

  displayBook(title, author)
}

//remove book from list
function removeBook(i) {
  booksArray.splice(i, 1)
}

function displayBook(title, author) {
  bookDisplayScreen.innerHTML+=`
  <ul class='book_details'>
    <li>${title}</li>
    <li>${author}</li>
    <button type='button' class='remove_book'>Remove</button>
    <hr/>
  </ul>
  `
  const details = [...document.querySelectorAll('.book_details')];

  const books = [...document.querySelectorAll('.remove_book')];

  books.forEach((item, i) => item.addEventListener('click', () => {
    details[i].remove();
    removeBook(i)
  }));
}

formElem.addEventListener('submit', addBook)