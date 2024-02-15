const STORAGE_KEY = "BOOKSHELF_APPS";

let bookShelf = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
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

    if(data !== null)
        bookShelf = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();    
}

function composeBookObject(Title, Author, Year, isCompleted){
    return {
        id: +new Date(),
        Title,
        Author,
        Year,
        isCompleted
    };
}

function findBook (bookID){
    for(book of bookShelf){
        if(book.id === bookID)
            return book;
    }
    return null;
}

function findBookIndex(bookID) {
    let index = 0;
    for (book of bookShelf){
        if(book.id === bookID)
            return index;

        index++;
    }
    return -1;
}

function refreshDataFromBookshelf() {
    let listUnreadBook = document.getElementById(INCOMPLETE_LIST_BOOK_ID);
    let listreadCompleteBook = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for (book of bookShelf){
        const newBook = makeBook(book.Title, book.Author, book.Year, book.isCompleted)
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            console.log(newBook);
            listreadCompleteBook.append(newBook);
        } else {
            console.log(newBook);
            listUnreadBook.append(newBook);
        }
    }
}