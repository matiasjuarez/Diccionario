<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function getConnection(){
    $servername = "localhost";
    $username = "matias";
    $password = "";

    try {
            $conn = new PDO("mysql:host=$servername;dbname=diccionario", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully";
            return $conn;
    }
    catch(PDOException $e){
            echo "Connection failed: " . $e->getMessage();
    }
}

function insertarRegistros($nombreTabla, $arrayDatos = array()){
    $conn = getConnection();
    
    try{
        $conn->beginTransaction();
        
        foreach($arrayDatos as $registro){
             $consulta = armarConsultaInsert($nombreTabla, $registro);
              echo $consulta;
              
               $conn->exec($consulta);
        }
       
        
        $conn->commit();
        
        echo "Se inserto";
        
    } catch (Exception $ex) {
        $conn->rollBack();
        echo $ex;
    }
    
    
}

/*
 * Recibe un arreglo de datos asociativo que tiene como key
 * el nombre de la columna de la base de datos que se usara y como value el valor a insertar
 */
function armarConsultaInsert($nombreTabla, $arrayDatos){
        $consulta = "INSERT INTO $nombreTabla(";
      
            foreach($arrayDatos as $columna => $valor){
                $consulta .= $columna . ",";
            }
            $consulta = substr($consulta, 0, -1);
            $consulta .= ") VALUES(";

            foreach($arrayDatos as $columna => $valor){
                
                if(gettype($valor) === "string"){
                
                    $consulta .= "'$valor',";
                }
                else{
                   $consulta .= "$valor,"; 
                }
                
            }
            
             $consulta = substr($consulta, 0, -1);
             $consulta .= ");";

        return $consulta;
 }

class Palabra{
    function Palabra($palabra, $idioma){
        $this->palabra = $palabra;
        $this->idioma = $idioma;
    }
    
    function convertirEnArregloAsociativo(){
        $array = array("palabra" => $this->palabra, "idioma" => $this->idioma);
        return $array;
    }
}

$palabra1 = new Palabra("Matias", 1);
$palabra2 = new Palabra("Feo", 1);

$arrayPrueba = array($palabra1->convertirEnArregloAsociativo(), $palabra2->convertirEnArregloAsociativo());

insertarRegistros("palabra", $arrayPrueba);
?>