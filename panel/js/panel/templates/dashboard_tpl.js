var dashboard_tpl =function (_swig,_ctx,_filters,_utils,_fn) {
  var _ext = _swig.extensions,
    _output = "";
_output += "    <nav class=\"navbar navbar-inverse navbar-fixed-top\" id=\"mainbar\"  role=\"navigation\">\n      <div class=\"container\">\n        <div class=\"navbar-header\">          \n          <div class=\"navbar-brand\">BusinessKids | Escritorio</div>\n        </div>\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n            <ul class=\"nav navbar-nav navbar-right\">\n            <li><a href=\"#\" data-action=\"logout\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Cerrar sesión\"><i class=\"glyphicon glyphicon-log-out\"></i> Cerrar</a></li>            \n          </ul>     \n        </div><!--/.navbar-collapse -->\n      </div>\n    </nav>\n\n\n    <div id=\"contact-container\" class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\" style=\"margin-top:80px;\">\n                <form id=\"filter-form\" class=\"form-inline\" novalidate>\n                  <div class=\"form-group\">                            \n                    <input type=\"text\" name=\"nombre\" class=\"form-control input-sm\" placeholder=\"Buscar por nombre\" autocomplete=\"off\">\n                  </div>         \n                  <a href=\"#\" data-action=\"export\" class=\"btn btn-success btn-sm pull-right\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Descargar lista en excel\"><i class=\"glyphicon glyphicon-cloud-download\n\"></i> Descargar Listado</a>\n                </form>                    \n                \n            </div>\n        </div>\n        <div class=\"row\">\n            <div id=\"contact-table\" class=\"col-md-12\" style=\"margin-top:20px;\">\n                <table class=\"table table-hover\">\n                  <thead>\n                      <tr>\n                          <th>#</th>\n                          <th>Nombre</th>\n                          <th>Teléfono</th>\n                          <th>Correo Electrónico</th>\n                          <th>Sucursal</th>\n                      </tr>\n                  </thead>\n                  <tbody>\n                      ";
(function () {
  var __l = ((typeof _ctx.list !== "undefined") ? ((typeof _ctx.list !== "undefined") ? _ctx.list : "") : ((typeof list !== "undefined") ? list : "")), __len = (_utils.isArray(__l)) ? __l.length : _utils.keys(__l).length;
  if (!__l) { return; }
  _ctx.___loopcache = { loop: _ctx.loop, item: _ctx.item, __k: _ctx.__k };
  _ctx.loop = { first: false, index: 1, index0: 0, revindex: __len, revindex0: __len - 1, length: __len, last: false };
  _utils.each(__l, function (item, __k) {
    _ctx.item = item;
    _ctx.__k = __k;
    _ctx.loop.key = __k;
    _ctx.loop.first = (_ctx.loop.index0 === 0);
    _ctx.loop.last = (_ctx.loop.revindex0 === 0);
    _output += "\n                      <tr>\n                          <td>";
_output += _filters["e"](((typeof _ctx.loop !== "undefined" && _ctx.loop.index !== undefined) ? ((typeof _ctx.loop !== "undefined" && _ctx.loop.index !== undefined) ? _ctx.loop.index : "") : ((typeof loop !== "undefined" && loop.index !== undefined) ? loop.index : "")));
_output += "</td>\n                          <td>";
_output += _filters["e"](((typeof _ctx.item !== "undefined" && _ctx.item.nombre !== undefined) ? ((typeof _ctx.item !== "undefined" && _ctx.item.nombre !== undefined) ? _ctx.item.nombre : "") : ((typeof item !== "undefined" && item.nombre !== undefined) ? item.nombre : "")));
_output += "</td>\n                          <td>\n                          ";
if (((typeof _ctx.item !== "undefined" && _ctx.item.telefono !== undefined) ? ((typeof _ctx.item !== "undefined" && _ctx.item.telefono !== undefined) ? _ctx.item.telefono : "") : ((typeof item !== "undefined" && item.telefono !== undefined) ? item.telefono : ""))) { 
_output += "\n                            ";
_output += _filters["e"](((typeof _ctx.item !== "undefined" && _ctx.item.telefono !== undefined) ? ((typeof _ctx.item !== "undefined" && _ctx.item.telefono !== undefined) ? _ctx.item.telefono : "") : ((typeof item !== "undefined" && item.telefono !== undefined) ? item.telefono : "")));
_output += "  \n                          ";

}_output += "                          \n                          </td>\n                          <td>";
_output += _filters["e"](((typeof _ctx.item !== "undefined" && _ctx.item.email !== undefined) ? ((typeof _ctx.item !== "undefined" && _ctx.item.email !== undefined) ? _ctx.item.email : "") : ((typeof item !== "undefined" && item.email !== undefined) ? item.email : "")));
_output += "</td>\n                          <td>";
_output += _filters["e"](((typeof _ctx.item !== "undefined" && _ctx.item.sucursal !== undefined) ? ((typeof _ctx.item !== "undefined" && _ctx.item.sucursal !== undefined) ? _ctx.item.sucursal : "") : ((typeof item !== "undefined" && item.sucursal !== undefined) ? item.sucursal : "")));
_output += "</td>\n                      </tr>\n                      ";
    _ctx.loop.index += 1; _ctx.loop.index0 += 1; _ctx.loop.revindex -= 1; _ctx.loop.revindex0 -= 1;
  });
  _ctx.loop = _ctx.___loopcache.loop;
  _ctx.item = _ctx.___loopcache.item;
  _ctx.__k = _ctx.___loopcache.__k;
})();
_output += "\n                  </tbody>\n                </table>                \n\n                <div id=\"error-alert\" class=\"alert alert-danger\" style=\"display:none;\" role=\"alert\">Ocurrió un error, no se ha podido completar la solicitud</div>\n            </div>\n        </div>\n    </div>";

  return _output;

};
