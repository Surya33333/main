<?php

$servername = "localhost:3307";
$username = "root";
$password = "password";
$dbname = "vmart";

$email = $_POST["emailid"];
$message = $_POST["message"];

// Create connection
$conn = new mysqli($servername, 
    $username, $password, $dbname);
    
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " 
        . $conn->connect_error);
}
  
        // Performing insert query execution
        $queryinsert = "INSERT INTO contacts VALUES('$email', '$message')";
        mysqli_query($conn, $queryinsert);
        return;

         echo "Done";

?>