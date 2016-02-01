/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CRUDTranslationController(CRUDTranslationView){
   
    this.translations = []; // A collection of divs containing all the translations that the user has entered
    this.CRUDTranslationView = CRUDTranslationView;
     
}

CRUDTranslationController.prototype.addClickEventToDeleteTranslationButtons = function(){
    
    var deleteButtons = getDeleteButtons();
    
    function getDeleteButtons(){
        
    }
};

CRUDTranslationController.prototype.newTranslationButtonFunctionality = function(){
    var self = this,
            i,
            unusedTranslations,
            translations,
            translationsLength;
                  
        self.translations = [];
        translations = self.CRUDTranslationView.getTranslationContainers();
        translationsLength = translations.length;
        
        for(i = 0; i < translationsLength; i++){
            self.translations[i] = new Translation(translations[i]);
        }
        
        unusedTranslations = lookForUnusedTranslations();
        
        // This removes the red shadow around unused translations
        self.CRUDTranslationView.unhighlightAllTranslations();
        
        if(unusedTranslations.length === 0){            
            //self.cerrarMensajeInformativo();
            
            // We add a structure for a new translation to the already existing translations
            self.translations.unshift($.parseHTML(self.getNewTranslationStructure()));
            
            // Once we get the translations we need, we show them in the webpage
            self.CRUDTranslationView.showTranslations(self.translations);
            
           
        }
        else{
            
            highlightEmptyTranslations(unusedTranslations);
            
            focusOnEmptyTranslation(unusedTranslations[0]);
            
            self.CRUDTranslationView.showInformativeMessage("¡Parece que te ha quedado una traduccion sin usar!", "danger");
        }
    
    
    function focusOnEmptyTranslation(emptyTranslation){
        
        self.CRUDTranslationView.focusOnEmptyTranslation(emptyTranslation);
    }
    
    function highlightEmptyTranslations(unusedTranslations){
        self.CRUDTranslationView.highlightEmptyTranslations(unusedTranslations);
    }
    
    function lookForUnusedTranslations(){
        
        var emptyTranslations = [];
        
        for(var i = 0, length = self.translations.length; i < length; i++){
            
            if(translations[i].isUnused()){
                emptyTranslations.push(self.translations[i]);
            }
        }
        
        return emptyTranslations;
    }
    
};

CRUDTranslationController.prototype.showTranslations = function(){
    var self = this;
    
     self.CRUDTranslationView.showTranslations(self.translations);
};

