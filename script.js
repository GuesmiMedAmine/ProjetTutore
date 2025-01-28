// Fonction pour rechercher des livres sur Open Library
function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();
    const url = `https://openlibrary.org/search.json?title=${searchInput}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const books = data.docs;
        const bookList = document.querySelector('.book-list');
        bookList.innerHTML = '';
  
        books.forEach(book => {
          // Appliquer le filtre de catégorie
          const category = book.subject ? book.subject[0].toLowerCase() : '';
          if (categoryFilter === '' || category.includes(categoryFilter)) {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
  
            // Image de couverture du livre
            const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'cover.jpg';
  
            bookCard.innerHTML = `
              <img src="${coverUrl}" alt="${book.title}" class="book-cover">
              <h3>${book.title}</h3>
              <p>Auteur : ${book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
              <p>Catégorie : ${book.subject ? book.subject.join(', ') : 'N/A'}</p>
              <p>Année de publication : ${book.first_publish_year ? book.first_publish_year : 'N/A'}</p>
              <p>ISBN : ${book.isbn ? book.isbn[0] : 'N/A'}</p>
              <p>Description : ${book.first_sentence ? book.first_sentence[0] : 'N/A'}</p>
              <button>Emprunter</button>
            `;
            bookList.appendChild(bookCard);
          }
        });
      });
  }
  
  // Fonction pour ajouter un livre (simulée pour l'instant)
  document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const year = document.getElementById('year').value;
    const isbn = document.getElementById('isbn').value;
    const description = document.getElementById('description').value;
    const copies = document.getElementById('copies').value;
  
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h3>${title}</h3>
      <p>Auteur : ${author}</p>
      <p>Catégorie : ${category}</p>
      <p>Année de publication : ${year}</p>
      <p>ISBN : ${isbn}</p>
      <p>Description : ${description}</p>
      <p>Nombre d'exemplaires disponibles : ${copies}</p>
      <button onclick="deleteBook(this)">Supprimer</button>
    `;
    document.querySelector('.book-list').appendChild(bookCard);
  });
  
  // Fonction pour supprimer un livre
  function deleteBook(button) {
    button.parentElement.remove();
  }
    