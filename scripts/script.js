
var manejadorVentana;

$(document).ready(function(){
    
    manejadorVentana = new ManejadorVentana();
    manejadorVentana.agregarEventoClickNuevaTraduccion();
    manejadorVentana.agregarEventoClickBotonNuevoEjemplo();
    manejadorVentana.agregarEventoImagenCargadaSelectorArchivos();
    //manejadorVentana.prevenirScrollDelBodyCuandoMouseEntraADiv();
    
    var gestorComunicacion = new GestorComunicacionServidor("http://localhost/Diccionario/scriptsPHP/conexionBaseDatos.php");
    gestorComunicacion.enviarPeticion(function(respuesta){
        console.log(respuesta.status);
    });
   
});