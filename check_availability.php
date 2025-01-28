<?php
include 'db.php';

if (isset($_GET['id'])) {
    $openLibraryId = $_GET['id'];

    $stmt = $conn->prepare("SELECT disponible FROM livres WHERE openlibrary_id = ?");
    $stmt->bind_param("s", $openLibraryId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode(['disponible' => (bool)$row['disponible']]);
    } else {
        echo json_encode(['disponible' => false]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'ID manquant']);
}
?>
