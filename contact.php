<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $to_email = 'markokanadateam2@gmail.com';

  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $subject = 'Kapcsolatfelvétel: ' . $name;

  $body = "Név: $name\nTelefonszám: $phone\nE-mail cím: $email\n\nÜzenet:\n$message";

  $headers = 'From: mkov2.backend@gmail.com' . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
  if (mail($to_email, $subject, $body, $headers)) {
    echo 'Az üzenet sikeresen elküldve!';
  } else {
    echo 'Az üzenet elküldése sikertelen volt.';
  }
} else {
  header("HTTP/1.1 400 Bad Request");
  echo 'Hiba történt az űrlap elküldése közben.';
}
?>
