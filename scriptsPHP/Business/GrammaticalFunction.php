<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of GrammaticalFunction
 *
 * @author Matías
 */
class GrammaticalFunction {
    private $id;
    private $name;
    private $language;
    
    public function __construct($name = "", $language = 0, $id = 0) {
        $this->setName($name);
        $this->setLanguage($language);
        $this->setID($id);
    }
    
    public function getName(){
        return $this->name;
    }
    
    public function setName($name){
        if(is_string($name)){
            $this->name = $name;
        }
    }
    
    public function getLanguage(){
        return $this->language;
    }
    
    public function setLanguage($language){
        if(is_int($language)){
            $this->language = $language;  
        }
    }
    
    public function getID(){
        return $this->id;
    }
    
    public function setID($id){
        $this->id = $id;
    }
}
