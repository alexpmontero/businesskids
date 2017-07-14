// router
var BaseRouter = (function(Backbone, BaseController){
	return Backbone.Router.extend({
		routes : {
			"acceso" : BaseController.login,
			"cerrar" : BaseController.logout,
			"escritorio" : BaseController.dashboard
		},
	});
}(Backbone, BaseController));