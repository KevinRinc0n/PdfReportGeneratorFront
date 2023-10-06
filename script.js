// document.getElementById("btnDescargar").addEventListener("click", function () {
//     var inputPrueb = document.querySelector('.inputPrueba').value; 
//     fetch('http://localhost:5191/Tienda/Categoria', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             Nombre: inputPrueb 
//         })
//     })
//     .then(response => response.blob()) 
//     .then(blob => {
//         var url = window.URL.createObjectURL(blob);
//         var a = document.createElement('a');
//         a.href = url;
//         a.download = 'reporte.pdf';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//     })
//     .catch(error => console.error('Error al descargar el PDF:', error));
// });

const selectCliente = document.getElementById("selectCliente");
const selectCategoria = document.getElementById("selectCategoria");
const contenedorProductos = document.getElementById("tableProductoBody");
const contenedorProductosParaAceptar = document.getElementById("tableProducAceptarBody");
const btnDescargar = document.getElementById("descargar");
const total = document.getElementById("total");
const botonAgregar = document.getElementById("agregarBtn");

async function cargarClientesYCategorias() {
    const respuestaCliente = await fetch("http://localhost:5191/Tienda/Cliente"); 
    const clientes = await respuestaCliente.json();

    clientes.forEach((cliente) => {
        const opcion = document.createElement("option");
        opcion.value = cliente.id;
        opcion.text = cliente.nombre + " " + cliente.apellido;
        selectCliente.appendChild(opcion);
    });

    const respuestaCategoria = await fetch("http://localhost:5191/Tienda/Categoria"); 
    const categorias = await respuestaCategoria.json();

    categorias.forEach((categoria) => {
        const opcion = document.createElement("option");
        opcion.value = categoria.id;
        opcion.text = categoria.nombre;
        selectCategoria.appendChild(opcion);
    });
}

async function productosXCategoria(categoriaId) {
    const respuesta = await fetch(`http://localhost:5191/Tienda/Producto?IdCategoriaFk=${categoriaId}`); 
    const productos = await respuesta.json();
    mostrarProductosAceptar(productos);
}

function mostrarProductosAceptar(productos) {
    let listar = "";
    productos.forEach((producto) => {
        listar += `
        <tr>
            <th scope="row">${producto.nombre}</th>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.idCategoriaFk}</td>
            <td><button type="button" class="btn btn-warning" id="agregarBtn">Agregar</button></td>
        </tr>
        `;
    });
    contenedorProductosParaAceptar.innerHTML = listar;
}

function mostrarProductos(productos) {
    let listar = "";
    productos.forEach((producto) => {
        listar += `
        <tr>
            <th scope="row">${producto.nombre}</th>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.idCategoriaFk}</td>
            <td>${producto.precio * producto.cantidad}</td>
        </tr>
        `;
    });
    contenedorProductos.innerHTML = listar;
}

// botonAgregar.addEventListener("click", () =>{
//     mostrarProductos(producto.id);
// });

// total = //falta hacer

selectCategoria.addEventListener("change", () => {
    const categoriaId = selectCategoria.value;
    productosXCategoria(categoriaId);
});

const confirmarCompra = document.getElementById("compraConfirm");
confirmarCompra.addEventListener("click", () => {
    btnDescargar.style.display = "flex";
});

cargarClientesYCategorias(); 