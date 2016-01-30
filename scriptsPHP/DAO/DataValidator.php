<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

abstract class DataValidator{
    
    public static function basicArrayValidation(array $data){
        
        $validatedArrayData = [];
        
        for($i = 0, $length = $data->count(); $i < $length; $i++){
            
            $validatedArrayData[i] = trim($data[i]);
            $validatedArrayData[i] = mysqli_real_escape_string($validatedArrayData[i]);
        }
        
        return $validatedArrayData;
    }
    
    public static function basicSimpleDatumValidation($datum){
            
            $validatedDatum = trim($datum);
            return mysqli_real_escape_string($validatedDatum);
    }
}