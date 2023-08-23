<?php

// CORS fejlécek hozzáadása
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Adatbázis kapcsolódás
$servername = "192.168.1.61";
$username = "admin";
$password = "982467";
$dbname = "00653382_mko";

// POST adatok feldolgozása
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["id"];
    $desiredState = $_POST["desiredState"];

    // Ellenőrizd, hogy a desiredState true vagy false érték-e
    $state = ($desiredState === "true") ? 1 : 0;

    // Adatbázis kapcsolódás létrehozása
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Ellenőrizd a kapcsolatot
    if ($conn->connect_error) {
        die("Sikertelen kapcsolódás: " . $conn->connect_error);
    }

    // Frissítés a táblában az olvasott oszlop alapján
    $sql = "UPDATE books SET olvasott = $state WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo "Rekord frissítve sikeresen";
    } else {
        echo "Hiba történt a rekord frissítésekor: " . $conn->error;
    }

    // Adatbázis kapcsolat bezárása
    $conn->close();
} else {
    echo "Érvénytelen kérés";
}

?>

