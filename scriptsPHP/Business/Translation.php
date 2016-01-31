<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Translation
 *
 * @author Matías
 */
class Translation {
    
    private $translation;
    private $grammaticalFunction;
    private $definition;
    private $id;
    private $photo;
    
    
    public function __construct($translation = "", $grammaticalFunction = 0, $definition = "", $id = 0) {
        $this->setTranslation($translation);
        $this->setGrammaticalFunction($grammaticalFunction);
        $this->setDefinition($definition);
        $this->setID($id);
    }
    
    public function getTranslation(){
        return $this->translation;
    }
    
    public function setTranslation($translation){
        if(is_string($translation)){
           $this->translation = $translation; 
        }
    }
    
    public function getGrammaticalFunction(){
        return $this->grammaticalFunction;
    }
    
    public function setGrammaticalFunction($grammaticalFunction){
        if(is_int($grammaticalFunction)){
            $this->grammaticalFunction = $grammaticalFunction;
        }
    }
    
    public function getDefinition(){
        return $this->definition;
    }
    
    public function setDefinition($definition){
        if(is_string($definition)){
           $this->definition = $definition; 
        }
        
    }
    
    
    public function getID(){
        return $this->id;
    }
    
    public function setID($id){
        if(is_int($id)){
            $this->id = $id;
        }
        
    }
}
