<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Conexion
 *
 * @author Matías
 */
class Connection {
   private $adress;
   private $user;
   private $password;
   private $dataBase;
   private $connection;
      
   public function __construct($adress = "localhost", $user = "matias", $password = "", $dataBase = "diccionario"){
       $this->adress = $adress;
       $this->user = $user;
       $this->password = $password;
       $this->dataBase = $dataBase;
   }
   
   public function getConnection(){
      
       if(is_null($this->connection)){
           
            $this->connection = mysqli_connect($this->adress, $this->user, $this->password, $this->dataBase)
               or die("An error ocurred while trying to create database conection");
           
       }
              
       return $this->connection;
   }
   
   public function closeConnection(){
       
       if(!is_null($this->connection)){
           mysqli_close($this->connection);
       }
   }
   
}