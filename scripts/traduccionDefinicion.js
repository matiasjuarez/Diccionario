/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function TraduccionDefinicion(objetoJSON){
    this.traduccion = objetoJSON.traduccion || "";
    this.definicion = objetoJSON.definicion || "";
    this.funcionGramatical = objetoJSON.funcionGramatical || "";
    this.ejemplos = objetoJSON.ejemplos || [];
    this.foto = objetoJSON.foto || "";
    
    this.getTraduccion = function(){
        if(this.traduccion === undefined || this.traduccion === null){
            return "";
        }
        else{
            return this.traduccion;
        }
    };
    
    this.getDefinicion = function(){
         if(this.definicion === undefined || this.definicion === null){
            return "";
        }
        else{
            return this.definicion;
        }
    };
    
    this.estaSinUsar = function(){
      
        if(this.getDefinicion() === "" && this.getTraduccion() === ""){
            return true;
        }
        return false;
    };
}