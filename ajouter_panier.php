<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$openLibraryId = $data['openLibraryId'];
$title = $data['title'];

if (!empty($openLibraryId) && !empty($title)) {
    $stmt = $conn->prepare("INSERT INTO panier (openlibrary_id, titre) VALUES (?, ?)");
    $stmt->bind_param("ss", $openLibraryId, $title);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Livre ajouté au panier"]);
    } else {
        echo json_encode(["error" => "Erreur lors de l'ajout"]);
    }
    $stmt->close();
} else {
    echo json_encode(["error" => "Données invalides"]);
}
?>
