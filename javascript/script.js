
var crudTranslationViewer;

$(document).ready(function(){
    
    crudTranslationViewer = new CRUDTranslationView();
    
    crudTranslationViewer.CRUDTranslationController.addClickEventNewTranslationButton(crudTranslationViewer.buttonNewTranslation);
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