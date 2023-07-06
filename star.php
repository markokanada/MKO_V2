<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
  $data = $_POST["data"];

  
  $date = date("Y-m-d H:i:s");
  $id = uniqid();

  
  $servername = "hosting2291214.online.pro";
  $username = "00653382_mko";
  $password = "KellSoHun2022";
  $dbname = "00653382_mko";
  $conn = new mysqli($servername, $username, $password, $dbname);

  
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  
  $sql = "INSERT INTO stars (id, data, date) VALUES ('$id', '$data', '$date')";
  if ($conn->query($sql) === TRUE) {
    
    $result = $conn->query("SELECT AVG(data) FROM stars");
    $average = $result->fetch_assoc()["AVG(data)"];
    echo json_encode($average);
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  
  $conn->close();
}

?>
