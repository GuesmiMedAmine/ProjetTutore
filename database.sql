CREATE DATABASE IF NOT EXISTS bibliotheque;
USE bibliotheque;

-- Table des livres
CREATE TABLE IF NOT EXISTS livres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    openlibrary_id VARCHAR(50) UNIQUE NOT NULL, -- Stocke l'ID Open Library
    disponible BOOLEAN DEFAULT 1 -- 1 = empruntable, 0 = indisponible
);


-- Table des intérêts des utilisateurs pour les livres indisponibles
CREATE TABLE IF NOT EXISTS interets_clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    livre_id INT NOT NULL,
    FOREIGN KEY (livre_id) REFERENCES livres(id)
);

CREATE TABLE IF NOT EXISTS panier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    openlibrary_id VARCHAR(50) UNIQUE NOT NULL,
    titre VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS interets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    openlibrary_id VARCHAR(50) UNIQUE NOT NULL,
    titre VARCHAR(255) NOT NULL
);

