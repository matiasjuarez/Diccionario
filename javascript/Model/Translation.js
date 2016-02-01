/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Translation(DOMElement){
    this.translation = "";
    this.definition = "";
    this.grammaticalFunction = "";
    this.examples = [];
    this.photo = "";
    this.DOMElement = DOMElement;
    
    this.translationContainerClass = "translationContainer";
    this.translationContainerLeftColumnClass = "translationContainerLeftColumn";
    this.deleteTranslationButtonClass = "deleteTranslationButton";
    this.translationInputClass = "translationInput";
    this.grammaticualFunctionClass = "grammaticalFunction";
    this.definitionInputClass = "definitionInput";
    this.translationExampleClass = "translationExample";
    this.examplesContainerClass = "examplesContainer";
    this.newTranslationExampleButtonClass = "newTranslationExampleButton";
    this.translationPhotoClass = "translationPhoto";
    this.photoSelectorClass = "photoSelector";
}

Translation.prototype.extractDataFromDOMElement = function(){
    debugger;
    var self = this,
        i,
        examples = $(self.DOMElement).find("."+self.translationExampleClass),
        examplesLength = examples.length;
        
    if(self.DOMElement){
        self.translation = $(self.DOMElement).find("."+self.translationInputClass).val();
        self.definition = $(self.DOMElement).find("."+self.definitionInputClass).val();
        self.grammaticalFunction = $(self.DOMElement).find("."+self.grammaticualFunctionClass).val();
        
        self.examples = [];
        
        for(i = 0; i < examplesLength; i++){
            self.examples[i] = $(examples).val();
        }
    }
    
};

Translation.prototype.isUnused = function(){
    var self = this;
    
    self.extractDataFromDOMElement();
    
    if(self.translation === ""){
        return true;
    }
    else{
        return false;
    }
};

Translation.prototype.createNewTranslationStructure = function(){
  
    var self = this,
            html,
            parsedStructure;
    
            html  = '<div class="row ' + self.translationContainerClass + '">';

            // Left column definition. Translations
            html += '<div class="col-xs-8">';
            html += '<div class="panel panel-success ' + self.translationContainerLeftColumnClass + '">';
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
            html += '<div class="' + self.examplesContainerClass + '">'; 
            html += '<button type="button" class="floatRight btn btn-primary ' + self.newTranslationExampleButtonClass + '">NUEVO EJEMPLO</button>';
            html += '</div>';
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
            
            parsedStructure = $.parseHTML(html);
            
            $(parsedStructure).find("."+self.examplesContainerClass).append(self.getNewExampleStructure());
            
            return parsedStructure;
};

Translation.prototype.getNewExampleStructure = function(){
     var html = "";
            
        html += '<label">Ejemplo</label>';
        html += '<textarea class="form-control ' + this.translationExampleClass + '" ></textarea>';

        return $.parseHTML(html);
};