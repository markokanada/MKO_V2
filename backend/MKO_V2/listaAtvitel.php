<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$user = isset($_GET['username']) ? $_GET['username'] : '';
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

$servername = "192.168.1.61";
$dbname = "00653382_mko";
$dbusername = "admin";
$password = "982467";

$conn = new mysqli($servername, $dbusername, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$checkQuery = "SELECT * FROM wishlist WHERE id = $id AND username = '$user'";
$checkResult = $conn->query($checkQuery);

if ($checkResult && $checkResult->num_rows > 0) {
    $record = $checkResult->fetch_assoc();
    
    $username = $record['username'];
    $cim = $record['cim'];
    $szerzo = $record['szerzo'];
    $kiado = $record['kiado'];
    $megjelenes = $record['megjelenes'];
    $kep = $record['kep'];
    
    $sql = "INSERT INTO books (username, cim, szerzo, kiado, megjelenes, kep, olvasott)
            VALUES ('$username', '$cim', '$szerzo', '$kiado', '$megjelenes', '$kep', 0)";

    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $deleteQuery = "DELETE FROM wishlist WHERE id = $id AND username = '$user'";
    if ($conn->query($deleteQuery) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }
} else {
    echo "Error: No matching record found for the given id and username.";
    var_dump($user);
    var_dump($id);

}

$conn->close();
?>
