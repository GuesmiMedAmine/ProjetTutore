<?php
include 'db.php';

$sql = "SELECT COUNT(*) AS total FROM livres";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

echo "📚 Nombre total de livres enregistrés : " . $row['total'];
?>
