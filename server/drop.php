<?php

$config = include('config.php');

header("Access-Control-Allow-Origin: *");

if ($_GET["userpassword"] != $config['userpassword'])
{
    die("No access");
}

// Create connection
$conn = mysqli_connect($config['servername'], $config['username'], $config['password'], $config['database']);

// Check connection
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

if ($_GET["debug"] == "true")
{
    echo "Connected successfully";
}

// sql to create table
$sql = "DROP TABLE IF EXISTS OnlineStaken_Pings";

if ($_GET["debug"] == "true")
{
    if ($conn->query($sql) === TRUE)
    {
        echo "Table OnlineStakenPings dropped successfully";
    }
    else
    {
        echo "Error creating table: " . $conn->error;
    }
}

$conn->close();

?> 