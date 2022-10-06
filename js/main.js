// Avance desafío - carrito tienda de ebooks 

class Libro {
    constructor(id, titulo, autor, genero, isbn, precio, tapa, cantidad) {
        this.id = parseInt(id);
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

const misery = new Libro(1, "Misery", "Stephen King", "terror", 9788466345262, 299.99, "misery.jpg", 1);
const elResplandor = new Libro(2, "El resplandor", "Stephen King", "terror", 9788499899275, 349.99, "resplandor.jpg", 1);
const elAmorEn = new Libro(3, "El amor en los tiempos del cólera", "Gabriel García Márquez", "realismo mágico", 9788439735625, 499.99, "colera.jpg", 1);
const cienAnios = new Libro(4, "Cien años de soledad", "Gabriel García Márquez", "realismo mágico", 9788439732471, 549.99, "soledad.jpg", 1);
const muerteAnunciada = new Libro(5, "Crónica de una muerte anunciada", "Gabriel García Márquez", "realismo mágico", 9500726076, 299.99, "anunciada.jpg", 1);
const ladronaLibros = new Libro(6, "La ladrona de libros", "Markus Zusak", "novela histórica", 9788426419866, 399.99, "ladronaLibros.jpg", 1);
const mapaAnhelos = new Libro(7, "El mapa de los anhelos", "Alice Kellen", "novela contemporánea", 9788408258254, 899.99, "mapaAnhelos.jpg", 1);
const sherlock = new Libro(8, "Sherlock Holmes", "Sir Arthur Conan Doyle", "policial", 9788491054672, 749.99, "sherlock.jpg", 1);
const orgullo = new Libro(9, "Orgullo y prejuicio", "Jane Austen", "clásicos", 9788491059981, 249.99, "orgullo.jpg", 1);
const lasVentajas = new Libro(10, "Las ventajas de ser invisible", "Stephen Chbosky", "juvenil", 9786071132413, 64.00, "lasVentajas.jpg", 1);


stockLibros.push(misery);
stockLibros.push(elResplandor);
stockLibros.push(elAmorEn);
stockLibros.push(cienAnios);
stockLibros.push(muerteAnunciada);
stockLibros.push(ladronaLibros);
stockLibros.push(mapaAnhelos);
stockLibros.push(sherlock);
stockLibros.push(orgullo);
stockLibros.push(lasVentajas);


// Array carrito

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Sección productos 

const lanzamientos = document.getElementById("lanzamientos");

stockLibros.forEach(libro => {
    let section = document.createElement("section");
    section.innerHTML = `<div class="card my-3" style="width: 15rem; height: 31.5rem;">
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
        Toastify({
            text: "El libro fue agregado al carrito",
            duration: 2500,
            style: {
                background: "rgba(221, 36, 41, 0.9)",
            },
        }).showToast();

        agregarLibro(libro.titulo);
        actualizarCarrito();
    })
});


// Función agregar al carrito

const agregarLibro = (titulo) => {
    const libro = stockLibros.find(libro => libro.titulo === titulo);
    const libroAgregado = carrito.find(libro => libro.titulo === titulo);

    libroAgregado ? libroAgregado.cantidad++ : carrito.push(libro);
    actualizarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
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
        text: "Libro eliminado",
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


