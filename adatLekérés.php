<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$user = $_GET['username'];

$servername = "hosting2291214.online.pro";
$username = "00653382_mko";
$password = "KellSoHun2022";
$dbname = "00653382_mko";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}


$sql = "SELECT * FROM books WHERE username = '${user}'";
$result = mysqli_query($conn, $sql);


$data = array();
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}
$json = json_encode($data);


header('Content-Type: application/json');
echo $json;


mysqli_close($conn);
?>
