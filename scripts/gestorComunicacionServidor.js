/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * La pagina es la pagina php a la que debemos enviar la peticion
 */
function GestorComunicacionServidor(URL){
    
    this.URL = URL;
    
    this.datos = "";
    
    /*
     * callbackFunction es una funcion que se encargara de tratar la respuesta que recibamos del servidor
     */
    this.enviarPeticion = function(callbackFunction){
      
        var peticion = new XMLHttpRequest();
        
        peticion.onreadystatechange = function(e){
            
            if(e.target.readyState === 4 && e.target.status === 200){
                callbackFunction(e.target);
            }
            
        };
        
        peticion.open("POST", this.URL, true);
        peticion.send(this.datos);
    };
 
}