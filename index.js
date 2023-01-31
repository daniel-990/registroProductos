/* index js */

const init = () => {

    let render = document.getElementById("render");
    //datos
    const nombre = document.getElementById("nombre");
    const descripcion = document.getElementById("descripcion");
    const categoria = document.getElementById("categoria");
    const cantidad = document.getElementById("cantidad");
    const precio = document.getElementById("precio");
    const btnEnviar = document.getElementById("enviar");

    //--render
    let html = "";

    //db browser

    const mostrarDatos = () => {
        axios({
            method:'get',
            url:'https://apirestnode.fly.dev/productos',
            responseType: 'json'
        })
        .then(function (response) {
            const datos = response.data.mensaje;

            datos.map(items => {
                console.log(items);
                //---
                const fecha = Date.now();
                let db = new PouchDB('my_productos');
                html = '<p class="text-center font-weight-boldfont-weight-bold text-info">Cargando...</p>';
                render.innerHTML = html;
                db.put({
                    _id: fecha.toString(), //id para indentificar
                    cantidad: items.catidad,
                    categoria: items.categoria,
                    descripcion: items.descripcion,
                    fecha: items.fecha,
                    id: items.id,
                    nombre: items.nombre,
                    precio: items.precio
                }).then(function(response){
                    
                    //se obtienen datos de la base de datos local
                    db.allDocs({include_docs: true}, 
                    (error, docs) => {
                        if (error) {
                            console.log(error);
                        } else {
                            db.info().then(function (result) {
                                console.log('resultados obtenidos: '+result.doc_count);
                                const contador = result.doc_count;
                                if (contador == 0) {
                                    console.log("no hay contenido para mostrar");
                                }
                            })
                            const data = docs.rows;
                            data.map(items => {
                                //se obtienen datos guardados local
                                console.log(items.doc);
                            })
                        }
                    });
                }).catch(function(err){
                    console.log(err);
                });
            })
        }).then(function(){
            // always executed
            html = '<p class="text-center font-weight-boldfont-weight-bold text-info">ya cargo</p>';
            render.innerHTML = html;
        });
    }

    //ejecucion de las funciones
    mostrarDatos();
}
init();