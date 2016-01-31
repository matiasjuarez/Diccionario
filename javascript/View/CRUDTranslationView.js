/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CRUDTranslationView(){
    this.translations = []; //Almacena las traducciones que el usuario va a creando
    this.CRUDTranslationController = new CRUDTranslationController(this);
    
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
            debugger;
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
    
    
    
    this.obtenerEjemplosBasandoseEnElHTMLDelContenedorTraduccionDefinicion = function(contenedorTraduccionDefinicion){
        
        var elementosEjemplo;
        
        elementosEjemplo = contenedorTraduccionDefinicion.children("textarea." + this.claseEjemploTraduccionDefinicion);
        
        
        return elementosEjemplo;
        
    };
    
    /*
     * Muestra un mensaje en la parte superior de la ventana del usuario
     * @param {type} mensaje. El mensaje que queremos mostrar
     * @param {type} tipoMensaje. Indicar si es alert, warning, success o info
     * @returns {undefined}
     */
    this.mostrarMensajeInformativo = function(mensaje, tipoMensaje){
        
            this.cerrarMensajeInformativo();
            
            var html = "",
                tipoMensaje = tipoMensaje,
                claseMensaje;
            
            if(tipoMensaje !== "danger" && tipoMensaje !== "warning" && tipoMensaje !== "success" && tipoMensaje !== "info"){
                tipoMensaje = "info";
            }
            
            claseMensaje = "alert-" + tipoMensaje;
            
            html = "<div class='alert " + claseMensaje + " messageBoxFixedUpperCenter fade in' id='" + this.idBaseDivMensajeInformativo + "'> \n\
                        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> \n\
                        <strong>" + mensaje + "</strong>\n\
                        </div>";
            
            $("#divContainer").prepend(html);
        
    };
    
    /*
     * Cierra el mensaje informativo en caso que este estuviera abierto
     * @returns {undefined}
     */
    this.cerrarMensajeInformativo = function(){
      
        var contenedorMensajeInformativo = $("#" + this.idBaseDivMensajeInformativo);
        
        if(contenedorMensajeInformativo.length !== 0){
            contenedorMensajeInformativo.remove();
        }
    };
            
        // Agrega el evento que elimina una traduccionDefinicion a todos los botones eliminar
        function prepararBotonesEliminarTraduccionDefinicion(cantidadTraduccionesDefiniciones){
            for(var i = 0; i < cantidadTraduccionesDefiniciones; i++){
                agregarEventoClickBotonEliminar(self.idBaseBotonEliminarTraduccionDefinicion + i);
            }
        }
            
        function obtenerEstructuraHTMLTraduccionesDefinicionesTomandoDatosDelArray(array, indiceInicial){
            
            var cantidadTraduccionesDefiniciones = array.length;
            var estructuraHTMLTraduccionesDefiniciones = "";
            
            for(var i = 0; i < cantidadTraduccionesDefiniciones; i++){
                
                estructuraHTMLTraduccionesDefiniciones += obtenerEstructuraNuevaTraduccion(indiceInicial + i, array[i].ejemplos.length);
            }
            
            return estructuraHTMLTraduccionesDefiniciones;
        }
    
        /*
         * Toma las traducciones guardadas en el arreglo y las va colocando en los elementos html correspondientes.
         * Se debe tener en cuenta que a la hora de tomar el id del elemento, se le debe sumar 1 al numero
         * que lo identifica ya que vamos a dejar el primer div que representa una traduccionDefinicion vacio
         * para que el usuario pueda ingresar su nueva traduccion sin necesidad de desplazar el scroll. Esto es en caso
         * de que estemos agregando una traduccion nueva
         */
        function colocarTraduccionesDefinicionesDesdeArray(seAgregoTraduccionNueva){
            
            var traduccionDefinicion,
                    i,
                    j,
                    lengthTraduccionesDefiniciones = self.traduccionesDefiniciones.length,
                    lengthEjemplos,
                    valorAgregarIndice;
            
            if(seAgregoTraduccionNueva){
                valorAgregarIndice = 1;
            }
            else{
                valorAgregarIndice = 0;
            }
            
            for(i = 0; i <  lengthTraduccionesDefiniciones; i++){
                
                traduccionDefinicion = self.traduccionesDefiniciones[i];
   
                $("#" + self.idBaseTraduccion + (i + valorAgregarIndice)).val(traduccionDefinicion.traduccion);
                $("#" + self.idBaseFuncionGramatical + (i + valorAgregarIndice)).val(traduccionDefinicion.funcionGramatical);
                $("#" + self.idBaseDefinicion + (i + valorAgregarIndice)).val(traduccionDefinicion.definicion);
                
                var contenedorFoto = $("#" + self.idBaseFotoTraduccion + (i + valorAgregarIndice));
                $(contenedorFoto).attr("src", traduccionDefinicion.foto);
                
                debugger;
                for(j = 0, lengthEjemplos =  traduccionDefinicion.ejemplos.length; j < lengthEjemplos; j++ ){
                    $("#" + self.obtenerIdEjemploTraduccionDefinicion(i + valorAgregarIndice, j)).val(traduccionDefinicion.ejemplos[j]);
                }
                
            }
        }
    
    
        /*
         * Obtiene un array con las traducciones que el usuario a ingresado en los formularios
         * @returns {Array|ManejadorVentana.obtenerArrayConTraduccionesDefiniciones.traduccionesDefinicionesGuardades}
         */
        function obtenerArrayConTraduccionesDefiniciones(){
            var traduccionesDefinicionesGuardades =  [];
            
            // Se obtiene la cantidad de traducciones que el usuario actualmente tiene para la palabra
            var arrayDivsConTraduccionesDefinicionesLength = $("#formTraduccionesDefiniciones").children().length;
            
            // Para cada una de las traducciones se obtienenen los valores correspondientes y se crean objetos traduccionDefinicion
            // que luego son almacenados en un array que se devuelve desde la funcion
            for(var i = 0; i < arrayDivsConTraduccionesDefinicionesLength; i++){
                debugger;
                var traduccion = $("#" + self.idBaseTraduccion + i).val();
                var funcionGramatical = $("#" + self.idBaseFuncionGramatical + i).val();
                var definicion = $("#" + self.idBaseDefinicion + i).val();
                var contenedorFoto = $("#" + self.idBaseFotoTraduccion + i);
                var foto = $(contenedorFoto).attr("src");
                var ejemplos = [];
                
                while(true){
                    
                    var ejemplo = $("#" + self.obtenerIdEjemploTraduccionDefinicion(i, ejemplos.length));
                    
                    if(ejemplo.length !== 0){
                        ejemplos.push(ejemplo.val());
                    }
                    else{
                        break;
                    }
                    
                }
                
                var traduccionDefinicion = new TraduccionDefinicion({traduccion: traduccion, definicion: definicion, 
                                                                    funcionGramatical: funcionGramatical, ejemplos: ejemplos,
                                                                    foto: foto});
                
                traduccionesDefinicionesGuardades.push(traduccionDefinicion);
            }
            
            return traduccionesDefinicionesGuardades;
        }
        
    };

CRUDTranslationView.prototype.addEventListeners = function(){
    var self = this;
    
    addClickEventToDeleteTranslationButtons();
    
    function addClickEventToDeleteTranslationButtons(){
        debugger;
        $(document).on("click", "."+self.deleteTranslationButtonClass, function(event){
            debugger;
            $(this).parents("."+self.translationContainerClass).remove();
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
            
            translationToHighlight = $(unusedTranslations[i]);
            
            $(translationToHighlight).find("."+self.translationContainerLeftColumnClass).addClass(self.redShadowAlertClass);
        }
        
        //Falta mostrar mensaje informativo
};

CRUDTranslationView.prototype.unhighlightAllTranslations = function(){
    var self = this;
    $("."+self.translationContainerLeftColumnClass).removeClass(self.redShadowAlertClass);
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