$(document).ready(function(){
	$("a.transicion").transicion();
	
	function slider()
	{
		$(window).load(function() {
	        $('#slider').nivoSlider();
	    });
	}

	$("#palanca").click(function(){
		$(this).removeClass("sec_gal_swch_a");
		$(this).addClass("sec_gal_swch_a2");

	});

	function fancybox()
	{
		var fancy_rwd_760=($(window).width()<760)?true:false;

		if (fancy_rwd_760)
			{
				$(".modal").fancybox({
					autoSize:false,
					width:"85%",
					height:"90%",
					afterShow: function() {
						$("body").css({
							"overflow":"hidden"
						});
					},
					beforeClose: function() {
						$("body").css({
							"overflow":"auto"
						});
					},
					helpers : {					
						overlay:{
							css:{
								// "background":"red"
								"background":"rgba(0,0,0,.8)"
							},
							locked : false
						}
					}
				});
				$('.fancybox-media').fancybox({
					autoSize:false,
					height:"80%",
					width:"85%",
					prevEffect : 'none',
					nextEffect : 'none',
					afterShow: function() {
						$("body").css({
							"overflow":"hidden"
						});
					},
					beforeClose: function() {
						$("#palanca").removeClass("sec_gal_swch_a2");
						$("#palanca").addClass("sec_gal_swch_a");
						$("body").css({
							"overflow":"auto"
						});
					},
					helpers : {
						media : true,
						buttons : true,
						overlay:{
							css:{
								// "background":"red"
								"background":"rgba(0,0,0,.8)"
							},
							locked : false
						}
					}
				});
			}
			else
			{
				$(".modal").fancybox({
					autoSize:false,
					width:"75%",
					height:"80%",
					afterShow: function() {
						$("body").css({
							"overflow":"hidden"
						});
					},
					beforeClose: function() {
						$("body").css({
							"overflow":"auto"
						});
					},
					helpers : {					
						overlay:{
							css:{
								// "background":"red"
								"background":"rgba(0,0,0,.8)"
							},
							locked : false
						}
					}	
				});
				
				$('.fancybox-media').fancybox({
					autoSize:false,
					height:"70%",
					width:"50%",
					prevEffect : 'none',
					nextEffect : 'none',
					afterShow: function() {
						$("body").css({
							"overflow":"hidden"
						});
					},
					beforeClose: function  () {
						$("#palanca").removeClass("sec_gal_swch_a2");
						$("#palanca").addClass("sec_gal_swch_a");
						$("body").css({
							"overflow":"auto"
						});
					},
					helpers : {
						media : true,
						buttons : true,
						overlay:{
							css:{
								// "background":"red"
								"background":"rgba(0,0,0,.8)"
							},
							locked : false
						}
					}

				});
			}
	}

	function menu_movil()
	{
		$("#btn_menu").click(function(){
			$(".menu_despeg").fadeIn(500);
			$("body").css({
				"overflow":"hidden"
			});
		});

		$("#btn_menu_x").click(function(){
			$(".menu_despeg").fadeOut(500);
			$("body").css({
				"overflow":"auto"
			});
		});
		

		$(".a_menu").click(function(){
			$(".menu_despeg").slideUp(500),
			$("body").css({
				"overflow":"auto"
			});
		});
	}

	slider();
	fancybox(); 
	menu_movil();

	$("#form_contacto").validate({
		rules: {
			nombre : "required",
		email : {
			required : true,
			email : true
		}
		},
		messages : {
			nombre : "Este campo es requerido.",
		email : {
			required : "Este campo es requerido.",
			email : "Especifique una dirección de correo válida"
		}
		},
		submitHandler: function(form) {
		var $form = $(form),
			$spanSuccess = $('#span_exito'),
			$spanError = $('#span_error'),
			inputs = $form.serializeArray();		

		$spanSuccess.hide();
		$spanError.hide();

		data = {}
		for (var i = 0; i < inputs.length; i++) {
			data[inputs[i].name] = inputs[i].value;
			
		}		

		$.ajax({
			url : 'savecontacts.php',
			type : 'POST',
			data : data
		})
		.done(function(response){
			var parseResponse = JSON.parse(response);

			if (typeof parseResponse.id !== "undefined") {				
				$spanSuccess.fadeIn('fast').delay(800).fadeOut('fast');

				$form.trigger('reset');
			}
			else {
				$spanError.fadeIn('fast').delay(800).fadeOut('fast');
			}		

		})
		.fail(function(response){
			$spanError.fadeIn('fast').delay(800).fadeOut('fast');
		});
		},
		errorElement : 'span'	  
	});
});

$(window).load(function() {
	$(".load").fadeOut(200);
});