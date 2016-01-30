<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Palabra
 *
 * @author Matías
 */
class Word {
    
    private $word;
    private $language;
    private $pronunciation;
    
    public function getWord(){
        return $this->word;
    }
    
    public function setWord(string $word){
        if(is_string($word)){
           $this->word = $word; 
        }
        
    }
    
    public function getLanguage(){
        return $this->language;
    }
    
    public function setLanguage(number $language){
        if(is_int($language)){
           $this->language = $language; 
        }
        
    }
}
