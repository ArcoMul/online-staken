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

// number of active people in past 3 days
$sql = "SELECT * FROM `OnlineStaken_Pings`";

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        print_r($row);
    }
}
else
{
    echo 'no data found';
}

$conn->close();

?> 