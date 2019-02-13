<?php

$config = include('config.php');

header("Access-Control-Allow-Origin: *");

// Create connection
$conn = mysqli_connect($config['servername'], $config['username'], $config['password'], $config['database']);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// number of active people in past 3 days
$sql = "SELECT COUNT(DISTINCT hash) as count FROM `OnlineStaken_Pings` WHERE date >= DATE_ADD(NOW(), INTERVAL -3 DAY)";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo $row['count'];
} else {
    echo 'no data found';
}

$conn->close();

?> 