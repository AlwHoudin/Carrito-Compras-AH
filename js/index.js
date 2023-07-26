let productos = [];

fetch('./data/productos.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
    iniciarCarrito();
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

let carrito = [];

function iniciarCarrito() {
  const productContainer = document.getElementById('productos');

  productos.forEach(producto => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('producto');
    productDiv.innerHTML = `
      <div class='card'>
        <h3>${producto.id}</h3>
        <h1>${producto.nombre}</h1>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.precio}</p>
        <input type="number" min="1" value="1" id="cantidad-${producto.id}">
        <button class="agregar-carrito">Agregar al carrito</button>
      </div>
    `;

    productContainer.appendChild(productDiv);

    const addButton = productDiv.querySelector('.agregar-carrito');
    addButton.addEventListener('click', () => {
      const cantidadInput = document.getElementById(`cantidad-${producto.id}`);
      const cantidad = parseInt(cantidadInput.value);
      agregarAlCarrito(producto.id, cantidad);
      console.log(`Se agregaron ${cantidad} ${producto.nombre}(s) al carrito`);
    });
  });

  const vaciarButton = document.getElementById('vaciar');
  vaciarButton.addEventListener('click', vaciarCarrito);

  
  const carritoData = localStorage.getItem('carrito');
  if (carritoData) {
    carrito = JSON.parse(carritoData);
    actualizarCarrito();
  }
}

function agregarAlCarrito(id, cantidad) {
  const producto = productos.find(item => item.id === id);
  if (producto) {
    const carritoItem = carrito.find(item => item.id === id);
    if (carritoItem) {
      carritoItem.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
    }
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }
}

function quitarDelCarrito(index) {
  if (index >= 0 && index < carrito.length) {
    const producto = carrito[index];
    producto.cantidad -= 1;
    if (producto.cantidad === 0) {
      carrito.splice(index, 1);
    }
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  guardarCarritoEnLocalStorage();
}

function actualizarCarrito() {
  const carritoElement = document.getElementById('items');
  carritoElement.innerHTML = '';

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}`;

    const quitarButton = document.createElement('button');
    quitarButton.textContent = '-';
    quitarButton.addEventListener('click', () => {
      quitarDelCarrito(i);
    });

    const agregarButton = document.createElement('button');
    agregarButton.textContent = '+';
    agregarButton.addEventListener('click', () => {
      agregarAlCarrito(producto.id, 1);
    });

    li.appendChild(quitarButton);
    li.appendChild(agregarButton);
    carritoElement.appendChild(li);

    total += producto.precio * producto.cantidad;
  }

  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total: $${total}`;
}

const pagarButton = document.getElementById('pagar');
pagarButton.addEventListener('click', mostrarModal);

function mostrarModal() {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.innerHTML = `
    <h2>¡Gracias por tu compra!</h2>
    <!-- Puedes agregar más contenido al modal si lo deseas -->
    <button class="modal-close" onclick="ocultarModal()">Cerrar</button>
  `;

  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);
}

function ocultarModal() {
  const modalContainer = document.querySelector('.modal-container');
  if (modalContainer) {
    document.body.removeChild(modalContainer);
  }
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
