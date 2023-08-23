<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Ellenőrizzük, hogy az űrlap elküldése történt-e
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Beállítjuk a címzett e-mail címét
  $to_email = 'markokanadateam2@gmail.com';

  // Az űrlapról kapott adatok
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  // Az e-mail tárgya
  $subject = 'Kapcsolatfelvétel: ' . $name;

  // Az e-mail tartalma
  $body = "Név: $name\nTelefonszám: $phone\nE-mail cím: $email\n\nÜzenet:\n$message";

  // Az e-mail küldése
  $headers = 'From: mkov2.backend@gmail.com' . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
  if (mail($to_email, $subject, $body, $headers)) {
    // Sikeres küldés esetén visszatérünk egy siker üzenettel
    echo 'Az üzenet sikeresen elküldve!';
  } else {
    // Sikertelen küldés esetén visszatérünk egy hiba üzenettel
    echo 'Az üzenet elküldése sikertelen volt.';
  }
} else {
  // Ha nem POST kérés érkezett, akkor hibát dobunk
  header("HTTP/1.1 400 Bad Request");
  echo 'Hiba történt az űrlap elküldése közben.';
}
?>
