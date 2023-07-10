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
  }
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
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
    quitarButton.textContent = 'Quitar';
    quitarButton.addEventListener('click', () => {
      quitarDelCarrito(i);
    });

    li.appendChild(quitarButton);
    carritoElement.appendChild(li);

    total += producto.precio * producto.cantidad;
  }

  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total: $${total}`;
}
