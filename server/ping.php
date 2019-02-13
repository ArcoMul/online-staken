<?php

$config = include('config.php');

header("Access-Control-Allow-Origin: *");

// Create connection
$conn = mysqli_connect($config['servername'], $config['username'], $config['password'], $config['database']);

// Check connection
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

if ($_GET["debug"] == "true")
{
    echo "Connected successfully<br>";
}

// sql to create table
$sql = "CREATE TABLE IF NOT EXISTS OnlineStaken_Pings (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
hash VARCHAR(200) NOT NULL,
useragent VARCHAR(200) NOT NULL,
date DATE NOT NULL
)";

if ($conn->query($sql) === TRUE)
{
    if ($_GET["debug"] == "true")
    {
        echo "Table OnlineStakenPings created successfully";
    }
}
else
{
    if ($_GET["debug"] == "true")
    {
        echo "Error creating table: " . $conn->error;
    }
}

if (isset($_POST["hash"]))
{
    $hash = $_POST["hash"];
}
else if (isset($_GET["hash"]))
{
    $hash = $_GET["hash"];
}

$stmt = $conn->prepare("INSERT INTO OnlineStaken_Pings (hash, useragent, date) VALUES (?, ?, NOW())");
$stmt->bind_param("ss", $hash, $_SERVER['HTTP_USER_AGENT']);

if (!$stmt->execute())
{
    if ($_GET["debug"] == "true")
    {
        echo "Insert failed";
    }
}

$conn->close();

?> 