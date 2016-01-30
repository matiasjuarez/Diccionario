<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Authenticator
 *
 * @author Matías
 */
class Authenticator {
    
    private $serverMessage;
    private $exitMessage;
    
    private $user;
    private $password;
    
    public function __construct($serverMessage = "", $exitMessage = "Access denied") {
        $this->serverMessage = $serverMessage;
        $this->exitMessage = $exitMessage;
    }
    
    public function setUser($user){
        $this->user = $user;
    }
    
    public function setPassword($password){
        $this->password = $password;
    }
    
    private function getUser(){
        return $this->user;
    }
    
    private function getPassword(){
        return $this->password;
    }
    
    public function authenticate($authenticateUser = TRUE, $authenticatePassword = TRUE){
        
        $authenticationPassed = false;
        
        if($authenticateUser && $authenticatePassword){
            
            if(!$this->authenticateUser() || !$this->authenticatePassword()){
                $this->sendAuthenticationHeaders();
            }
            else{
                $authenticationPassed = true;
            }
        }
        else if($authenticateUser){
            
            if(!$this->authenticateUser()){
                $this->sendAuthenticationHeaders();
            }
            else{
                $authenticationPassed = true;
            }
        }
        else if($authenticatePassword){
            
            if(!$this->authenticatePassword()){
                $this->sendAuthenticationHeaders();
            }
            else{
                $authenticationPassed = true;
            }
        }
        
        
        if(!$authenticationPassed){
            $this->sendAuthenticationHeaders();
        }
    }
    
    private function authenticateUser(){
        $user = $_SERVER['PHP_AUTH_USER'];
            
            if(!isset($user) || $user != $this->getUser()){
                return false;
            }
            else{
                return true;
            }
    }
    
    private function authenticatePassword(){
        $password = $_SERVER['PHP_AUTH_PW'];
            
            if(!isset($password) || $password != $this->getPassword()){
                return false;
            }
            else{
                return true;
            }
    }
    
    private function sendAuthenticationHeaders(){
        
        header('HTTP/1.1 401 Unauthorized');
        header("WWW-Authenticate: Basic realm=$this->serverMessage");
        exit($this->exitMessage);
    }
}
