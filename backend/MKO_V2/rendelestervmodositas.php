<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// URL-ből kapott username és id
$username = isset($_GET['username']) ? $_GET['username'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';

$username = trim($username);
if (empty($username) || empty($id)) {
    die("Error: Username or ID is empty.");
}

// Ellenőrzés és normalizálás az email vagy username alapján
$servername = "192.168.1.61";
$usernameDB = "admin";
$passwordDB = "982467";
$dbname = "00653382_mko";

$conn = mysqli_connect($servername, $usernameDB, $passwordDB, $dbname);
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}

if (filter_var($username, FILTER_VALIDATE_EMAIL)) {
    $email = mysqli_real_escape_string($conn, $username);

    $userQuery = "SELECT username FROM users WHERE email = '${email}'";
    $userResult = mysqli_query($conn, $userQuery);

    if ($userResult === false) {
        die("User query execution failed: " . mysqli_error($conn));
    }

    $userData = mysqli_fetch_assoc($userResult);
    if (!$userData) {
        die("User not found.");
    }

    $username = $userData['username'];
}

$username = mysqli_real_escape_string($conn, $username);

// POST-ból kapott "double" érték
$euro = isset($_POST['euro']) ? floatval($_POST['euro']) : 0.0;

// Módosítás az "euro" mezőben a "rendelestervek" táblában
$sql = "UPDATE rendelestervek SET euro = ${euro} WHERE username = '${username}' AND id = ${id}";

if (mysqli_query($conn, $sql)) {
    echo "Sikeres módosítás.";
} else {
    echo "Hiba a módosítás során: " . mysqli_error($conn);
}

mysqli_close($conn);
?>

