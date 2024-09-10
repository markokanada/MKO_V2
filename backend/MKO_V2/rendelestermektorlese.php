<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$user = isset($_GET['username']) ? $_GET['username'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';

$servername = "192.168.1.61";
$dbname = "00653382_mko";
$dbusername = "admin";
$password = "982467";

$conn = new mysqli($servername, $dbusername, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$checkQuery = "SELECT id FROM rendelestermekek WHERE id = $id AND username = '$user'";
$checkResult = $conn->query($checkQuery);

if ($checkResult->num_rows > 0) {
    $deleteQuery = "DELETE FROM rendelestermekek WHERE id = $id AND username = '$user'";
    if ($conn->query($deleteQuery) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }
} else {
    echo "Error: No matching record found for the given id and username.";
}

$conn->close();
?>
