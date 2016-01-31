/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CRUDTranslationController(CRUDTranslationView){
   
    this.translations = []; // A collection of divs containing all the translations that the user has entered
    this.CRUDTranslationView = CRUDTranslationView;
    
    this.translationContainerClass = "translationContainer";
    this.deleteTranslationButtonClass = "deleteTranslationButton";
    this.translationInputClass = "translationInput";
    this.grammaticualFunctionClass = "grammaticalFunction";
    this.definitionInputClass = "definitionInput";
    this.translationExampleClass = "translationExample";
    this.newTranslationExampleButtonClass = "newTranslationExampleButton";
    this.translationPhotoClass = "translationPhoto";
    this.photoSelectorClass = "photoSelector";    
}

CRUDTranslationController.prototype.addClickEventToDeleteTranslationButtons = function(){
    
    var deleteButtons = getDeleteButtons();
    
    function getDeleteButtons(){
        
    }
};

CRUDTranslationController.prototype.addClickEventNewTranslationButton = function(button){
    var self = this,
            i,
            unusedTranslations,
            translations,
            translationsLength;
            
    
    $(button).click(function(){
      debugger;
      
        self.translations = [];
        translations = self.CRUDTranslationView.getTranslationContainers();
        translationsLength = translations.length;
        
        for(i = 0; i < translationsLength; i++){
            self.translations[i] = translations[i];
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
            
            $(unusedTranslations[0]).focus();
            
            //self.mostrarMensajeInformativo("¡Parece que te ha quedado una traduccion-definicion sin usar!", "danger");
        }
    });
    
    function highlightEmptyTranslations(unusedTranslations){
        self.CRUDTranslationView.highlightEmptyTranslations(unusedTranslations);
    }
    
    function lookForUnusedTranslations(){
        
        var translationInput,
                emptyTranslations = [];
        
        for(var i = 0, length = self.translations.length; i < length; i++){
            
            translationInput = $(self.translations[i]).find("." + self.translationInputClass);
            
            if($(translationInput).val() === ""){
                console.log("Traduccion sin usar");
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


CRUDTranslationController.prototype.getNewExampleStructure = function(){
            var html = "";
            
            html += '<label">Ejemplo</label>';
            html += '<textarea class="form-control ' + this.translationExampleClass + '" ></textarea>';
            
            return html;
};


CRUDTranslationController.prototype.getNewTranslationStructure = function(){
    var self = this;
    
            var html  = '<div class="row ' + self.translationContainerClass + '">';

            // Left column definition. Translations
            html += '<div class="col-xs-8">';
            html += '<div class="panel panel-success ' + self.CRUDTranslationView.translationContainerLeftColumnClass + '">';
            html += '<button type="button" class="floatRight btn btn-danger ' + self.deleteTranslationButtonClass + '">ELIMINAR</button>';
            html += '<div class="panel-heading">';
            html += '<div class="form-group">';
            html += '<label>Traduccion</label>';
            html += '<input type="text" class="form-control ' + self.translationInputClass + '"/>';
            html += '<label>Funcion gramatical</label>';
            html += '<select class="form-control ' + self.grammaticualFunctionClass + '">';
            html += '<option value="sustantivo">Sustantivo</option>';
            html += '<option value="adjetivo">Adjetivo</option>';
            html += '</select>';
            html += '<label>Definicion</label>';
            html += '<textarea class="form-control ' + self.definitionInputClass + '"></textarea>';
            html += self.getNewExampleStructure();
            html += '<button type="button" class="floatRight btn btn-primary ' + self.newTranslationExampleButtonClass + '">NUEVO EJEMPLO</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            // Right column definition. Photos
            html += '<div class="col-xs-4">';
            html += '<div class="panel panel-success">';
            html += '<div class="panel-heading text-center">';
            html += '<img src="" class="img-rounded ' + self.translationPhotoClass + '" alt="photo" />';

            // Image selector
            html += '<input type="file" name="pic" class="form-control ' + self.photoSelectorClass + '" accept="image/*">';

            html += '</div>';
            html += '</div>';
            html += '</div>';

            html += '</div>';

        return html;
};