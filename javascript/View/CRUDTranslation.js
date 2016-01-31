/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CRUDTranslation(){
    this.translations = []; //Almacena las traducciones que el usuario va a creando
    
    this.buttonNewTranslation = $("#btnNewTranslation");
     
    this.idBaseDivMensajeInformativo =  "divManejadorVentanaMensajeInformativo";
    this.idBaseDivContenedorTraduccionesDefiniciones = "divContenedorTraduccionDefinicion-";
    this.idBaseFotoTraduccion = "fotoTraduccionDefinicion";
    /*
     * Estas variables almacenan clases propias que usaran para fines scripticos lol
     */
    this.translationContainerClass = "translationContainer";
    this.deleteTranslationButtonClass = "deleteTranslationButton";
    this.translationInputClass = "translationInput";
    this.grammaticualFunctionClass = "grammaticalFunction";
    this.definitionInputClass = "definitionInput";
    this.translationExampleClass = "translationExample";
    this.newTranslationExampleButtonClass = "newTranslationExampleButton";
    this.translationPhotoClass = "translationPhoto";
    this.photoSelectorClass = "photoSelector";
    
    this.obtenerIdEjemploTraduccionDefinicion = function(valor1, valor2){
        
        var id = this.idBaseEjemploParte1 + valor1 + this.idBaseEjemploParte2 + valor2;
        return id;
    };
    
    this.prevenirScrollDelBodyCuandoMouseEntraADiv = function(){
            var clase = ".scrolleableDiv",
                elementosEncontrados = $(clase);

            elementosEncontrados.bind("mouseenter", function(){

               $('body').css({"overflow":"hidden", "position":"fixed"});
           });
           
            elementosEncontrados.bind("mouseleave", function(e) {
                $('body').css({"overflow":"auto", "position":"initial"});
            });
            
    };
    
    
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
    
    this.getNewExampleStructure = function(){
            var html = "";
            
            html += '<label">Ejemplo</label>';
            html += '<textarea class="form-control ' + this.translationExampleClass + '" ></textarea>';
            
            return html;
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
    
    
    this.remarcarTraduccionesDefinicionesVacias = function(indicesTraduccionesDefiniciones){
        
        if(!indicesTraduccionesDefiniciones instanceof Array){
            return false;
        }
        
        var i = 0,
            lengthArray = indicesTraduccionesDefiniciones.length;
        
        for(i = 0; i < lengthArray; i++){
            
            $("#" + this.idBaseDivContenedorTraduccionesDefiniciones + indicesTraduccionesDefiniciones[i]).addClass("redBoxAlert");
        }
    };
    
    /*
     * Verifica si entre las traduccionesDefiniciones cargadas hasta el momento existe alguna que
     * tenga su traduccion y definicion vacias. Si encuentra alguna, devuelve un array con los indices
     * de dichas traducciones. Si no encuentra nada devuelve false;
     * @returns {Boolean}
     */
    this.existeTraduccionDefinicionVacia = function(){
        var i = 0,
            lengthTraducciones = this.traduccionesDefiniciones.length,
            traduccionDefinicionAnalizada,
            arregloTraduccionesDefiniciones = this.traduccionesDefiniciones,
            arregloTraduccionesDefinicionesVacias = [];
        
        for(i = 0; i < lengthTraducciones; i++){
            
            traduccionDefinicionAnalizada = arregloTraduccionesDefiniciones[i];
            
            if(traduccionDefinicionAnalizada.estaSinUsar()){
                
                arregloTraduccionesDefinicionesVacias.push(i);
            }
        }
        
        if(arregloTraduccionesDefinicionesVacias.length !== 0){
            return arregloTraduccionesDefinicionesVacias;
        }
        
        return false;
    };
    
    
    this.agregarEventoClickNuevaTraduccion = function (){
    
    var self = this;
    
    $("#btnNuevaTraduccion").click(function(){
      
        self.traduccionesDefiniciones = obtenerArrayConTraduccionesDefiniciones();
        
        var estructuraHTMLTraduccionesDefiniciones = "",
            traduccionesVacias = self.existeTraduccionDefinicionVacia();


        if(!traduccionesVacias){
            
            self.cerrarMensajeInformativo();
            
            // En esta variable se guarda la estructura vacia HTML que contendra las traduccionesDefiniciones.
            // Se la inicializa con valores por defecto de ID 0 para todos los elementos y con un solo campo para ejemplos
             estructuraHTMLTraduccionesDefiniciones = obtenerEstructuraNuevaTraduccion(0, 1);
             
             estructuraHTMLTraduccionesDefiniciones += obtenerEstructuraHTMLTraduccionesDefinicionesTomandoDatosDelArray(self.traduccionesDefiniciones, 1);
        
            // Ss agrega la estructura html vacia que contendra las traduccionesDefiniciones
            self.contenedorTraduccionesDefiniciones.html(estructuraHTMLTraduccionesDefiniciones);

            // Se carga la estructura cargada en el paso anterior con las traducciones que esten guardadas en el arreglo de traduccionesDefiniciones
            colocarTraduccionesDefinicionesDesdeArray(true);

            prepararBotonesEliminarTraduccionDefinicion(self.traduccionesDefiniciones.length + 1);
            
        }
        else{
            
            self.remarcarTraduccionesDefinicionesVacias(traduccionesVacias);
            
            $("#" + self.idBaseTraduccion + traduccionesVacias[0]).focus();
            
            self.mostrarMensajeInformativo("¡Parece que te ha quedado una traduccion-definicion sin usar!", "danger");
            //alert("Vaya! Parece que tenes una traduccion-definicion que esta sin usar");
        }
    });
    
        
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
        
        
                
        function getNewTranslationStructure(){
            var html  = '<div class="row">';
                
                // Left column definition. Translations
                html += '<div class="col-xs-8">';
                html += '<div class="panel panel-success ' + self.translationContainerClass + '>';
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
        }
        
        
        /*
        * Elimina la traduccion-definicion en la que se encuentra el boton eliminar
        */
        function agregarEventoClickBotonEliminar(idBoton){
 
            var boton = $("#"+idBoton);

            boton.click(function(){
                
               var idSeparado = idBoton.split("-"),
               numeroID = idSeparado[idSeparado.length - 1];
                            
               self.cerrarMensajeInformativo();
               
               self.traduccionesDefiniciones = obtenerArrayConTraduccionesDefiniciones();
               
               
               self.traduccionesDefiniciones.splice(numeroID, 1);
               
               self.contenedorTraduccionesDefiniciones.html(obtenerEstructuraHTMLTraduccionesDefinicionesTomandoDatosDelArray(self.traduccionesDefiniciones, 0));
               
               colocarTraduccionesDefinicionesDesdeArray(false);
               
               prepararBotonesEliminarTraduccionDefinicion(self.traduccionesDefiniciones.length);
            });
        };
        
        

    };
}