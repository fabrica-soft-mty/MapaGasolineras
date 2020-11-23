class API {
    async obtenerDatos() {
        //definir el total de estaciones a obtener(documentacion del aapi)
        const total = 600;
        //obtener datos
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);
        //obtenr respuesta en json
        const respuestaJSON = await datos.json();

        return {
            respuestaJSON
        }


    }
}