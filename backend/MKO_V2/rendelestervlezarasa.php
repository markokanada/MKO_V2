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

            $rendelestermekekQuery = "SELECT wishlist_id, cim, szerzo, kep, kiado, megjelenes FROM rendelestermekek WHERE id = ${idItem} AND username = '${user}'";
            $rendelestermekekResult = mysqli_query($conn, $rendelestermekekQuery);

            if ($rendelestermekekResult === false) {
                die("Rendelestermekek query execution failed: " . mysqli_error($conn));
            }

            while ($row = mysqli_fetch_assoc($rendelestermekekResult)) {
                $wishlist_id = mysqli_real_escape_string($conn, $row['wishlist_id']);
                $cim = mysqli_real_escape_string($conn, $row['cim']);
                $szerzo = mysqli_real_escape_string($conn, $row['szerzo']);
                $kep = mysqli_real_escape_string($conn, $row['kep']);
                $kiado = mysqli_real_escape_string($conn, $row['kiado']);
                $megjelenes = mysqli_real_escape_string($conn, $row['megjelenes']);

                $insertSql = "INSERT INTO books (username, cim, szerzo, kep, kiado, megjelenes, olvasott) 
                              VALUES ('$user', '$cim', '$szerzo', '$kep', '$kiado', '$megjelenes', 0)";

                $insertResult = mysqli_query($conn, $insertSql);
                if ($insertResult === false) {
                    die("Insert query execution failed: " . mysqli_error($conn));
                }
                $deleteWishlistQuery = "DELETE FROM wishlist WHERE id = ${wishlist_id} AND username = '${user}'";
                $deleteWishlistResult = mysqli_query($conn, $deleteWishlistQuery);
    
                if ($deleteWishlistResult === false) {
                    die("Delete wishlist query execution failed: " . mysqli_error($conn));
                }

            }

            $deleteRendelestermekekQuery = "DELETE FROM rendelestermekek WHERE id = '${idItem}' AND username = '${user}'";
            $deleteRendelestermekekResult = mysqli_query($conn, $deleteRendelestermekekQuery);

            if ($deleteRendelestermekekResult === false) {
                die("Delete rendelestermekek query execution failed: " . mysqli_error($conn));
            }



        }
    }


$query = "SELECT nev FROM wishlist_csoportok WHERE username = '$user'";
$result = mysqli_query($conn, $query);

if ($result === false) {
    die("Query execution failed: " . mysqli_error($conn));
}

while ($row = mysqli_fetch_assoc($result)) {
    $cim = mysqli_real_escape_string($conn, $row['nev']);
    $count_query = "SELECT COUNT(*) AS record_count FROM wishlist WHERE wlname = '$cim' AND username = '${user}'";
    $count_result = mysqli_query($conn, $count_query);

    if ($count_result === false) {
        die("Count query execution failed: " . mysqli_error($conn));
    }

    $count_row = mysqli_fetch_assoc($count_result);
    $record_count = $count_row['record_count'];

    echo "Group Name: " . $row['nev'] . " - Record Count in Wishlist: " . $record_count . "<br>";

    if ($record_count === '0') {
        echo $cim . $user;
        $count2_query = "SELECT COUNT(*) AS record_count2 FROM wishlist_csoportok WHERE nev = '$cim' AND username = '${user}'";
        $count2_result = mysqli_query($conn, $count2_query);
        echo $count2_query;
        if ($count2_result === false) {
            die("Count query execution failed: " . mysqli_error($conn));
        }
    
        $count2_row = mysqli_fetch_assoc($count2_result);
        $record2_count = $count2_row['record_count2'];
        echo "record2" . $record2_count;
        if($record2_count === '1'){
            $delete_group_query = "DELETE FROM wishlist_csoportok WHERE nev = '$cim' AND username = '$user'";
            $delete_group_result = mysqli_query($conn, $delete_group_query);
    
            if ($delete_group_result === false) {
                die("Delete group query execution failed: " . mysqli_error($conn));
            } else {
                echo "Group Name: " . $row['nev'] . " deleted from wishlist_csoportok.<br>";
            }
        }
        else{
            die("Delete failed. Multiple Record found." . mysqli_error($conn));
        }
        
    }
}

    $deleteRendelestervekQuery = "DELETE FROM rendelestervek WHERE id = '${id}' AND username = '${user}'";
    $deleteRendelestervekResult = mysqli_query($conn, $deleteRendelestervekQuery);

    if ($deleteRendelestervekResult === false) {
        die("Delete rendelestervek query execution failed: " . mysqli_error($conn));
    }

    echo "Sikeresen hozzáadva a books táblához és törölve a megfelelő rekordokat, valamint a wishlist és wishlist_csoportok táblákból is.";
} else {
    die("Error: 'numbers' POST parameter is missing.");
}

mysqli_close($conn);
?>