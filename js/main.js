// Imagen pop up
/*setTimeout(() => {
    Swal.fire({
        title: '¡Bienvenid@ a eBooks!',
        text: '¡Llevá las mejores historias con vos a donde vayas!',
        imageUrl: './img/alert.jpg',
        imageAlt: '',
        buttonsStyling: 'false',
        confirmButtonColor: 'hotpink',
    });
}, 2500);*/

// Catalogo de productos
const lanzamientos = document.getElementById("lanzamientos");

const stockDeLibros = "json/libros.json";
let stockLibros 
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


fetch(stockDeLibros)
    .then(respuesta => respuesta.json())
    .then(libros => {
        stockLibros = libros
        stockLibros.forEach(libro => {
            const section = document.createElement("section");
            section.innerHTML += `<div class="card my-3" style="width: 15rem; height: 31.5rem;">
            <img src="./img/${libro.tapa}" class="card-img-top" alt="Tapa del libro ${libro.titulo}">
            <div class="card-body">
                  <h5 class="card-titulo">${libro.titulo}</h5>
                  <div class="card-texto">      
                     <p class="card-parrafo">${libro.autor}</p>
                    <p class="card-parrafo">$${libro.precio}</p>
                  </div>
                <div class="position-absolute bottom-0 end-0 mb-3 me-3">
                    <button class="btn btn-sm boton" id="boton${libro.id}"><i class="bi bi-cart-plus"></i> Agregar</button>
                </div>
            </div>
            </div>`;

            lanzamientos.appendChild(section);

            const boton = document.getElementById(`boton${libro.id}`);
            boton.addEventListener("click", () => {
                Toastify({
                    text: `${libro.titulo} fue añadido al carrito`,
                    duration: 2500,
                    style: {
                        background: "rgba(221, 36, 41, 0.9)",
                    },
                }).showToast();

                agregarLibro(libro.id);
                actualizarCarrito();
            })
        })
    });

    
// Función agregar al carrito

const agregarLibro = (titulo) => {
    const libro = stockLibros.find(libro => libro.id === titulo);
    const libroAgregado = carrito.find(libro => libro.id === titulo);

    libroAgregado ? libroAgregado.cantidad++ : carrito.push(libro);
    actualizarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
};


// botón carrito 
const divCarrito = document.getElementById("divCarrito");
const mostrarCarrito = document.getElementById("mostrarCarrito");

mostrarCarrito.addEventListener("click", actualizarCarrito);


// función actualizar carrito

function actualizarCarrito() {
    let aux = "";
    carrito.forEach(libro => {
        aux += `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="./img/${libro.tapa}" class="img-fluid rounded-start" alt="Tapa del libro ${libro.titulo}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-titulo">${libro.titulo} - ${libro.autor}</h5>
                                <div class="card-texto">
                                    <p class="card-parrafo">Cantidad: ${libro.cantidad}</p>
                                    <p class="card-parrafo">$${libro.precio}</p> 
                                </div>
                                <div class="text-end">
                                    <button onClick = "eliminarLibro(${libro.id})" class="btn btn-sm boton"><i class="bi bi-trash3"></i> Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                `
    })
    divCarrito.innerHTML = aux;
    calcularPrecioTotal();

    localStorage.getItem("carrito", JSON.stringify(carrito));

};


// Eliminar del carrito 

const eliminarLibro = (id) => {
    const libro = carrito.find(libro => libro.id === id);
    const libroAEliminar = carrito.find(libro => libro.id === id);
    libroAEliminar.cantidad >= 2 ? libroAEliminar.cantidad-- :
        carrito.splice(carrito.indexOf(libro), 1);

    Toastify({
        text: `${libro.titulo} fue eliminado`,
        duration: 1500,
        style: {
            background: "rgba(221, 36, 41, 0.8)",
        },
    }).showToast();

    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


// Eliminar todos 
const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    carrito.splice(0, carrito.length);
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
});


// total 
const precioTotal = document.getElementById("precioTotal");

const calcularPrecioTotal = () => {
    let total = 0;
    carrito.forEach(libro => {
        total += libro.precio * libro.cantidad;
    });
    precioTotal.innerHTML = total.toFixed(2);
}
