document.addEventListener("DOMContentLoaded", function () {
    const submitBook = document.getElementById("inputBook");

    submitBook.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    const lookBook = document.getElementById("searchBook");

    lookBook.addEventListener("submit", function(event){
        event.preventDefault();
        searchBook();
    });

    lookBook.addEventListener("reset", function(event){
        event.preventDefault();
        resetSearchBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBookshelf();
});