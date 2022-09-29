// Segunda entrega - carrito tienda de ebooks 

class Libro {
    constructor(titulo, autor, genero, isbn, precio, tapa, cantidad) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.isbn = parseInt(isbn);
        this.precio = parseFloat(precio);
        this.tapa = tapa;
        this.cantidad = parseInt(cantidad);
    }
}

const stockLibros = [];

const misery = new Libro("Misery", "Stephen King", "terror", 9788466345262, 299.99, "misery.jpg", 1);
const elResplandor = new Libro("El resplandor", "Stephen King", "terror", 9788499899275, 349.99, "resplandor.jpg", 1);
const elAmorEn = new Libro("El amor en los tiempos del cólera", "Gabriel García Márquez", "realismo mágico", 9788439735625, 499.99, "colera.jpg", 1);
const cienAnios = new Libro("Cien años de soledad", "Gabriel García Márquez", "realismo mágico", 9788439732471, 549.99, "soledad.jpg", 1);
const muerteAnunciada = new Libro("Crónica de una muerte anunciada", "Gabriel García Márquez", "realismo mágico", 9500726076, 299.99, "anunciada.jpg", 1);

stockLibros.push(misery);
stockLibros.push(elResplandor);
stockLibros.push(elAmorEn);
stockLibros.push(cienAnios);
stockLibros.push(muerteAnunciada);


// Array carrito

const carrito = [];


// Sección productos 

const lanzamientos = document.getElementById("lanzamientos");

stockLibros.forEach(libro => {
    let section = document.createElement("section");
    section.innerHTML = `<div class="card" style="width: 15rem; height: 31.5rem;">
                        <img src="./img/${libro.tapa}" class="card-img-top" alt="Tapa del libro ${libro.titulo}">
                        <div class="card-body">
                              <h5 class="card-titulo">${libro.titulo}</h5>
                              <div class="card-texto">      
                                 <p class="card-parrafo">${libro.autor}</p>
                                <p class="card-parrafo">$${libro.precio}</p>
                              </div>
                            <div class="position-absolute bottom-0 end-0 mb-3 me-3">
                                <button class="btn btn-sm boton" id="boton${libro.titulo}"><i class="bi bi-cart-plus"></i> Agregar</button>
                            </div>
                        </div>
                        </div>`;

    lanzamientos.appendChild(section);

    const boton = document.getElementById(`boton${libro.titulo}`);
    boton.addEventListener("click", () => {
        agregarLibro(libro.titulo);
        actualizarCarrito();
    })
});


// Función agregar al carrito

const agregarLibro = (titulo) => {
    const libro = stockLibros.find(libro => libro.titulo === titulo);
    const libroAgregado = carrito.find(libro => libro.titulo === titulo);
    if (libroAgregado) {
        libroAgregado.cantidad++;
    } else {
        carrito.push(libro);
    }
    actualizarCarrito();
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
                <div class="card m-3" style="max-width: 540px;">
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
                            </div>

                            <div>
                                <button onClick = "eliminarLibro(${libro.titulo})" class="btn btn-sm boton"><i class="bi bi-trash3"></i> Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

                `
    })
    divCarrito.innerHTML = aux;
    calcularPrecioTotal();
};



// Eliminar del carrito 

const eliminarLibro = (titulo) => {
    const libro = carrito.find(libro => libro.titulo === titulo);
    carrito.splice(carrito.indexOf(libro), 1);
    actualizarCarrito();
};



// Eliminar todos 
const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    carrito.splice(0, carrito.length);
    actualizarCarrito();
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