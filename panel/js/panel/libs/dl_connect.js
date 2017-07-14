/*
* aplication object
*/

var DlConnect = function($){
    /*
    * private vars 
    */

    var config = {};

    this.$ = $;
    
    // configs 
    config.urls = {};

    // config.urls.rootApi = "http://localhost:8000/";
    config.urls.rootApi = "http://alamilla.devlancers.mx/";

    // obtener configuraciones
    this.getConfig = function(){
        return config
    };

    // obtener token de captura
    this.getCaptionToken = function(){
        // prod
        var token = "5297ddea4e193fce2c8f1c1902f6738adeffda6a"

        // dev
        // var token = "60d65211bb68a008a11c22ef20b0b1f616d437b6"

        return token
    };
};

/*
* api contactos
*/

DlConnect.prototype.getConfigByAttr = function(attr){
    configs = this.getConfig();
    return configs[attr];
}

// guardar contacto
DlConnect.prototype.saveContact = function(object, successCallback, errorCallback){
    var self = this,
        config = self.getConfig(),
        captionToken = self.getCaptionToken()
    
    var call = self.$.ajax({
        url : config.urls.rootApi + "contactos/",
        type : "POST",
        dataType : "json",
        data : object,
        beforeSend : function(jqXHR, setting){
            jqXHR.setRequestHeader('Authorization', 'Token ' + captionToken);
        }
    });

    call
        .done(successCallback)
        .fail(errorCallback);
};

// obtener listado de contactos
DlConnect.prototype.getContacts = function(successCallback, errorCallback){

}