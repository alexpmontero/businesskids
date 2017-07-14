(function(BaseRouter, directives){
	// cargar router
	var ws = new BaseRouter();
	Backbone.history.start({pushState: false});	

	var verifySession = directives['verifySession'];	

	// redirigir a login si no esta registrado el usuario
	if (Backbone.history.getFragment() === "") {
		var sessionData = verifySession(ws);

		if (typeof sessionData === 'object') {
			console.log('object');
			Backbone.history.navigate('escritorio', {trigger: true, replace: true});	

		}
		
	}

}(BaseRouter, Directives));
