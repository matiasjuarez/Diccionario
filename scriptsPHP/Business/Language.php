<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Language
 *
 * @author Matías
 */
class Language {
    private $name;
    private $id;
    
    public function setName($name){
        
        if(is_string($name)){
            $this->name = $name;
        }
    }
    
    public function getName(){
        return $this->name;
    }
    
    public function setId($id){
        if(is_int($id)){
            $this->id = $id;
        }
    }
    
    public function getId(){
        return $this->id;
    }
}
