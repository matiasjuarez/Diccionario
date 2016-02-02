/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function InformativeMessage(message, kindOfMessage){
    
    this.setMessage(message);
    
    this.setKindOfMessage(kindOfMessage);
    
    // It represents a jquery element containing the div that holds the message
    this.messageElement;
}

InformativeMessage.prototype.setMessage = function(message){
    this.message = message || "No message has been specified";
};

InformativeMessage.prototype.setKindOfMessage = function(kindOfMessage){
     if(kindOfMessage !== "danger" && kindOfMessage !== "warning" && kindOfMessage !== "success" && kindOfMessage !== "info"){
        this.kindOfMessage = "info";
    }
    else{
        this.kindOfMessage = kindOfMessage;
    }
};


InformativeMessage.prototype.showMessage = function(containerElement){
    var self = this,
            html = "";
    
    self.closeMessage();
    
     html = "<div class='alert alert-" + self.kindOfMessage + " fade in'> \n\
            <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> \n\
            <strong>" + self.message + "</strong>\n\
            </div>";
    
    self.messageElement = $.parseHTML(html);
    
    $(self.messageElement).css({
        "position": "fixed",
        "top": "0px",
        "left": "15%",
        "width": "70%",
        "text-align": "center",
        "z-index": "3",
        "box-shadow": "5px 5px 10px gray"
    });
    
    $(containerElement).append(self.messageElement);
};


InformativeMessage.prototype.closeMessage = function(){
    var self = this;
    
    if(self.messageElement){
        $(self.messageElement).remove();
    }
    
    self.messageElement = null;
};