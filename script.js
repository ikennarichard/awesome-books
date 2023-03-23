/* eslint-disable class-methods-use-this */
import Book from './Book.js';

class AwesomeHelpers {
  constructor() {
    this.bookStore = JSON.parse(localStorage.getItem('book_store')) || [];
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
    document.querySelector('.book_display').style.display = 'flex';

    if (this.bookStore.length === 0) {
      document.querySelector('.book_display').style.display = '';
    }
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
      <div>
      <li><b>"${arr[i].title.trim()}"</b><span>by</span><strong>${arr[i].author}</strong></li>
      <button type='button' class='remove_book' data-id='${i}'>Remove</button>
      <hr/>
      </div>
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

function clearInputs() {
  document.querySelector('.book_title').value = '';
  document.querySelector('.book_author').value = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const booKTitleValue = document.querySelector('.book_title').value;
  const booKAuthorValue = document.querySelector('.book_author').value;

  awesomeBooks.addBook(booKTitleValue, booKAuthorValue);
  clearInputs();
});

document.addEventListener('click', (e) => {
  const target = e.target.closest('.remove_book');
  if (target) {
    awesomeBooks.removeBook(Number(e.target.dataset.id));
  }
});

const navLinks = [...document.querySelectorAll('nav ul li > a')];
const navSections = [...document.querySelectorAll('section')];
const listSection = document.querySelector('.list');

function removeSections() {
  navSections.forEach((section) => {
    section.classList.add('hide_section');
  });
}

navLinks.forEach((link, i) => link.addEventListener('click', (e) => {
  e.preventDefault();
  listSection.classList.remove('change_color');
  if (navSections[i].id === e.target.className) {
    removeSections();
    navSections[i].classList.remove('hide_section');
  }
}));

function loadSections() {
  navSections.forEach((section, i) => {
    if (section.id !== 'list') {
      section.classList.add('hide_section');
    }
    if (navLinks[i].className === 'list') {
      navLinks[i].classList.add('change_color');
    }
  });
}
loadSections();
window.onload = awesomeBooks.displayBooks();