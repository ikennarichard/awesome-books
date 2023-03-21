const addBookBtn = document.querySelector('.addbook_btn');
const bookDisplayScreen = document.querySelector('.book_display');
const form = document.querySelector('form');



localStorage.setItem('book_store', JSON.stringify([]))

let bookList = JSON.parse(localStorage.getItem('book_store'));

function updateStorage() {
  localStorage.setItem('book_store', JSON.stringify(bookList))
}

function addBook(e) {
  e.preventDefault()

  const booKTitleValue = document.querySelector('.book_title').value;
  const booKAuthorValue = document.querySelector('.book_author').value;

  book = {
    title: booKTitleValue,
    author: booKAuthorValue,
  }

  addToBookList(book);
  updateStorage()
  displayBooks();
}

//add to book list

function addToBookList(item) {
  bookList.push(item)
}

//remove book from list
function removeBook(i) {
  bookList.splice(i, 1);
  updateStorage();
  displayBooks()
}

// set list for iteme to display

function setListItems(arr) {
  let items = ''
  for (let i=0; i < arr.length; i++) {
    items += `
    <li>${arr[i].title}</li>
    <li>${arr[i].author}</li>
    <button type='button' class='remove_book' onclick='removeBook(${i})'>Remove</button>
    <hr/>
    `
  }
  return items;
}


function displayBooks() {
  bookDisplayScreen.innerHTML=`
  <ul class='book_details'>
  ${setListItems(bookList)}
  </ul>
  `
  activateBtn();
}

function activateBtn () {
  console.log('activated')
  const details = [...document.querySelectorAll('.book_details')];
  const removeBookBtn = [...document.querySelectorAll('.remove_book')];
}

form.addEventListener('submit', (e) => addBook(e))