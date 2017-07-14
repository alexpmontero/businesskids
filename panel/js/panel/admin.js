/*
* iniciar aplicacion
*/

(function($, DlConnect, Backbone, _, swig){	

	// instanciar conexion a la base
	var Api = new DlConnect($),
		appRoot = "/jg_sites/alamilla-test/admin/";

	/*
	* jquery extend
	*/

	// serializar inputs de formulario en un objeto
	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

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
	    		jqXHR.setRequestHeader("Authorization", getAccessHeader());    		
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
	* elementos backbone
	*/

	// modelos
	var ContactModel = Backbone.Model.extend();

	// collecciones
	var ContactCollection = Backbone.Collection.extend({
	  model: ContactModel,
	  url: Api.getConfigByAttr('urls').rootApi + "contactos/"
	});

	var collectionContacts = new ContactCollection();
	var filterCollectionContacts = new ContactCollection();

	/*
	* funciones de tokens
	*/

	// cookie config
    var secure = false; // usar https(true)
    var expires = 30; // dias en expirar
	
	getAccessHeader = function(){
    	return "Token " + Cookies.get('sessiontoken');
	};

	// agregar cookies de sesion al navegador y redireccionar a escritorio
	setSessionCookies = function(obj){
	    var config = { secure: secure, expires: expires };
	    Cookies.set('sessiontoken', obj.token, config);
	};

	// eliminar cookies de sesion y redireccionar a login
	removeSessionCookies = function(){
	    // eliminar cookies de sesion
	    Cookies.remove('sessiontoken');	    
	};

	isAuthTokenExists = function(){
		return typeof Cookies.get('sessiontoken') !== 'undefined'
	};

	/*
	* acciones
	*/

	var actions = {};

	actions.logout = function(){
		removeSessionCookies();
		adminWorkspace.navigate('acceso', { trigger : true });
	}

	/*
	* formularios
	*/

	var showInputsErrors = function($form, errors){
		for (var i = 0; i < errors.length; i++) {
			$form.find('[name=' + errors[i].name + ']').siblings( ".input-error" ).text(errors[i].value);
		};	
	};

	var cleanErrors = function($form){		
		$form.find('.input-error').text('');
		$form.find('.form-text').text('');
	}

	/*
	* router
	*/

	var $accessContainer = $("#access-container"),
		$contactContainer = $("#contact-container"),
		$mainBar = $('#mainbar');

	filterCollectionContacts.on("reset", function(){
		var context = { "contacts" : this.toJSON() }
    	var tpl = swig.compile($('#contact_tpl').html());
    	var html = tpl(context);

    	$('#contact-table').find('tbody').html(html);
	});

	collectionContacts.on("sync", function(model){		
		// ocultar y mostrar interfaces
		$accessContainer.hide();
    	$mainBar.animate({ marginTop : 0 }, 500);
    	$contactContainer.fadeIn()

    	filterCollectionContacts.reset(this.toJSON());
	});

	var Workspace = Backbone.Router.extend({
	  routes: {
	    "acceso": 		"access",
	    "contactos": 	"contacts",	    
	  },

	  access: function() {	    
	    // verificar si existe cookie de #acceso	    
	    if(isAuthTokenExists()) {			
			// direccionar a #contactos
			adminWorkspace.navigate('contactos', { trigger : true });
	    }
	    else {
	    	$mainBar.css({ marginTop : "-100%" });
	    	$accessContainer.fadeIn();
	    	$contactContainer.hide()
	    };		
	  },

	  contacts: function() {
	    // verificar si existe cookie de acceso	    
	    if(!isAuthTokenExists()) {			
			// direccionar a #acceso
			adminWorkspace.navigate('acceso', { trigger : true });
	    }
	    else {

	    	// buscar listado de contactos y mostrar en la tabla
	    	collectionContacts.fetch({ 
	    		reset : true,
	    		error : function(jqXHR, responseStatus){	    			
	    			if (responseStatus.responseText === "{\"detail\":\"User inactive or deleted.\"}") {
	    				// eliminar cookie caducada
	    				actions.logout();
	    			}
	    			$("#error-alert").show();
	    		}
	    	});

	    };
	  }
	});
	

	// instanciar router
	var adminWorkspace = new Workspace();

	/*
	* iniciar aplicacion
	*/

	// iniciar history
	Backbone.history.start({ root : appRoot });
	
	var errorText = "Ocurrió un error, no se ha podido completar la solicitud";

    // envio de formulario de acceso
    $('#access-form').on('submit', function(event){
    	event.preventDefault();

    	var $form = $(this),
    		formText = $form.find('#form-text');

    	cleanErrors($form);

    	$.ajax({
    		type : "POST",
    		url : Api.getConfigByAttr('urls').rootApi + "api-token-auth/",
    		dataType : "json",
    		data : $form.serializeObject()
    	})
    	.done(function(data){
    		// crear token de acceso
    		setSessionCookies(data);	    		

    		// direccionar a #contactos
			adminWorkspace.navigate('contactos', { trigger : true });

			$form.trigger('reset');

    	})
    	.fail(function( jqXHR, textStatus, errorThrown){
			// json con respuesta del servidor
			if (typeof jqXHR.responseJSON === "undefined") {
				formText.text(errorText);
			}
			else {
				response = jqXHR.responseJSON					

				if(typeof response.non_field_errors !== 'undefined') {
					// errores del formulario(lista)					
					var nonFieldErrors = response.non_field_errors
					var nonFieldErrorsText = "";
					delete response.non_field_errors

					for (var i = 0; i < nonFieldErrors.length; i++) {
						nonFieldErrorsText += nonFieldErrors[i] + "<br>";
					};

					formText.html(nonFieldErrorsText);
				};

				var inputsErrors = $.map(response, function(value, index){
					return { "name" : index, "value" : value[0] }
				});	

				showInputsErrors($form, inputsErrors);								
			}
		});
    });

	// salir de sesion
	$('a[data-action=logout]').on('click', function(event){
		event.preventDefault();		
		actions.logout();
	});

	// habilitar tooltips
	$('[data-toggle="tooltip"]').tooltip();

	$("#filter-form").find("input[name=nombre]").on('input', function(event){
		var string = this.value;		


		var filterArray = collectionContacts.filter(function(item){			
			var nombre = item.toJSON().nombre.toLowerCase()

			if (nombre.search(string.toLowerCase()) !== -1) {
				return item
			};
		});

		filterCollectionContacts.reset(filterArray);		
	})

})($, DlConnect, Backbone, _, swig);