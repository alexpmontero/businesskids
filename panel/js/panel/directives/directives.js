Directives = (function(Cookies, Backbone){

	var cookieSessionName = '_bksession',
		cookieUserName = '_bkuser',
		cookieConfigurationName = '_bkconfiguration',		
		directives = {};

	/*
	* session
	*/

	function getCookie(cookieName){
		return Cookies.get(cookieName);
	};

	function getJsonCookie(cookieName){
		return Cookies.getJSON(cookieName);
	};


	// registrar cookie de sesion
	directives['setSession'] = function(sessionValue){		
		Cookies.set(cookieSessionName, sessionValue);		
	}

	directives['unsetSession'] = function(){		
		Cookies.remove(cookieSessionName);		
	}

	directives['getSession'] = function(){		
    	return getCookie(cookieSessionName)
	};

	// verificar cookie y realizar accion
	directives['verifySession'] = function(router){
		// no existe cookie
		if( typeof getCookie(cookieSessionName) === "undefined") {
		  router.navigate("acceso", {trigger: true, replace: true});
		}
		else {
			// se obtiene id del usuario
			return {
				session : getCookie(cookieSessionName)
			}		  
		}
	};

 	directives['getAccessHeader'] = function(){		
    	return "Token " + getCookie(cookieSessionName);
	};

	directives['isSessionActive'] = function(){
		var isActive = false;
    	
    	if( typeof getCookie(cookieSessionName) !== "undefined") {
		  isActive = true;
		}

		return isActive;
	};


	/*
	* Api
	*/

	// local
	// directives['apiconf'] = function(){
	// 	return {
	// 		'root' : 'http://localhost:8000/'
	// 	}
	// };

	// production
	directives['apiconf'] = function(){
		return {
			'root' : 'http://businesskids.joingrowth.com/'
		}
	};




	/*
	* formularios
	*/

	directives['showInputsFormErrors'] = function($form, errors){
		for (var i = 0; i < errors.length; i++) {
			$form.find('[name=' + errors[i].name + ']').siblings( ".input-error" ).text(errors[i].value);
		};	
	};

	directives['cleanFormErrors'] = function($form){		
		$form.find('.input-error').text('');
		$form.find('.form-text').text('');
	}

	directives['serializeForm'] = function($form){	    
	    var o = {};
	    var a = $form.serializeArray();
	    
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

	return directives

}(Cookies, Backbone));