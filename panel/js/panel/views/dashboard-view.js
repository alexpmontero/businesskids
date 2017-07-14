var DashboardView = (function(Backbone, _, Directives){	

	var getSession = Directives.getSession;

	var View = Backbone.View.extend({
		tagName : "div",
		className : "dashboard-container",

		events : {
			'input input[name=nombre]' : 'search',
			'click a[data-action=logout]' : 'logout',
			'click a[data-action=export]' : 'export'
		},		

		initialize : function(settings){
			var self = this;

			self.template = settings.template;
			self.downloadLink = settings.downloadLink;
			self.collection = settings.collection;
			self.filteredWord = "";

			/*
			* eventos de las colecciones
			*/

			self.collection.on("sync", function(){
				// renderizar lista de contactos
				self.originalCollection = this.toJSON();
				self.render();
			});

			self.collection.on("reset", function(){
				// renderizar lista de contactos				
				self.render();
			});

		},	

		render : function(){

			var self = this;
			
		    /*
				template
			*/

			context = {
				'downloadLink' : self.downloadLink,
				'list' : self.collection.toJSON()
			}
			
			// cargar template			
			var html = swig.run(self.template, context);

			// insert html in container
			self.$el.html(html);

			this.$('input[name=nombre]').val(self.filteredWord).focus();

			return this;
		},

		fetch : function(settings){
			this.collection.fetch(settings);
		},

		search : function(event){
			event.preventDefault();

			var string = event.target.value;
			this.filteredWord = string;

			var filteredCollection = _.filter(this.originalCollection, function(item){				
				var nombre = item.nombre.toLowerCase()

				if (nombre.search(string.toLowerCase()) !== -1) {
					return item
				};
			});

			this.collection.reset(filteredCollection);
			
		},

		logout : function(event){
			event.preventDefault();

			// direccionar a cerrar
			Backbone.history.navigate('cerrar', {trigger: true, replace: true});
		},

		export : function(event){
			event.preventDefault();
			
			var self = this;

			window.location = self.downloadLink + '?ses=' + getSession();			
		}

	});

	return View

}(Backbone, _, Directives));