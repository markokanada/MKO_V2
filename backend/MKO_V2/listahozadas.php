<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$username = $input["username"];
$cim = $input["cim"];
$szerzo = $input["szerzo"];
$kiado = $input["kiado"];
$megjelenes = $input["megjelenes"];
$kep = $input["kep"];
$price = doubleval($input["price"]);
$id = $input["id"];

$servername = "192.168.1.61";
$dbname = "00653382_mko";
$dbusername = "admin";
$password = "982467";

$conn = new mysqli($servername, $dbusername, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$wlnameQuery = "SELECT nev FROM wishlist_csoportok WHERE id = $id";
$wlnameResult = $conn->query($wlnameQuery);

if ($wlnameResult->num_rows > 0) {
    $row = $wlnameResult->fetch_assoc();
    $wlname = $row["nev"];

    $sql = "INSERT INTO wishlist (username, cim, szerzo, kiado, megjelenes, kep, price, wlname)
            VALUES ('$username', '$cim', '$szerzo', '$kiado', '$megjelenes', '$kep', '$price', '$wlname')";

    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Error: Could not find corresponding wlname for the given id.";
}

$conn->close();
?>
