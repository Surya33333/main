<?php

$user = 'surya_prakash';
$password = 'mysqlSPN@123';
$database = 'vmart'; 
$servername='localhost';

$conn = mysqli_connect($servername, $user, 
                $password, $database);
                

$orders_query = "SELECT * FROM contacts ORDER BY orderdate DESC ";
$stores_query = "SELECT * FROM stores";




$orders_result = mysqli_query($conn, $orders_query);
$orders_array = array();


$stores_result = mysqli_query($conn, $stores_query);
$stores_array = array();

?>

<?php



 while($orders = mysqli_fetch_array($orders_result)){
    
    
    $name = $orders['name'];
    $email = $orders['email'];
    $mobile = $orders['mobile'];
    $myuid = $orders['myuid'];
    $orderstatus = $orders['orderstatus'];
    $orderdate = $orders['orderdate'];
    
    
    
     $orders_array[] = array(
         "name" => $name,
         "email" => $email,
         "mobile" => $mobile,
         "myuid" => $myuid,
         "orderstatus"=>$orderstatus,
         "orderdate"=>$orderdate
         );
} 

while($stores = mysqli_fetch_array($stores_result)){
    
    
    $name = $stores['st_name'];
    $email = $stores['st_email'];
    $mobile = $stores['st_mobile'];
    $state = $stores['st_state'];
    $city = $stores['st_city'];
    $pincode = $stores['st_pincode'];
    $location = $stores['st_location'];
    
    
    
     $stores_array[] = array(
         "name" => $name,
         "email" => $email,
         "mobile" => $mobile,
         "email" => $email,
         "state" => $state,
         "city" => $city,
         "pincode" => $pincode,
        "location" => $location
         );
} 

$final_array = array();
$final_array['arr1'] = $orders_array;
$final_array['arr2'] = $stores_array;

echo json_encode($final_array);
?>