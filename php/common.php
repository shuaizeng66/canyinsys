<?php

$key = $_REQUEST['key'];
$conn = mysqli_connect('localhost','root','','restaurant',3306);
mysqli_query($conn,"SET NAMES utf8");

if($key=='1'){
   $sql = "SELECT * FROM about";
}else if($key=='2'){
   $sql = "SELECT * FROM menu";
}else if($key=='3'){
   // $sql = "SELECT * FROM chef ORDER BY id desc limit 4";
   $sql = "SELECT * FROM chef";
}else if($key=='4'){
   $sql = "SELECT * FROM stories";
}else if($key=='5'){
   $sql = "SELECT * FROM customer ORDER BY id desc limit 5";
}


$result=mysqli_query($conn,$sql);

$arr=[];
while(($row=mysqli_fetch_assoc($result))!=null){
   array_push($arr,$row);
}
echo $_GET["callback"]."(".JSON_encode($arr).")";

?>