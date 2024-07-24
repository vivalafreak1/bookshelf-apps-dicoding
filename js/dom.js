const INCOMPLETE_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
  const incompleteBookList = document.getElementById(INCOMPLETE_LIST_BOOK_ID);
  const completeBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const textTitle = document.getElementById("inputBookTitle").value;
  const textAuthor = document.getElementById("inputBookAuthor").value;
  const textYear = document.getElementById("inputBookYear").value;
  const isChecked = document.getElementById("inputBookIsComplete").checked;

  const bookId = +new Date();
  let dataBook = {
    id: bookId,
    title: textTitle,
    author: textAuthor,
    year: textYear,
    isChecked: isChecked,
  };

  console.log(dataBook);
  const book = makeBook(textTitle, textAuthor, textYear, isChecked, bookId);
  const bookObject = composeBookObject(
    textTitle,
    textAuthor,
    textYear,
    isChecked
  );
  book[BOOK_ITEMID] = bookObject.id;
  bookShelf.push(bookObject);

  console.log(bookObject);
  if (isChecked === false) {
    incompleteBookList.append(book);
  } else {
    completeBookList.append(book);
  }
  updateDataToStorage();

  alert("Buku berhasil ditambahkan");

  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;
}

function makeBook(bookTitle, bookAuthor, bookYear, isComplete, bookId) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = bookTitle;
  textTitle.setAttribute("data-testid", "bookItemTitle");

  const textAuthor = document.createElement("p");
  textAuthor.innerText = bookAuthor;
  textAuthor.classList.add("penulis");
  textAuthor.setAttribute("data-testid", "bookItemAuthor");

  const textYear = document.createElement("p");
  textYear.innerText = bookYear;
  textYear.classList.add("tahun");
  textYear.setAttribute("data-testid", "bookItemYear");

  const action = document.createElement("div");
  action.classList.add("action");
  if (isComplete === false) {
    action.append(
      createGreenReadButton(),
      createBlueButton(),
      createRedButton()
    );
  } else if (isComplete === true) {
    action.append(
      createGreenNotYetReadButton(),
      createBlueButton(),
      createRedButton()
    );
  }
  const textArticle = document.createElement("article");
  textArticle.classList.add("book_item");
  textArticle.setAttribute("data-bookid", bookId);
  textArticle.setAttribute("data-testid", "bookItem");
  textArticle.append(textTitle, textAuthor, textYear, action);
  return textArticle;
}

function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = buttonText;

  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function addBookToRead(bookElement) {
  const bookListCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const bookId = bookElement.getAttribute("data-bookid");
  console.log("bookId:", bookId); // Log bookId
  const book = findBook(bookId);
  console.log("book:", book); // Log the book object
  if (book) {
    book.isComplete = true;

    const bookToRead = makeBook(
      book.title,
      book.author,
      book.year,
      true,
      bookId
    );
    bookToRead.setAttribute("data-bookid", book.id);

    bookListCompleted.append(bookToRead);
    bookElement.remove();
    updateDataToStorage();
  } else {
    console.error("Book not found");
  }
}

function createGreenReadButton() {
  return createButton("green", "Selesai dibaca", function (event) {
    addBookToRead(event.target.parentElement.parentElement);
  });
}

function addBookToNotYetRead(bookElement) {
  const bookListNotYetCompleted = document.getElementById(
    INCOMPLETE_LIST_BOOK_ID
  );
  const bookId = bookElement.getAttribute("data-bookid");
  const book = findBook(bookId);
  book.isComplete = false;

  const bookToNotYetRead = makeBook(
    book.title,
    book.author,
    book.year,
    false,
    bookId
  );
  bookToNotYetRead.setAttribute("data-bookid", book.id);

  bookListNotYetCompleted.append(bookToNotYetRead);
  bookElement.remove();
  updateDataToStorage();
}

function createGreenNotYetReadButton() {
  return createButton("green", "Belum selesai dibaca", function (event) {
    addBookToNotYetRead(event.target.parentElement.parentElement);
  });
}

function removeBook(bookElement) {
  if (confirm("Apakah anda ingin menghapus buku ini?")) {
    const bookId = bookElement.getAttribute("data-bookid");
    const bookPosition = findBookIndex(bookId);
    bookShelf.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
  } else {
    alert("Buku tidak dihapus.");
  }
}

function createRedButton() {
  return createButton("red", "Hapus buku", function (event) {
    removeBook(event.target.parentElement.parentElement);
  });
}

function editBook(bookElement) {
  const bookId = bookElement.getAttribute("data-bookid");
  const book = findBook(bookId);

  const title = bookElement.querySelector("h3").innerText;
  const author = bookElement.querySelector(".penulis").innerText;
  const year = parseInt(bookElement.querySelector(".tahun").innerText);

  const newTextTitle = prompt("Edit Judul:", title);
  const newTextAuthor = prompt("Edit Penulis:", author);

  let newTextYear;
  do {
    newTextYear = prompt("Edit Tahun (hanya angka):", year);
  } while (newTextYear !== null && !/^\d+$/.test(newTextYear));

  if (newTextTitle && newTextAuthor && newTextYear) {
    book.title = newTextTitle;
    book.author = newTextAuthor;
    book.year = parseInt(newTextYear);

    const updatedBookElement = makeBook(
      newTextTitle,
      newTextAuthor,
      newTextYear,
      book.isComplete,
      bookId
    );
    updatedBookElement.setAttribute("data-bookid", book.id);

    bookElement.replaceWith(updatedBookElement);

    updateDataToStorage();
  }
}

function createBlueButton() {
  return createButton("blue", "Edit Buku", function (event) {
    editBook(event.target.parentElement.parentElement);
  });
}

function searchBook() {
  let input, filter, all, a, i, textValue;
  input = document.getElementById("searchBookTitle");
  filter = input.value.toUpperCase();
  all = document.querySelectorAll("article");

  for (i = 0; i < all.length; i++) {
    a = all[i].getElementsByTagName("h3")[0];
    textValue = a.textContent || a.innerText;

    if (textValue.toUpperCase().indexOf(filter) > -1) {
      all[i].style.display = "";
    } else {
      all[i].style.display = "none";
    }
  }
}

function resetSearchBook() {
  let input, filter, all, i;
  input = document.getElementById("searchBookTitle");
  filter = input.value.toUpperCase();
  all = document.querySelectorAll("article");

  for (i = 0; i < all.length; i++) {
    all[i].style.display = "";
  }
}
