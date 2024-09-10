<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$username = $input["username"];
$rendelesnev = $input["rendelesnev"];
$tervezettdatum = $input["tervezettdatum"];
$kep = $input["kep"];
$euro = $input["euro"];

$servername = "192.168.1.61";
$dbname = "00653382_mko";
$dbusername = "admin";
$password = "982467";

$conn = new mysqli($servername, $dbusername, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO rendelestervek (rendelesnev, tervezettdatum,username, kep, euro) VALUES ('$rendelesnev', '$tervezettdatum','$username', '$kep', '$euro')";

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
