<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$user = isset($_GET['username']) ? $_GET['username'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';

$user = trim($user);

if (empty($id) || empty($user)) {
    die("Error: ID or username is empty.");
}

$servername = "192.168.1.61";
$username = "admin";
$password = "982467";
$dbname = "00653382_mko";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}

$userCondition = '';
if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
    $email = mysqli_real_escape_string($conn, $user);
    $userQuery = "SELECT username FROM users WHERE email = '${email}'";
    $userResult = mysqli_query($conn, $userQuery);
    if ($userResult === false) {
        die("User query execution failed: " . mysqli_error($conn));
    }
    $userData = mysqli_fetch_assoc($userResult);
    if ($userData) {
        $user = mysqli_real_escape_string($conn, $userData['username']);
    }
}

$id = mysqli_real_escape_string($conn, $id);

if (isset($_POST['numbers'])) {
    $numbersString = $_POST['numbers'];
    $idArray = explode(',', $numbersString);

    foreach ($idArray as $idItem) {
        $idItem = mysqli_real_escape_string($conn, $idItem);

        $groupQuery = "SELECT rendelesnev FROM rendelestervek WHERE id = '${id}' AND username = '${user}'";
        $groupResult = mysqli_query($conn, $groupQuery);

        if ($groupResult === false) {
            die("Group query execution failed: " . mysqli_error($conn));
        }

        $groupData = mysqli_fetch_assoc($groupResult);
        if ($groupData) {
            $groupName = mysqli_real_escape_string($conn, $groupData['rendelesnev']);

            $sql = "SELECT cim, szerzo, price, kep, kiado, megjelenes FROM wishlist WHERE id = ${idItem} AND username = '${user}'";
            if ($result === false) {
                echo "Wishlist query execution failed: " . mysqli_error($conn);
                die();
            }
            
            $result = mysqli_query($conn, $sql);
            var_dump($sql);
            var_dump($result);
            if ($result === false) {
                die("Wishlist query execution failed: " . mysqli_error($conn));
            }

            while ($row = mysqli_fetch_assoc($result)) {

                $cim = mysqli_real_escape_string($conn, $row['cim']);
                $szerzo = mysqli_real_escape_string($conn, $row['szerzo']);
                $price = floatval($row['price']);
                $kep = mysqli_real_escape_string($conn, $row['kep']);
                $kiado = mysqli_real_escape_string($conn, $row['kiado']);
                $megjelenes = mysqli_real_escape_string($conn, $row['megjelenes']);

                $insertSql = "INSERT INTO rendelestermekek (wishlist_id,cim, szerzo, price, kep, kiado, megjelenes, rendelesterv_nev, username) VALUES ('$idItem','$cim', '$szerzo', $price, '$kep', '$kiado', '$megjelenes', '$groupName', '$user')";

                $insertResult = mysqli_query($conn, $insertSql);
                if ($insertResult === false) {
                    die("Insert query execution failed: " . mysqli_error($conn));
                }
            }
        }
    }

    echo "Sikeresen hozzáadva a rendelestermek táblához.";
} else {
    die("Error: 'numbers' POST parameter is missing.");
}

mysqli_close($conn);
?>
