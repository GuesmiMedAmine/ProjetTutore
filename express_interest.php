<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$openLibraryId = $data['openLibraryId'] ?? null;

if ($openLibraryId) {
    $stmt = $conn->prepare("INSERT IGNORE INTO interets (openlibrary_id) VALUES (?)");
    $stmt->bind_param("s", $openLibraryId);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Livre ajouté à la liste d'intérêts"]);
    } else {
        echo json_encode(["error" => "Erreur lors de l'ajout"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Données invalides"]);
}
?>
