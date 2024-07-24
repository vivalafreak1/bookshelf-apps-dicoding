document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");

  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  const lookBook = document.getElementById("searchBook");

  lookBook.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  lookBook.addEventListener("reset", function (event) {
    event.preventDefault();
    resetSearchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBookshelf();
});

document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
  }

  darkModeToggle.addEventListener("click", function () {
    if (body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  function enableDarkMode() {
    body.classList.add("dark-mode");
    document
      .querySelectorAll(
        ".input_section, .profile, .search_section, .book_shelf, .book_list > .book_item, .input_section > form > button, .search_section > form > button"
      )
      .forEach((el) => el.classList.add("dark-mode"));
    localStorage.setItem("darkMode", "enabled");
  }

  function disableDarkMode() {
    body.classList.remove("dark-mode");
    document
      .querySelectorAll(
        ".input_section, .profile, .search_section, .book_shelf, .book_list > .book_item, .input_section > form > button, .search_section > form > button"
      )
      .forEach((el) => el.classList.remove("dark-mode"));
    localStorage.setItem("darkMode", null);
  }
});
