/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CRUDTranslationController(CRUDTranslationView){
   
    this.translations = []; // A collection of divs containing all the translations that the user has created
    this.CRUDTranslationView = CRUDTranslationView;
     
}


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
            self.translations[i].unhighlightTranslation();
            $(self.translations[i].DOMElement).remove();
        }
        
        unusedTranslations = lookForUnusedTranslations();
        
        if(unusedTranslations.length === 0){            
                        
            // Let's create and add a new translation to the existing translations
            var newTranslation = new Translation();
            
            self.translations.unshift(newTranslation);
            
            // Once we get the translations we need, we show them in the webpage
           addTranslationsAgainToDOM();

        }
        else{
            
            highlightEmptyTranslations(unusedTranslations);
            
            addTranslationsAgainToDOM();
            
            focusOnEmptyTranslation(unusedTranslations[0]);
            
            self.CRUDTranslationView.showInformativeMessage("¡Parece que te ha quedado una traduccion sin usar!", "danger");
        }
    
    
    function addTranslationsAgainToDOM(){
        var i,
                length = self.translations.length;
        
        for(i = 0; i < length; i++){
            self.translations[i].addEventListeners();
            
        }
        
        self.CRUDTranslationView.showTranslations(self.translations);
    }
    
    function focusOnEmptyTranslation(emptyTranslation){
        
        self.CRUDTranslationView.focusOnEmptyTranslation(emptyTranslation);
    }
    
    function highlightEmptyTranslations(unusedTranslations){
        //self.CRUDTranslationView.highlightEmptyTranslations(unusedTranslations);
        
        var i = 0,
                length = unusedTranslations.length;
        
        for(i = 0; i < length; i++){
            unusedTranslations[i].highlightTranslation();
        }
    }
    
    function lookForUnusedTranslations(){
        
        var emptyTranslations = [];
        
        for(var i = 0, length = self.translations.length; i < length; i++){
            
            if(self.translations[i].isUnused()){
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

