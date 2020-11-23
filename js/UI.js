class UI {
    constructor() {
        //instanciar la API
        this.api = new API();
        //crear los markers con layoutGroup funcion de leafleft
        this.markers = new L.LayerGroup();
        // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa esta escrito en open streat map
        const map = L.map('mapa').setView([25.668381, -100.244503], 13);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + enlaceMapa + ' Contributors',
                maxZoom: 18,
            }).addTo(map);
        return map;

    }
    mostrarEstablecimientos() {
        this.api.obtenerDatos()
            .then(datos => {
                const resultado = datos.respuestaJSON.results;
                this.mostrarPines(resultado);
            });
    }

    mostrarPines(datos) {
        //limpiar los markers
        this.markers.clearLayers();
        datos.forEach(dato => {
            //estraer datos que se ocupan de datos
            const { latitude, longitude, calle, regular, premium, razonsocial } = dato;
            //agregar un nuevo popup para mostrar info
            const opcionesPopUp = L.popup().setContent(
                `<p>Calle: ${calle}</p>
                <p><b>Regular:</b>$ ${regular}</p>
                <p><b>Premium:</b>$ ${premium}</p>
                <p><b>Empresa:</b> ${razonsocial}</p>
            `);
            //agregando un nuevo markador al mapa
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }
    obtenerSugerencias(busqueda) {
            this.api.obtenerDatos()
                .then(datos => {
                    //obtener los datos
                    const resultados = datos.respuestaJSON.results;
                    //enviar al json y la busqueda para filtrado
                    this.filtrarSugerencias(resultados, busqueda);


                })
        }
        //filtrar sugerencias en base al input
    filtrarSugerencias(resultado, busqueda) {
        //filtrar con la funcion filter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        //mostrar los pines.
        //
        this.mostrarPines(filtro);
    }
}