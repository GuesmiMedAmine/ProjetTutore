document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");
  
    if (!bookId) {
      document.getElementById("book-details").innerHTML =
        "<p>Erreur : Aucun livre trouvé.</p>";
      return;
    }
  
    const url = `https://openlibrary.org/works/${bookId}.json`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const coverUrl = data.covers
          ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
          : "placeholder.jpg";
  
        const description =
          data.description?.value || data.description || "Aucune description disponible.";
  
        document.getElementById("book-details").innerHTML = `
          <div class="book-detail-card">
            <img src="${coverUrl}" alt="${data.title}" class="book-cover-large">
            <div class="book-info">
              <h2>${data.title}</h2>
              <p><strong>Auteur :</strong> ${
                data.authors?.[0]?.key ? "Chargement en cours..." : "Non spécifié"
              }</p>
              <p><strong>Description :</strong> ${description}</p>
            </div>
          </div>
        `;
  
        if (data.authors?.[0]?.key) {
          fetch(`https://openlibrary.org${data.authors[0].key}.json`)
            .then((response) => response.json())
            .then((authorData) => {
              document.querySelector("#book-details p strong").textContent =
                authorData.name;
            })
            .catch(() => {
              document.querySelector("#book-details p strong").textContent =
                "Non spécifié";
            });
        }
      })
      .catch(() => {
        document.getElementById("book-details").innerHTML =
          "<p>Erreur lors de la récupération des détails du livre.</p>";
      });
  });
  