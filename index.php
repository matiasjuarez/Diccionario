<!DOCTYPE html>
<html lang="es">
<head>
	<title></title>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <script src = "./javascript/libs/jquery-2.1.4.min.js"></script>
        <script src = "./javascript/libs/bootstrap.min.js"></script>
        <script src = "./javascript/View/CRUDTranslationView.js"></script>
        <script src = "./javascript/View/InformativeMessage.js"></script>
        <script src = "./javascript/Controller/CRUDTranslationController.js"></script>
        <script src = "./javascript/Model/Translation.js"></script>
	<script src = "./javascript/script.js"></script>
        <script src = "./javascript/gestorComunicacionServidor.js"></script>
        
        
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
            
            
            <!--- NEW WORD container -->
            <div class="row" id="createNewWordConatiner">
                <div class="col-xs-12">
                    
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            
                            <!--- DIV word pronunciation -->
                            <div class="row">
                                <div class="col-xs-12">

                                    <form class="form-inline" role="form">

                                        <div class="form-group">
                                            <label for="word">Palabra</label>
                                            <input type="text" class="form-control" id="word" />

                                            <label for="pronunciation">Pronunciacion</label>
                                            <input type="text" class="form-control" id="pronunciation" />
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <!--- FIN DIV palabra pronunciacion -->
                            
                            <!--- DIV translations -->
                            <div class="row largeVerticalMargin ">
                                
                                <div class="col-xs-12">
                                    
                                    <div class="panel panel-warning">
                                        <div class="panel-heading">
                                            <span>TRADUCCIONES</span>
                                            <button type="button" class="floatRight btn btn-warning" id="btnNewTranslation">NUEVA TRADUCCION</button>
                                        </div>
                                    </div>
                                    
                                    <div class="panel panel-warning">
                                        <div class="panel-body overflowVertical height400px scrolleableDiv">
                                            <form class="form-horizontal" id="translationsForm" role="form">
                                                
                                                
                                            </form>
                                        </div>   
                                    </div>
                                    
                                </div>
                           
                            </div>
                            <!--- END OF DIV translations -->
                        </div>
                        
                    </div>
                    
                    
                    
                </div>
            </div>
            <!--- END OF NEW WORD container -->
        </div>
</body>
</html>