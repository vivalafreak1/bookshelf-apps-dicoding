const STORAGE_KEY = "BOOKSHELF_APPS";

let bookShelf = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(bookShelf);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) bookShelf = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year: parseInt(year),
    isComplete,
  };
}

function findBook(bookID) {
  for (let book of bookShelf) {
    if (book.id === parseInt(bookID)) {
      return book;
    }
  }
  return null;
}

function findBookIndex(bookID) {
  let index = 0;
  for (book of bookShelf) {
    if (book.id === bookID) return index;

    index++;
  }
  return -1;
}

function refreshDataFromBookshelf() {
  let listUnreadBook = document.getElementById(INCOMPLETE_LIST_BOOK_ID);
  let listreadCompleteBook = document.getElementById(COMPLETED_LIST_BOOK_ID);

  for (book of bookShelf) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isComplete,
      book.id
    );
    newBook.setAttribute("data-bookid", book.id);

    if (book.isComplete) {
      listreadCompleteBook.append(newBook);
    } else {
      listUnreadBook.append(newBook);
    }
  }
}
