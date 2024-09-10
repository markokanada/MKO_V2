<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$user = isset($_GET['username']) ? $_GET['username'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';

$user = trim($user); 

if (empty($id)) {
    die("Error: ID is empty.");
}

$servername = "192.168.1.61";
$username = "admin";
$password = "982467";
$dbname = "00653382_mko";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}

$userCondition = '';
if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
    $email = mysqli_real_escape_string($conn, $user);
    $userQuery = "SELECT username FROM users WHERE email = '${email}'";
    $userResult = mysqli_query($conn, $userQuery);
    if ($userResult === false) {
        die("User query execution failed: " . mysqli_error($conn));
    }
    $userData = mysqli_fetch_assoc($userResult);
    if ($userData) {
        $user = $userData['username'];
    }
}

$id = mysqli_real_escape_string($conn, $id);

// Lekérdezzük a rendelestervek táblából az adatokat
$groupQuery = "SELECT id, rendelesnev, tervezettdatum FROM rendelestervek WHERE id = '${id}' AND username = '${user}'";
$groupResult = mysqli_query($conn, $groupQuery);
if ($groupResult === false) {
    die("Group query execution failed: " . mysqli_error($conn));
}
$groupData = mysqli_fetch_assoc($groupResult);
if (!$groupData) {
    die("Group not found.");
}

$collectionData = array();
$wishlistGroupQuery = "SELECT id, nev FROM wishlist_csoportok WHERE username = '${user}'";
$wishlistGroupResult = mysqli_query($conn, $wishlistGroupQuery);
if ($wishlistGroupResult === false) {
    die("Wishlist group query execution failed: " . mysqli_error($conn));
}

while ($wishlistGroupRow = mysqli_fetch_assoc($wishlistGroupResult)) {
    $collection = array(
        "id" => $wishlistGroupRow['id'],
        "collectionName" => $wishlistGroupRow['nev'],
        "elements" => array()
    );

    $wishlistQuery = "SELECT id, price, cim FROM wishlist WHERE username = '${user}' AND wlname= '${wishlistGroupRow['nev']}'";
    $wishlistResult = mysqli_query($conn, $wishlistQuery);
    if ($wishlistResult === false) {
        die("Wishlist query execution failed: " . mysqli_error($conn));
    }

    while ($wishlistRow = mysqli_fetch_assoc($wishlistResult)) {
        $element = array(
            "id" => $wishlistRow['id'],
            "price" => (double) $wishlistRow['price'],
            "nev" => $wishlistRow['cim']
        );
        $collection["elements"][] = $element;
    }

    $collectionData[] = $collection;
}

$responseData = array(
    "id" => (int) $groupData['id'],
    "rendelesnev" => $groupData['rendelesnev'],
    "tervezettdatum" => $groupData['tervezettdatum'],
    "collections" => $collectionData
);

$json = json_encode($responseData);

header('Content-Type: application/json');
echo $json;

mysqli_close($conn);
?>
