/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CRUDTranslationView(){
    this.translations = []; //Almacena las traducciones que el usuario va a creando
    this.CRUDTranslationController = new CRUDTranslationController(this);
    this.informativeMessageWindow = new InformativeMessage();
    
    this.buttonNewTranslation = $("#btnNewTranslation");
    this.translationForm = $("#translationsForm");

    /*
     * Estas variables almacenan clases propias que usaran para fines scripticos lol
     */
    this.translationContainerClass = "translationContainer";    
    
    this.agregarEventoImagenCargadaSelectorArchivos = function(){
        
        var clase =  "." + this.claseSelectorImagen,
            archivos,
            foto,
            reader;
            
            $(document.body).on("change", clase, function(e){
              
                
               var cargador = e.target;
               
               archivos = cargador.files;
               
               foto = archivos[0];
               
               if(esFoto(foto)){
                  console.log(foto);
                  
                  reader = new FileReader();
                  
                  reader.onload = (function(theFile){
                      return function(e){
                        
                          var fotoContenedor = $(cargador).prev();
                          
                          $(fotoContenedor).attr("src", e.target.result);
                      };
                  })(foto);
                  
                  reader.readAsDataURL(foto);
               }
               else{
                  console.log("No es foto");
                  limpiarInputFile(e.target);
               }
               
            });
        
        function limpiarInputFile(input){
            input.value = '';
            input.type = "text";
            input.type = "file";
        }
        
        function esFoto(archivo){
            
            if(archivo.type.match("image.*")){
                return true;
            }
            return false;
        }
    };
    }
    
CRUDTranslationView.prototype.addEventListeners = function(){
    var self = this;
    
    addClickEventToAddNewTranslationButton();

    function addClickEventToAddNewTranslationButton(){
        
        var button = self.buttonNewTranslation;
        
        $(button).click(function(){
            
            self.informativeMessageWindow.closeMessage();debugger;
            self.CRUDTranslationController.newTranslationButtonFunctionality();
        });
    }
};


CRUDTranslationView.prototype.focusOnEmptyTranslation = function(translation){
    debugger;
    $(translation.DOMElement).find("." + translation.translationInputClass).focus();
};

CRUDTranslationView.prototype.showTranslations = function(translations){
    var self = this,
        translationForm = self.translationForm,
        i = 0,
        length = translations.length;
    
    $(translationForm).html("");
    
    for(i = 0; i < length; i++){
        $(translationForm).append($(translations[i].DOMElement));
    }
};

CRUDTranslationView.prototype.getTranslationContainers = function(){
    var self = this;
    
    return $("." + self.translationContainerClass);
};


CRUDTranslationView.prototype.showInformativeMessage = function(message, typeOfMessage){
    
    this.informativeMessageWindow.setMessage(message);
    this.informativeMessageWindow.setKindOfMessage(typeOfMessage);
    
    this.informativeMessageWindow.showMessage($(document.body));
};

CRUDTranslationView.prototype.closeInformativeMesssage = function(){
    this.informativeMessageWindow.closeMessage();
};
