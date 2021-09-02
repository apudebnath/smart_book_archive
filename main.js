const errorBox = document.getElementById('error'); 

const findBooks = () => {
    const searchText = document.getElementById('search-box').value;
    if(searchText === ""){
        errorBox.innerText = "No result found";
    }
    else{
        errorBox.innerText = '';
    };

    loadBooks(searchText);
    document.getElementById('search-box').value = '';
}

const loadBooks = (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayBooks(data))   
}


const displayBooks = (books) => {
    const infoContainer = document.getElementById('info-container');
    infoContainer.textContent = '';
    const dataContainer= document.getElementById('data-container');
    dataContainer.textContent = '';
    const infoBox = document.createElement('div');
    infoBox.classList.add('info-box');
    infoBox.innerHTML =`
    <p>Search found: <span class="fw-bold">${books.numFound}</span> Search Show:<span class="fw-bold">${books.docs.length}</span></p>
    `;
    dataContainer.appendChild(infoBox);

    
    books.docs?.forEach(book => {
        console.log(book);
        const bookBox = document.createElement('div');
        bookBox.classList.add('col-md-4');
        bookBox.innerHTML =`
        <div class="h-100 pt-5 px-3 mx-auto overflow-auto shadow rounded  bg-white">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
        <h4 class="fs-4">${book.title}</h4>
        <p><span>Author:<span class="fw-bold">${book.author_name} </span> ; </span><span>Published Year:<span class="fw-bold">${book.first_publish_year} </span> ; </span><span>Publisher:<span class="fw-bold"> ${book.publisher[0]}</span></span></p>
        </div>
        `;
        infoContainer.appendChild(bookBox);
    });

};

