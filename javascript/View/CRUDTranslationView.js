/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CRUDTranslationView(){
    
    this.CRUDTranslationController = new CRUDTranslationController(this);
    this.informativeMessageWindow = new InformativeMessage();
    
    this.buttonNewTranslation = $("#btnNewTranslation");
    this.translationForm = $("#translationsForm");

    this.translationContainerClass = "translationContainer";    
    
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
