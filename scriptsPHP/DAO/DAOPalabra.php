<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DAOPalabra
 *
 * @author Matías
 */

require_once './Connection.php';

abstract class DAOPalabra {
    
    public static function getAllWords(){
        $connection = new Connection();
        
        $query = "SELECT * FROM palabra";
        
        $resultSet = $connection->getConnection()->query($query);
        
        
    }
}
