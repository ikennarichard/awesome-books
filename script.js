const bookDisplayScreen = document.querySelector('.book_display');
const form = document.querySelector('form');

class AwesomeBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

localStorage.setItem('book_store', JSON.stringify([]));

const bookList = JSON.parse(localStorage.getItem('book_store'));

function updateStorage() {
  localStorage.setItem('book_store', JSON.stringify(bookList));
}

function setListItems(arr) {
  let listItems = '';
  for (let i = 0; i < arr.length; i += 1) {
    listItems += `
    <li>${arr[i].title}</li>
    <li>${arr[i].author}</li>
    <button type='button' class='remove_book' onclick='removeBook(${i})'>Remove</button>
    <hr/>
    `;
  }
  return listItems;
}

function displayBooks() {
  bookDisplayScreen.innerHTML = `
  <ul class='book_details'>
  ${setListItems(bookList)}
  </ul>
  `;
}

function removeBook(i) {
  bookList.splice(i, 1);
  updateStorage();
  displayBooks();
}

document.querySelectorAll('.remove_book').forEach((btn, i) => btn.addEventListener('click', () => {
  removeBook(i);
}));

function addToBookList(item) {
  bookList.push(item);
}

function addBook(e) {
  e.preventDefault();

  const booKTitleValue = document.querySelector('.book_title').value;
  const booKAuthorValue = document.querySelector('.book_author').value;

  const book = new AwesomeBook(booKTitleValue, booKAuthorValue);

  addToBookList(book);
  updateStorage();
  displayBooks();
}

form.addEventListener('submit', (e) => addBook(e));

window.onload = displayBooks();