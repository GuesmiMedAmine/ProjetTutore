<?php
include 'db.php';

// Vérifier la connexion à MySQL
if (!$conn) {
    die("❌ Erreur : La connexion à MySQL a échoué.");
} else {
    echo "✅ Connexion à MySQL réussie !<br>";
}

function fetchOpenLibraryBooks($limit = 2000) {
    global $conn;
    
    $inserted = 0;
    $page = 1;

    while ($inserted < $limit) {
        $url = "https://openlibrary.org/search.json?q=book&page=$page";
        $response = @file_get_contents($url); // @ pour éviter un warning si l'API ne répond pas

        if (!$response) {
            die("❌ Erreur : Impossible de récupérer les données depuis Open Library.");
        }

        $data = json_decode($response, true);
        if (!isset($data['docs']) || empty($data['docs'])) {
            break;
        }

        foreach ($data['docs'] as $book) {
            if (isset($book['key'])) {
                $openLibraryId = str_replace("/works/", "", $book['key']);

                // Vérifier si le livre existe déjà
                $stmt = $conn->prepare("SELECT id FROM livres WHERE openlibrary_id = ?");
                $stmt->bind_param("s", $openLibraryId);
                $stmt->execute();
                $result = $stmt->get_result();
                
                if ($result->num_rows == 0) { // Si l'ID n'existe pas encore
                    $stmt->close(); // Fermer le premier statement

                    $stmt = $conn->prepare("INSERT INTO livres (openlibrary_id, disponible) VALUES (?, ?)");
                    $available = rand(0, 1); // 50% disponibles, 50% indisponibles
                    $stmt->bind_param("si", $openLibraryId, $available);
                    $stmt->execute();
                    $stmt->close();

                    echo "📚 Livre ajouté : $openLibraryId<br>"; // Afficher chaque livre ajouté
                    $inserted++;
                    
                    if ($inserted >= $limit) break;
                } else {
                    $stmt->close(); // Fermer si le livre existe déjà
                }
            }
        }

        $page++;
    }

    echo "✅ Insertion de $inserted livres terminée !";
}


// Exécuter la fonction
fetchOpenLibraryBooks(2000);

?>
