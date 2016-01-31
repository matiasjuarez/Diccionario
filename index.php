/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

<!DOCTYPE html>
<html lang="es">
<head>
	<title></title>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <script src = "javascript/jquery-2.1.4.min.js"></script>
        <script src = "javascript/bootstrap.min.js"></script>
        <script src = "javascript/traduccionDefinicion.js"></script>
        <script src ="javascript/manejadorVentana.js"></script>
	<script src = "javascript/script.js"></script>
        <script src = "javascript/gestorComunicacionServidor.js"></script>
        
        
        <link href = "./styles/bootstrap.min.css" rel = "stylesheet" type="text/css" />
	<link  href = "./styles/style.css" rel = "stylesheet" type = "text/css" />
	
</head>
<body>
	
        <div class="container" id="divContainer">
            
            <div class="row">
                <div class="col-xs-12">
                    <h1 id="TituloDiccionario" class="text-center well">
                        Diccionario de inglés
                    </h1>
                </div>
            </div>
            
            <!--- Contenedor botones principales -->
            <div class="row">
                <div class="col-xs-12">
                    <div class="btn-group btn-group-justified">
                        
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary">NUEVA PALABRA</button>
                        </div>
                        
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary">MODIFICAR PALABRA</button>
                        </div>
                        
                        <div class="btn-group">
                             <button type="button" class="btn btn-primary">ELIMINAR PALABRA</button>
                        </div>
                        
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary">CONSULTAR</button>
                        </div>
 
                    </div>
                </div>
            </div>
            <!--- Fin contenedor botones -->
            
            
            <!--- Contenedor NUEVA PALABRA -->
            <div class="row" id="contenedorNuevaPalabra">
                <div class="col-xs-12">
                    
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <!--- DIV palabra pronunciacion -->
                            <div class="row">
                                <div class="col-xs-12">

                                    <form class="form-inline" role="form">

                                        <div class="form-group">
                                            <label for="palabra">Palabra</label>
                                            <input type="text" class="form-control" id="palabra" />

                                            <label for="pronunciacion">Pronunciacion</label>
                                            <input type="text" class="form-control" id="pronunciacion" />
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <!--- FIN DIV palabra pronunciacion -->
                            
                            <!--- DIV traducciones definiciones -->
                            <div class="row largeVerticalMargin ">
                                
                                <div class="col-xs-12">
                                    
                                    <div class="panel panel-warning">
                                        <div class="panel-heading">
                                            <span>TRADUCCIONES-DEFINICIONES</span>
                                            <button type="button" class="floatRight btn btn-warning" id="btnNuevaTraduccion">NUEVA TRADUCCION</button>
                                        </div>
                                    </div>
                                    
                                    <div class="panel panel-warning">
                                        <div class="panel-body overflowVertical height400px scrolleableDiv">
                                            <form class="form-horizontal " id="formTraduccionesDefiniciones" role="form">
                                                
                                                
                                            </form>
                                        </div>   
                                    </div>
                                    
                                </div>
                           
                            </div>
                            <!--- FIN DIV traducciones definiciones -->
                        </div>
                        
                    </div>
                    
                    
                    
                </div>
            </div>
            <!--- FIN CONTENEDOR NUEVA PALABRA -->
        </div>
</body>
</html>