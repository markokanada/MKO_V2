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




$servername = "hosting2291214.online.pro";
$dbname = "00653382_mko";
$dbusername = "00653382_mko";
$password = "KellSoHun2022";

$conn = new mysqli($servername, $dbusername, $password, $dbname);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sql = "INSERT INTO books (username, cim, szerzo, kiado, megjelenes,kep )
VALUES ('$username', '$cim', '$szerzo', '$kiado', '$megjelenes', '$kep')";

if ($conn->query($sql) === TRUE) {
  echo "success";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
