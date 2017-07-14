// controllers
var BaseController = (function($, swig, _, Backbone, directives, LoginView, DashboardView){
	// variables	
	var controllers = {},		
		verifySession = directives['verifySession'],
		isSessionActive = directives['isSessionActive'],
		unsetSession = directives['unsetSession'],		
		apiConfiguration = directives.apiconf();		

	/*
	* configuracion de backbone
	*/

	// agrego jquery global a entorno backbone
	Backbone.$ = $;

	// sobre escribo ajax para recibir y enviar token de acceso
	Backbone.ajax = function() {
	    // invoco $.ajaxSetup en el contexto de Backbone.$
	    Backbone.$.ajaxSetup.call(Backbone.$, {
	    	beforeSend: function(jqXHR){
	    		if (directives.getAccessHeader() !== 'Token undefined') {
	    			jqXHR.setRequestHeader("Authorization", directives.getAccessHeader());
	    		}	    		
			}		
		});
		return Backbone.$.ajax.apply(Backbone.$, arguments);
	};

	// agrego '/' a url si no lo tiene
	var _sync = Backbone.sync;
	Backbone.sync = function(method, model, options){

	    // Add trailing slash to backbone model views
	    var _url = _.isFunction(model.url) ?  model.url() : model.url;
	    _url += _url.charAt(_url.length - 1) == '/' ? '' : '/';

	    options = _.extend(options, {
	        url: _url
	    });

	    return _sync(method, model, options);
	};

	/*
	* modelos y colecciones
	*/

	var ContactModel = Backbone.Model.extend();

	var ContactCollection = Backbone.Collection.extend({
	  model: ContactModel,
	  url: apiConfiguration.root + "api/contactos/"
	});

	var collectionContacts = new ContactCollection();	
			

	/*
	* vistas
	*/	

	var loginView = new LoginView({
		el : $('.app'), 
	  	template : Templates.login
	});		

	var dashboardView = new DashboardView({
		el : $('.app'), 
	  	template : Templates.dashboard,
	  	downloadLink : apiConfiguration.root + "exportar/contactos/",
	  	collection : collectionContacts
	});		

	/*
	* controladores
	*/

	controllers['login'] = function(){
		if (isSessionActive()) {
			Backbone.history.navigate('escritorio', {trigger: true, replace: true});
		}
		else {
			loginView.render();
		}
		
	};

	controllers['logout'] = function(){
		if (isSessionActive()) {
			unsetSession();
		}

		Backbone.history.navigate('acceso', {trigger: true, replace: true});

	};	

	controllers['dashboard'] = function(){

		// comprobar session
		var sessionData = verifySession(this);

		if (typeof sessionData === 'object') {

			// buscar listado de contactos y mostrar en la tabla
	    	dashboardView.fetch({ 
	    		reset : true,
	    		error : function(jqXHR, responseStatus){		    		
	    			if (responseStatus.responseText === "{\"detail\":\"Usuario inactivo o borrado.\"}") {	    				
	    				// eliminar cookie caducada
	    				unsetSession();
	    				$('#alert-warning').text(responseStatus.responseJSON.detail).show();
	    				Backbone.history.navigate('acceso', {trigger: true, replace: true});
	    				
	    			}	    			
	    		}
	    	});
		}
		
	};	


	return controllers

}($, swig, _, Backbone, Directives, LoginView, DashboardView));