var login_tpl =function (_swig,_ctx,_filters,_utils,_fn) {
  var _ext = _swig.extensions,
    _output = "";
_output += "<div id=\"access-container\" class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-4 col-md-offset-4\">\n            <form id=\"access-form\" style=\"margin-top:100px;\" novalidate>\n              <div class=\"form-group\">                    \n                <input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" placeholder=\"Usuario\" autocomplete=\"off\">\n                <p class=\"input-error text-danger\"></p>\n              </div>\n              <div class=\"form-group\">                    \n                <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" placeholder=\"Contraseña\">\n                <p class=\"input-error text-danger\"></p>\n              </div>                  \n              <button type=\"submit\" class=\"btn btn-info\">Acceder</button>\n              <p id=\"form-text\" class=\"form-text text-success\"></p>\n            </form>\n        </div>\n    </div>\n</div>";

  return _output;

};
