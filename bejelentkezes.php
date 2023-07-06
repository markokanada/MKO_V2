<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE); 
  $email_username = $input["username"];
  $userpassword = $input["password"];

  $servername = "hosting2291214.online.pro";
  $username = "00653382_mko";
  $password = "KellSoHun2022";
  $dbname = "00653382_mko";

  $dsn = "mysql:host=$servername;dbname=$dbname;charset=utf8";
  $pdo=new \PDO($dsn,$username,$password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $sql = "SELECT * FROM users WHERE (email = :credentials OR username = :credentials)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    ":credentials" => $email_username
  ]);

  $row = $stmt->fetch(\PDO::FETCH_ASSOC);

  if($row !== false){
    if (password_verify($userpassword, $row['jelszo'])) {
        setcookie("user", $row["username"], time() + 900);
        echo json_encode(array("success" => true));
    }
    else{
        echo json_encode(array("success" => false, "message" => "Hibás jelszó!"));
    }  }
  else {

    echo json_encode(array("success" => false, "message" => "A megadott felhasználónév vagy e-mail cím nem található!"));
  }

}
?>
