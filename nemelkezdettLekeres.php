<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$user = isset($_GET['username']) ? $_GET['username'] : '';
$user = trim($user); 
if (empty($user)) {
    die("Error: Username is empty.");
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
$sql = "SELECT * FROM books WHERE (username = '${user}') AND olvasott=0 ORDER BY olvasott DESC, cim ASC";

$result = mysqli_query($conn, $sql);

if ($result === false) {
    die("Books query execution failed: " . mysqli_error($conn));
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

