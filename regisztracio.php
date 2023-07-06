<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if(file_get_contents('php://input') !== null) {
  $inputJSON = file_get_contents('php://input');
  $input = json_decode($inputJSON, TRUE); //convert JSON into array
    $username = $input['username'];
    $email = $input['email'];
    $password_plain = $input['password'];
    $password_hashed = password_hash($password_plain, PASSWORD_DEFAULT);
    
    // Kapcsolódás az adatbázishoz
    $servername = "hosting2291214.online.pro";
    $username_db = "00653382_mko";
    $password_db = "KellSoHun2022";
    $dbname = "00653382_mko";

    $conn = mysqli_connect($servername, $username_db, $password_db, $dbname);
    if (!$conn) {
        echo("kapcsolódási hiba!");
        die("Kapcsolódási hiba: " . mysqli_connect_error());
    }
    else{
      echo("Kapcsolat stabil");
    }
    // Beszúrás az adatbázisba
    $stmt = mysqli_prepare($conn, "INSERT INTO users (username, email, jelszo) VALUES ('$username', '$email', '$password_hashed')");
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
      echo("sikeres beszúrás!");
        echo json_encode(array('success' => true));
    } else {
      echo("Nem sikerült a beszúrás.");
        echo json_encode(array('success' => false));
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} 
else {
    echo json_encode(array('success' => false, 'message' => 'Hiányzó adatok.'));
}
?>






