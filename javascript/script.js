
var crudTranslationViewer;

$(document).ready(function(){
    
    crudTranslationViewer = new CRUDTranslationView();
    
    crudTranslationViewer.addEventListeners();
    /*manejadorVentana.agregarEventoClickBotonNuevoEjemplo();
    manejadorVentana.agregarEventoImagenCargadaSelectorArchivos();*/
    //manejadorVentana.prevenirScrollDelBodyCuandoMouseEntraADiv();
    
    /*var gestorComunicacion = new GestorComunicacionServidor("http://localhost/Diccionario/scriptsPHP/conexionBaseDatos.php");
    gestorComunicacion.enviarPeticion(function(respuesta){
        console.log(respuesta.status);
    });
   */
});