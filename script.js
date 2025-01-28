// Charger les données depuis localStorage
let panier = JSON.parse(localStorage.getItem("panier")) || [];
let interets = JSON.parse(localStorage.getItem("interets")) || [];

// 🔹 Met à jour le compteur du panier et des intérêts
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    updateInterestCount();
});

// Met à jour le compteur du panier
function updateCartCount() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    document.getElementById("panier-count").textContent = panier.length;
}

// Met à jour le compteur des intérêts
function updateInterestCount() {
    let interets = JSON.parse(localStorage.getItem("interets")) || [];
    document.getElementById("interets-count").textContent = interets.length;
}

// 🔹 Recherche de livres sur OpenLibrary
function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const url = `https://openlibrary.org/search.json?q=${searchInput}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const books = data.docs;
            const bookList = document.querySelector('.book-list');
            bookList.innerHTML = '';

            if (books.length === 0) {
                bookList.innerHTML = "<p>Aucun livre trouvé.</p>";
                return;
            }

            books.forEach(book => {
                const openLibraryId = book.key.replace('/works/', '');
                const coverUrl = book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                    : 'placeholder.jpg';

                fetch(`check_availability.php?id=${openLibraryId}`)
                    .then(response => response.json())
                    .then(result => {
                        const disponible = result.disponible;

                        const bookCard = document.createElement('div');
                        bookCard.classList.add('book-card');

                        if (!disponible) {
                            bookCard.classList.add('indisponible');
                        }

                        bookCard.innerHTML = `
                            <a href="book_details.html?id=${openLibraryId}">
                                <img src="${coverUrl}" alt="${book.title}" class="book-cover">
                            </a>
                            <h3>${book.title}</h3>
                            <p>Auteur : ${book.author_name?.join(', ') || 'N/A'}</p>
                            <p>Année : ${book.first_publish_year || 'N/A'}</p>
                            ${
                                disponible
                                    ? `<button onclick="ajouterAuPanier('${openLibraryId}', '${book.title}', '${coverUrl}')">Emprunter</button>`
                                    : `<button onclick="expressInterest('${openLibraryId}', '${book.title}', '${coverUrl}')">Intéressé</button>`
                            }
                        `;

                        bookList.appendChild(bookCard);
                    })
                    .catch(error => console.error('Erreur lors de la vérification de la disponibilité :', error));
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des livres :', error));
}

// 🔹 Fonction pour ajouter un livre au panier
function ajouterAuPanier(openLibraryId, title, coverUrl) {
    if (!panier.some(book => book.id === openLibraryId)) {
        panier.push({ id: openLibraryId, title: title, cover: coverUrl });
        localStorage.setItem("panier", JSON.stringify(panier));

        fetch('ajouter_panier.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ openLibraryId, title })
        })
        .then(response => response.json())
        .then(() => {
            alert('📚 Livre ajouté au panier !');
            updateCartCount();
        })
        .catch(error => console.error('Erreur lors de l\'ajout au panier :', error));
    } else {
        alert('📌 Ce livre est déjà dans le panier.');
    }
}

// 🔹 Fonction pour ajouter un livre à la liste d’intérêts
function expressInterest(openLibraryId, title, coverUrl) {
    if (!interets.some(book => book.id === openLibraryId)) {
        interets.push({ id: openLibraryId, title: title, cover: coverUrl });
        localStorage.setItem("interets", JSON.stringify(interets));

        fetch('express_interest.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ openLibraryId, title })
        })
        .then(response => response.json())
        .then(() => {
            alert('⭐ Livre ajouté à la liste des intérêts !');
            updateInterestCount();
        })
        .catch(error => console.error('Erreur lors de l\'ajout aux intérêts :', error));
    } else {
        alert('📌 Ce livre est déjà dans votre liste d\'intérêts.');
    }
}

// 🔹 Supprime un livre du panier
function removeFromPanier(bookId) {
    panier = panier.filter(book => book.id !== bookId);
    localStorage.setItem("panier", JSON.stringify(panier));

    updateCartCount();  // Mettre à jour le compteur
    location.reload();
}

// 🔹 Supprime un livre de la liste d'intérêts
function removeFromInterets(bookId) {
    interets = interets.filter(book => book.id !== bookId);
    localStorage.setItem("interets", JSON.stringify(interets));

    updateInterestCount();  // Mettre à jour le compteur
    location.reload();
}
