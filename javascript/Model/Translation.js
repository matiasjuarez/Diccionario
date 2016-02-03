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
    
    this.translationContainerClass = "translationContainer";
    this.translationContainerLeftColumnClass = "translationContainerLeftColumn";
    this.deleteTranslationButtonClass = "deleteTranslationButton";
    this.translationInputClass = "translationInput";
    this.grammaticualFunctionClass = "grammaticalFunction";
    this.definitionInputClass = "definitionInput";
    this.translationExampleClass = "translationExample";
    this.examplesContainerClass = "examplesContainer";
    this.addNewExampleButtonClass = "addNewExampleButton";
    this.translationPhotoClass = "translationPhoto";
    this.photoSelectorClass = "photoSelector";
    this.closePhotoExampleAnchorClass = "closePhotoExampleAnchor";
    this.redShadowAlertClass = "redBoxAlert";
    this.emptyPhotoURL = "./resources/placeholder.png";
    
    if(DOMElement){
        this.DOMElement = DOMElement;
    }
    else{
        this.createNewTranslationStructure();
    }
}

Translation.prototype.extractDataFromDOMElement = function(){
    
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
            html;
    
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
            html += '<button type="button" class="floatRight btn btn-primary ' + self.addNewExampleButtonClass + '">NUEVO EJEMPLO</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            // Right column definition. Photos
            html += '<div class="col-xs-4">';
            html += '<div class="panel panel-success">';
            html += '<div class="panel-heading text-center">';
            html += '<img src="' + self.emptyPhotoURL + '" class="img-rounded ' + self.translationPhotoClass + '" alt="photo"/>';
            html += '<a href="#" class="' + self.closePhotoExampleAnchorClass + '">&times;</a>';

            // Image selector
            html += '<input type="file" name="pic" class="form-control ' + self.photoSelectorClass + '" accept="image/*" style="display:none">';

            html += '</div>';
            html += '</div>';
            html += '</div>';

            html += '</div>';
            
            self.DOMElement = $.parseHTML(html);
            
            self.addNewExampleStructure();
};

Translation.prototype.addNewExampleStructure = function(){
     var html = "",
             parsedElement,
             self = this;
            
        html += '<label>Ejemplo</label>';
        html += '<textarea class="form-control ' + this.translationExampleClass + '" ></textarea>';

        parsedElement = $.parseHTML(html);
        
        $(self.DOMElement).find("."+self.examplesContainerClass).append(parsedElement);
};

Translation.prototype.addEventListeners = function(){
    var self = this,
            deleteTranslationButton,
            addNewExampleButton,
            photoExample,
            closePhotoAnchor,
            fileChooserInput;
    debugger;
    if(self.DOMElement){
        
        deleteTranslationButton = $(self.DOMElement).find("."+self.deleteTranslationButtonClass);
        $(deleteTranslationButton).off();
        addClickEventToDeleteTranslationButton();
        
        
        addNewExampleButton = $(self.DOMElement).find("."+self.addNewExampleButtonClass);
        $(addNewExampleButton).off();
        addClickEventToAddNewExampleButton();
        
        photoExample = $(self.DOMElement).find("."+self.translationPhotoClass);
        $(photoExample).off();
        addDragAndDropToPhotoExample();
        addClickToPhotoExample();
        
        closePhotoAnchor = $(self.DOMElement).find("."+self.closePhotoExampleAnchorClass);
        $(closePhotoAnchor).off();
        addClickToClosePhotoAnchor();
        
        
        fileChooserInput = $(self.DOMElement).find("."+self.photoSelectorClass);
        $(fileChooserInput).off();
        addChangeToFileChooserInput();
    }
    
    function addClickEventToDeleteTranslationButton(){
        $(deleteTranslationButton).click(function(){
           $(deleteTranslationButton).parents("."+self.translationContainerClass).remove(); 
        });
        
    }
    
    function addClickEventToAddNewExampleButton(){
        $(addNewExampleButton).click(function(){
            
           self.unhighlightExamples();
           
           // If no empty examples are found, a new example structure is added
           if(self.getEmptyExamples().length === 0){
               crudTranslationViewer.closeInformativeMesssage();
               self.addNewExampleStructure();     
           }
           
           else{
               self.highlightEmptyExamples();

               crudTranslationViewer.showInformativeMessage("Te han quedado uno o mas ejemplos sin usar", "info");
           }      
        });
    }
    
    function addDragAndDropToPhotoExample(){
        $(photoExample).on("dragover", function(event){
           event.preventDefault();
           
        });
        
        $(photoExample).on("drop", function(event){
           event.preventDefault();
           debugger;
           var fileReader = new FileReader();
           
           fileReader.readAsDataURL(event.originalEvent.dataTransfer.files[0]);
           
           $(fileReader).on("load", function(){
               $(photoExample).prop("src", fileReader.result);
           });
           
        });
    }
    
    function addClickToPhotoExample(){
        $(photoExample).on("click", function(event){
           $(self.DOMElement).find("."+self.photoSelectorClass).trigger("click"); 
        });
    }
    
    
    function addClickToClosePhotoAnchor(){
        $(closePhotoAnchor).on("click", function(event){
           event.preventDefault();
           $(self.DOMElement).find("."+self.translationPhotoClass).prop("src", self.emptyPhotoURL);
        });
    }
    
    /*
     * When the file has been loaded onto the file chooser, a file reader reads that file.
     * When the file reader has read it, it's loaded into the img element
     */
    function addChangeToFileChooserInput(){
        $(fileChooserInput).on("change", function(event){
           
            var fileReader = new FileReader();
            
            fileReader.readAsDataURL(this.files[0]);
            
            $(fileReader).on("load", function(){
               
                $(self.DOMElement).find("."+self.translationPhotoClass).prop("src",fileReader.result);
            });
        });
    }
};


Translation.prototype.getEmptyExamples = function(){
     var self = this,
            examples = $(self.DOMElement).find("."+self.translationExampleClass),
            currentExample,
            length = examples.length,
            i,
            emptyExamples = [];
    
    for(i = 0; i < length; i++){
        currentExample = examples[i];
        if($(currentExample).val() === ""){
            emptyExamples.push(currentExample);
        }
    }
    
    return emptyExamples;
};

Translation.prototype.highlightTranslation = function(){
    var self = this;
    
    $(self.DOMElement).find("."+self.translationContainerLeftColumnClass).addClass(self.redShadowAlertClass);
};

Translation.prototype.unhighlightTranslation = function(){
    var self = this;
    
    $(self.DOMElement).find("."+self.translationContainerLeftColumnClass).removeClass(self.redShadowAlertClass);
};


Translation.prototype.highlightEmptyExamples = function(){
    var self = this,
            examples = $(self.DOMElement).find("."+self.translationExampleClass),
            currentExample,
            length = examples.length,
            i;
    
    for(i = 0; i < length; i++){
        currentExample = examples[i];
        if($(currentExample).val() === ""){
            $(currentExample).addClass(self.redShadowAlertClass);
        }
    }
    
};



Translation.prototype.unhighlightExamples = function(){
    var self = this;
    
    $(self.DOMElement).find("."+self.translationExampleClass).removeClass(self.redShadowAlertClass);
};
