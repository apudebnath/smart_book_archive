
const showSpinner = displayS => {
    document.getElementById('spinner').style.display = displayS;
}

const findBooks = () => {
    const searchText = document.getElementById('search-box').value;
    loadBooks(searchText);
    document.getElementById('search-box').value = '';
    // const mySpinner = document.getElementById('spinner');
    // mySpinner.style.display = 'block';
    showSpinner('block');
}

const loadBooks = (searchText) => {
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayBooks(data))
    
}
loadBooks();

const displayBooks = (books) => {
    const infoContainer = document.getElementById('info-container');
    infoContainer.textContent = '';

    const infoBox = document.createElement('div');
    infoBox.classList.add('info-box');
    infoBox.innerHTML =`
    <p>Search found: <span class="fw-bold">${books.numFound}</span> Search Show:<span class="fw-bold">${books.docs.length}</span></p>
    `;
    infoContainer.appendChild(infoBox);
    
    books.docs.forEach(book => {
        //console.log(book);
        const bookBox = document.createElement('div');
        bookBox.innerHTML =`
        <div class=" p-3 m-3 shadow rounded  bg-white">
        <h2>${book.title}</h2>
        <p><span>Author Name:<span class="fw-bold">${book.author_name} </span> ; </span><span>Published Year:<span class="fw-bold">${book.first_publish_year} </span> ; </span><span>Publisher:<span class="fw-bold"> ${book.publisher}</span></span></p>
        </div>
        `;
        infoContainer.appendChild(bookBox);
        
    });
};
