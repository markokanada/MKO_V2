<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$user = isset($_GET['username']) ? $_GET['username'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';

$user = trim($user); 

if (empty($user) || empty($id)) {
    die("Error: Username or ID is empty.");
}

$servername = "192.168.1.61";
$username = "admin";
$password = "982467";
$dbname = "00653382_mko";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}

if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
    $email = mysqli_real_escape_string($conn, $user);

    $userQuery = "SELECT username FROM users WHERE email = '${email}'";
    $userResult = mysqli_query($conn, $userQuery);

    if ($userResult === false) {
        die("User query execution failed: " . mysqli_error($conn));
    }

    $userData = mysqli_fetch_assoc($userResult);
    if (!$userData) {
        die("User not found.");
    }

    $user = $userData['username'];
}

$user = mysqli_real_escape_string($conn, $user);
$id = mysqli_real_escape_string($conn, $id);

$wishlistQuery = "SELECT nev FROM wishlist_csoportok WHERE id = '${id}' AND username = '${user}'";
$wishlistResult = mysqli_query($conn, $wishlistQuery);

if ($wishlistResult === false) {
    die("Wishlist query execution failed: " . mysqli_error($conn));
}

$wishlistData = mysqli_fetch_assoc($wishlistResult);
if (!$wishlistData) {
    die("Wishlist not found.");
}

$wishlistName = $wishlistData['nev'];

$sql = "SELECT * FROM wishlist WHERE wlname = '${wishlistName}'";

if ($id === "2") {
    $sql = "SELECT * FROM wishlist WHERE username = '${user}'";
}

$result = mysqli_query($conn, $sql);

if ($result === false) {
    die("Wishlist books query execution failed: " . mysqli_error($conn));
}

$data = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}

$json = json_encode($data);

header('Content-Type: application/json');
echo $json;

mysqli_close($conn);
?>
