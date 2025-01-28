<?php
$host = 'localhost'; // Adresse du serveur MySQL
$user = 'root'; // Nom d'utilisateur MySQL
$password = ''; // Mot de passe (par défaut vide pour XAMPP)
$database = 'bibliotheque'; // Nom de ta base de données

// Connexion à MySQL
$conn = new mysqli($host, $user, $password, $database);

// Vérification de la connexion
if ($conn->connect_error) {
    die("❌ Erreur de connexion à MySQL : " . $conn->connect_error);
}
?>
