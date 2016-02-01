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
     
    this.idBaseDivMensajeInformativo =  "divManejadorVentanaMensajeInformativo";
    this.idBaseDivContenedorTraduccionesDefiniciones = "divContenedorTraduccionDefinicion-";
    this.idBaseFotoTraduccion = "fotoTraduccionDefinicion";
    /*
     * Estas variables almacenan clases propias que usaran para fines scripticos lol
     */
    this.translationContainerClass = "translationContainer";
    this.translationContainerLeftColumnClass = "translationContainerLeftColumn";
    this.deleteTranslationButtonClass = "deleteTranslationButton";
    this.translationInputClass = "translationInput";
    this.grammaticualFunctionClass = "grammaticalFunction";
    this.definitionInputClass = "definitionInput";
    this.translationExampleClass = "translationExample";
    this.newTranslationExampleButtonClass = "newTranslationExampleButton";
    this.translationPhotoClass = "translationPhoto";
    this.photoSelectorClass = "photoSelector";
    this.redShadowAlertClass = "redBoxAlert";
    
    
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
    
    
    this.agregarEventoClickBotonNuevoEjemplo = function (){
        var self = this,
            clase = "." + this.claseBotonNuevoEjemploTraduccionDefinicion;
        
            $(document.body).on("click", clase, function(e){
               
               var botonClickeado = $(e.target), 
               padre = botonClickeado.parent(), // Este es el elemento en el que se agregara el nuevo ejemplo
               contenedorTraduccionDefinicion = botonClickeado.parents("div." + self.claseContenedorTraduccionesDefinicion), // EL contenedor general de la traduccionDefinicion. Hace falta porque es el que contiene el numero de id que debemos usar
               idContenedorTraduccionDefinicion = contenedorTraduccionDefinicion.attr("id").split("-"), // El ID del contenedor de la traduccionDefinicion ya spliteado
               valorID = idContenedorTraduccionDefinicion[idContenedorTraduccionDefinicion.length - 1], // El numero correspondiente al ID
               ejemplos = self.obtenerEjemplosBasandoseEnElHTMLDelContenedorTraduccionDefinicion(padre),
               cantidadEjemplos = ejemplos.length,
               ejemplosSinUsar = existeEjemploSinUsarDentroDeLaTraduccionDefinicion(contenedorTraduccionDefinicion),
               i,
               lengthEjemplosSinUsar = ejemplosSinUsar.length;
               
               if(ejemplosSinUsar){
                   for(i = 0; i < lengthEjemplosSinUsar; i++){
                       $(ejemplosSinUsar[i]).addClass("orangeBoxAlert");
                   }
                   self.mostrarMensajeInformativo("Hay ejemplos para la traduccion actual que estan sin usar", "warning");
                   ejemplosSinUsar[0].focus();
               }
               else{
                  self.cerrarMensajeInformativo();
                  botonClickeado.before(self.agregarEstructuraParaNuevoEjemplo(valorID, cantidadEjemplos));
                  
                  for(i = 0; i < cantidadEjemplos; i++){
                      $(ejemplos[i]).removeClass("orangeBoxAlert");
                  }
               }
               
            });
            
        /*
         * Comprueba un contenedor de traducciones y devuelve false si no hay ningun ejemplo sin usar. Si hay ejemplos
         * sin usar devuelve un arreglo con los textarea que representan dichos ejemplos
         * @param {type} contenedorTraduccionDefinicion
         * @returns {Array|ManejadorVentana.existeEjemploSinUsarDentroDeLaTraduccionDefinicion.arregloEjemplosVacios|Boolean}
         */
        function existeEjemploSinUsarDentroDeLaTraduccionDefinicion(contenedorTraduccionDefinicion){
            
            var i = 0,
                claseEjemploTraduccion = "textarea." + self.claseEjemploTraduccionDefinicion,
                ejemplos = contenedorTraduccionDefinicion.find(claseEjemploTraduccion),
                ejemploAnalizado,
                length = ejemplos.length,
                contenidoDelEjemplo,
                arregloEjemplosVacios = [];
        
            for(i = 0; i < length; i++){
                
                ejemploAnalizado = $(ejemplos[i]);
                
                contenidoDelEjemplo = ejemploAnalizado.val();
                
                if(contenidoDelEjemplo === ""){
                    arregloEjemplosVacios.push(ejemplos[i]);
                }
            }
            
            if(arregloEjemplosVacios.length === 0){
                return false;
            }
            return arregloEjemplosVacios;
        }
    };
}        

CRUDTranslationView.prototype.addEventListeners = function(){
    var self = this;
    
    addClickEventToDeleteTranslationButtons();
    addClickEventToAddNewTranslation();
    
    function addClickEventToDeleteTranslationButtons(){
        
        $(document).on("click", "."+self.deleteTranslationButtonClass, function(event){
            
            $(this).parents("."+self.translationContainerClass).remove();
        });
    }
    
    function addClickEventToAddNewTranslation(){
        
        var button = self.buttonNewTranslation;
        
        $(button).click(function(){
            
            self.CRUDTranslationController.newTranslationButtonFunctionality();
        });
    }
};


CRUDTranslationView.prototype.highlightEmptyTranslations = function(unusedTranslations){
    
    var self = this;
    
    if(!unusedTranslations instanceof Array){
            return false;
    }
        
        var i = 0,
            lengthArray = unusedTranslations.length,
            translationToHighlight;
        
        for(i = 0; i < lengthArray; i++){
            
            translationToHighlight = $(unusedTranslations[i].DOMElement);
            
            $(translationToHighlight).find("."+self.translationContainerLeftColumnClass).addClass(self.redShadowAlertClass);
        }
        
};

CRUDTranslationView.prototype.unhighlightAllTranslations = function(){
    var self = this;
    $("."+self.translationContainerLeftColumnClass
            ).removeClass(self.redShadowAlertClass);
};

CRUDTranslationView.prototype.focusOnEmptyTranslation = function(translation){
    var self = this;
    $(translation.DOMElement).find("." + self.translationInputClass).focus();
};

CRUDTranslationView.prototype.showTranslations = function(translations){
    var self = this,
        translationForm = self.translationForm,
        i = 0,
        length = translations.length;
    
    $(translationForm).html("");
    
    for(i = 0; i < length; i++){
        $(translationForm).append($(translations[i]));
    }
};

CRUDTranslationView.prototype.getTranslationContainers = function(){
    var self = this;
    
    return $("." + self.translationContainerClass);
};


CRUDTranslationView.prototype.showInformativeMessage = function(message, typeOfMessage){
    debugger;
    this.informativeMessageWindow.setMessage(message);
    this.informativeMessageWindow.setKindOfMessage(typeOfMessage);
    
    this.informativeMessageWindow.showMessage($(document.body));
};