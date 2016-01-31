/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Translation(JSON){
    this.translation = JSON.translation || "";
    this.definition = JSON.definition || "";
    this.grammaticalFunction = JSON.grammaticalFunction || "";
    this.examples = JSON.examples || [];
    this.photo = JSON.photo || "";
    
    this.getTranslation= function(){
        if(!this.translation){
            return "";
        }
        else{
            return this.translation;
        }
    };
    
    this.getDefinition = function(){
         if(!this.definition){
            return "";
        }
        else{
            return this.definition;
        }
    };
    
    this.isUnused = function(){
      
        if(this.getDefinition() === "" && this.getTranslation() === ""){
            return true;
        }
        return false;
    };
}