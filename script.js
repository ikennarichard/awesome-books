const bookDisplayScreen = document.querySelector('.book_display');
const form = document.querySelector('form');

const bookList = JSON.parse(localStorage.getItem('book_store')) || [];

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

function clearInputs() {
  document.querySelector('.book_title').value = '';
  document.querySelector('.book_author').value = '';
}

function addToBookList(item) {
  bookList.push(item);
}

function addBook(e) {
  e.preventDefault();

  const bookTitleValue = document.querySelector('.book_title').value;
  const bookAuthorValue = document.querySelector('.book_author').value;

  if (bookTitleValue === '' || bookAuthorValue === '') return;

  const book = {
    title: bookTitleValue,
    author: bookAuthorValue,
  };

  addToBookList(book);
  updateStorage();
  displayBooks();
  clearInputs();
}

form.addEventListener('submit', (e) => addBook(e));

window.onload = displayBooks();