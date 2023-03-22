/* eslint-disable class-methods-use-this */
import Book from './Book.js';

class AwesomeHelpers {
  constructor() {
    this.bookStore = localStorage.getItem('book_store') ? JSON.parse(localStorage.getItem('book_store')) : localStorage.setItem('book_store', JSON.stringify([]));
  }

  addBook(title, author) {
    const book = new Book(title, author);

    if (title === '' || author === '') return;

    this.addToBookList(book);
    this.updateStorage();
    this.displayBooks();
  }

  updateStorage() {
    localStorage.setItem('book_store', JSON.stringify(this.bookStore));
  }

  displayBooks() {
    document.querySelector('.book_display').innerHTML = `
    <ul class='book_details'>
    ${this.setListItems(this.bookStore)}
    </ul>
    `;
  }

  setListItems(arr) {
    let listItems = '';
    for (let i = 0; i < arr.length; i += 1) {
      listItems += `
      <li>${arr[i].title}</li>
      <li>${arr[i].author}</li>
      <button type='button' class='remove_book' data-id='${i}'>Remove</button>
      <hr/>
      `;
    }
    return listItems;
  }

  removeBook(i) {
    this.bookStore.splice(i, 1);
    this.updateStorage();
    this.displayBooks();
  }

  addToBookList(item) {
    this.bookStore.push(item);
  }
}

const form = document.querySelector('form');
const awesomeBooks = new AwesomeHelpers();

document.querySelectorAll('.remove_book').forEach((btn, i) => btn.addEventListener('click', () => {
  awesomeBooks.removeBook(i);
}));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const booKTitleValue = document.querySelector('.book_title').value;
  const booKAuthorValue = document.querySelector('.book_author').value;

  awesomeBooks.addBook(booKTitleValue, booKAuthorValue);
});

document.addEventListener('click', (e) => {
  const target = e.target.closest('.remove_book');
  if (target) {
    awesomeBooks.removeBook(Number(e.target.dataset.id));
  }
});

window.onload = awesomeBooks.displayBooks();