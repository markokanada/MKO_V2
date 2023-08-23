<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Sanitize and validate the input
$user = isset($_GET['username']) ? $_GET['username'] : '';
$user = trim($user); // Remove leading/trailing spaces

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

// Check if the user is an email address
if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
    $email = mysqli_real_escape_string($conn, $user);

    // Fetch the username from the 'users' table based on the email address
    $userQuery = "SELECT username FROM users WHERE email = '${email}'";
    $userResult = mysqli_query($conn, $userQuery);

    if ($userResult === false) {
        die("User query execution failed: " . mysqli_error($conn));
    }

    $userData = mysqli_fetch_assoc($userResult);
    if (!$userData) {
        die("User not found.");
    }

    // Set the $user variable to the username fetched from the 'users' table
    $user = $userData['username'];
}

// Prepare the SQL query with proper sanitization (to prevent SQL injection)
$user = mysqli_real_escape_string($conn, $user);
$sql = "SELECT * FROM books WHERE (username = '${user}') ORDER BY olvasott DESC, cim ASC";

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

