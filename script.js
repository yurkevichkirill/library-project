const myLibrary = [];

function Book(name, author, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.read = read;  
    this.rating = null;  
}

Book.prototype.setRating = function(rating){
    if(this.read === true){
        this.rating = rating;
    }
}

Book.prototype.changeRead = function(){
    this.read = !this.read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeFromLibrary(id){
    myLibrary.forEach(book => {
        if(book.id === id){
            myLibrary.splice(myLibrary.indexOf(book), 1);
        }
    })
}

function toggleRead(id){
    myLibrary.forEach(book => {
        if(book.id === id){
            book.changeRead();
        }
    })
}

function createRead(id){
    const newRead = document.createElement("button");
    newRead.textContent = "Read";
    newRead.classList.add("read-btn");
    newRead.dataset.id = id; 
    return newRead;
}

function createRemove(id){
    const newRemove = document.createElement("button");
    newRemove.textContent = "Remove";
    newRemove.classList.add("remove");
    newRemove.dataset.id = id;
    // newRemove.addEventListener("click", (event) => {
    //     const bookId = id;
    //     removeFromLibrary(bookId);
    // });
    return newRemove;
}

const main = document.querySelector("main");

function displayBooks(){
    while(main.firstChild){
        main.removeChild(main.firstChild);
    }
    myLibrary.forEach(book =>{
        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = "Name: " + book.name;

        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = "Author: " + book.author;

        const read = document.createElement("div");
        read.classList.add("read");
        read.textContent = "Read: " + (book.read?"yes":"no");

        const rating = document.createElement("div");
        rating.classList.add("rating");
        rating.textContent = "Rating: " + ((book.rating === null)?"undefined":book.rating);

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.appendChild(name);
        bookDiv.appendChild(author);
        bookDiv.appendChild(read);
        bookDiv.appendChild(rating);

        const newRemove = createRemove(book.id);
        bookDiv.appendChild(newRemove);

        const newRead = createRead(book.id);
        bookDiv.appendChild(newRead);

        main.appendChild(bookDiv);
        
    })
}


const addButton = document.querySelector(".add-new");
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newName = document.querySelector("#name").value;
    const newAuthor = document.querySelector("#author").value;
    const newRead = document.querySelector("#read").value === "yes"?true:false;
    const newRating = document.querySelector("#rating").value;
    const newBook = new Book(newName, newAuthor, newRead);
    newBook.setRating(newRating);
    console.log(newBook);
    addBookToLibrary(newBook);
    displayBooks();
});

main.addEventListener("click", (event) => {
    if(event.target.classList.contains("remove")){
        const bookId = event.target.dataset.id;
        removeFromLibrary(bookId);
        displayBooks();
    }
})

main.addEventListener("click", (event) => {
    if(event.target.classList.contains("read-btn")){
        const bookId = event.target.dataset.id;
        toggleRead(bookId);
        displayBooks();
        console.log("hello");
    }
})
