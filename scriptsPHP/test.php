<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../scriptsPHP/DAO/Connection.php';
require_once './utilidades/Authenticator.php';

header("Content-Type: text/html");
$authenticator = new Authenticator("Tirate una autenticacion papa", "No vas a pasar ni en pedo, puto");
$authenticator->setUser("jose");
$authenticator->setPassword("1234");
$authenticator->authenticate(TRUE, TRUE);

$conexionObject = new Connection("localhost", "matias", "", "diccionario");
$conexion = $conexionObject->getConnection();
$conexion = $conexionObject->getConnection();

$query = "select * from palabra";

$resultSet = $conexion->query($query);

while($currentRow = mysqli_fetch_assoc($resultSet)){
    
        echo $currentRow["palabra"] . " - ";
    
    echo "<br><br>";
}


$conexionObject->closeConnection();