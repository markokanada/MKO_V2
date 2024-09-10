<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$username= $input["username"];
$cim= $input["cim"];
$szerzo= $input["szerzo"];
$kiado= $input["kiado"];
$megjelenes= $input["megjelenes"];
$kep= $input["kep"];




$servername = "192.168.1.61";
$dbname = "00653382_mko";
$dbusername = "admin";
$password = "982467";

$conn = new mysqli($servername, $dbusername, $password, $dbname);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sql = "INSERT INTO books (username, cim, szerzo, kiado, megjelenes,kep, olvasott )
VALUES ('$username', '$cim', '$szerzo', '$kiado', '$megjelenes', '$kep', 0)";

if ($conn->query($sql) === TRUE) {
  echo "success";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
