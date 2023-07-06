<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
if(isset($_FILES['image']) && $_FILES['image']['error'] == 0 && isset($_POST['username'])) {
    // Az űrlap adatok sikeresen érkeztek a szerverre
    $username = $_POST['username'];
    $target_dir = "uploads/" . $username . "/"; // Célkönyvtár a feltöltött fájlok tárolására
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true); // Létrehozzuk a felhasználónévvel elnevezett mappát, ha még nem létezik
    }
    $target_file = $target_dir . basename($_FILES["image"]["name"]); // A fájl elérési útvonala a célmappában
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION)); // A fájl kiterjesztése
    $maxFileSize = 25 * 1024 * 1024; // A maximális fájlméret (25MB)

    // Ellenőrizzük a fájl méretét és típusát
    if ($_FILES["image"]["size"] > $maxFileSize) {
        echo "A kép mérete túl nagy!";
    } else if ($imageFileType != "jpg" && $imageFileType != "jpeg" && $imageFileType != "png") {
        echo "Csak JPG, JPEG és PNG fájlok tölthetőek fel!";
    } else {
        // A fájlmentése a célmappába
if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    // Sikeres fájlmentés
    echo "A fájl sikeresen feltöltve! Az elérési útvonal: " . $target_file;
    } else {
    echo "Hiba történt a fájl feltöltése közben!";
    }
    }
    } else {
    // Hiba történt az űrlap adatok átvétele közben
    echo "Hiba történt az űrlap adatok átvétele közben!";
    }
    // Bezárjuk a kapcsolatot az adatbázissal
mysqli_close($conn);
?>
