var LoginView = (function(Backbone, directives){

	showFormErrors = directives.showInputsFormErrors;
	cleanFormErrors = directives.cleanFormErrors;
	serializeForm = directives.serializeForm;
	setSession = directives.setSession;
	apiConfiguration = directives.apiconf();

	var View = Backbone.View.extend({
		tagName : "div",
		className : "login-container",

		events : {
			"submit #access-form" : 'submitForm'
		},		

		initialize : function(settings){
			var self = this;

			self.template = settings.template;			

		},	

		render : function(){

			var self = this;
			
		    /*
				template
			*/
			
			// cargar template
			context = {}
			var html = swig.run(self.template, context);

			// insert html in container
			self.$el.html(html);			

			return this;
		},

		submitForm : function(event){
			event.preventDefault();
			
			var self = this;
			var $form = $(event.target);				
			var errorText = "Ocurrió un error, no se ha podido completar la solicitud";

	
    		formText = $form.find('#form-text');    		
    		
	    	cleanFormErrors($form);	    	

	    	$.ajax({
	    		type : "POST",
	    		url : apiConfiguration.root + "token-auth/",
	    		dataType : "json",
	    		data : serializeForm($form)
	    	})
	    	.done(function(data){
	    		// crear token de acceso
	    		setSession(data.token);	    		

	    		// limpiar formulario
	    		$form.trigger('reset');

	    		// direccionar a #contactos
				Backbone.history.navigate('escritorio', {trigger: true, replace: true});				

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

					showFormErrors($form, inputsErrors);
					$form.find('input[name=password]').val('');
				}
			});
	    	
		},

	});

	return View

}(Backbone, Directives));