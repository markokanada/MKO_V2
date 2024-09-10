<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true); 

if ($input === null || json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(array('success' => false, 'message' => 'Invalid JSON data.'));
    exit;
}

if (!isset($input['username']) || !isset($input['email']) || !isset($input['password'])) {
    echo json_encode(array('success' => false, 'message' => 'Missing data fields.'));
    exit;
}

$username = $input['username'];
$email = $input['email'];
$password_plain = $input['password'];
$password_hashed = password_hash($password_plain, PASSWORD_DEFAULT);
$tipus = 0;

var_dump($username);
var_dump($email);
var_dump($password_plain);
var_dump($password_hashed);

$servername = "192.168.1.61";
$username_db = "admin";
$password_db = "982467";
$dbname = "00653382_mko";

$conn = mysqli_connect($servername, $username_db, $password_db, $dbname);
if (!$conn) {
    echo "kapcsolódási hiba!";
    die("Kapcsolódási hiba: " . mysqli_connect_error());
} else {
    echo "Kapcsolat stabil";
}

var_dump($conn); 
$stmt = mysqli_prepare($conn, "INSERT INTO users (username, email, jelszo, tipus) VALUES (?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, "ssss", $username, $email, $password_hashed, $tipus); // Assuming 'jelszo' column is of string type ('s')
$result = mysqli_stmt_execute($stmt);

var_dump($result); 
if (mysqli_affected_rows($conn) > 0) {
    echo "Data inserted successfully!";
} else {
    echo "No data inserted.";
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>

