/* index js */

const init = () => {

    const render = document.getElementById("render");
    const nombre = document.getElementById("nombre");
    const descripcion = document.getElementById("descripcion");
    const categoria = document.getElementById("categoria");
    const cantidad = document.getElementById("cantidad");
    const precio = document.getElementById("precio");
    const btnEnviar = document.getElementById("enviar");

    //--render
    let html = "";

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
            })
        });
    }


    //ejecucion de las funciones
    mostrarDatos();


}

init();