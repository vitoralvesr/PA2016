function montarParametros (filtros) {
	var parametros = '?';

    for(var attr in filtros){
        if (filtros[attr] !== undefined && filtros[attr] !== null) {
            if (parametros !== '?') {
                parametros += '&';
            }

            parametros += (attr + '=' + filtros[attr]);
        }
    }
    return parametros === '?' ? null : parametros;
}