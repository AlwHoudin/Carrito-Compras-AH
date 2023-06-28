
const productos = [
    { id: 1, nombre: 'Pantalón', precio: 10 },
    { id: 2, nombre: 'Remera', precio: 15 },
    { id: 3, nombre: 'Camisa', precio: 20 }
  ];
  
  let carrito = [];
  
  function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === id);
    if (producto) {
      carrito.push(producto);
      actualizarCarrito();
    }
  }
  
  function quitarDelCarrito(index) {
    if (index >= 0 && index < carrito.length) {
      carrito.splice(index, 1);
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
      li.textContent = `${producto.nombre} - $${producto.precio}`;
  
      const quitarButton = document.createElement('button');
      quitarButton.textContent = 'Quitar';
      quitarButton.addEventListener('click', () => {
        quitarDelCarrito(i);
      });
  
      li.appendChild(quitarButton);
      carritoElement.appendChild(li);
  
      total += producto.precio;
    }
  
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${total}`;
  }
  
  const productContainer = document.getElementById('productos');
  
  productos.forEach(producto => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('producto');
    //innerHTML
    productDiv.innerHTML = `
      <div class='card'>
        <h3>${producto.id}</h3>
        <h1>${producto.nombre}</h1>
        <p>${producto.precio}</p>
        <button class="agregar-carrito">Agregar al carrito</button>
      </div>
    `;
  
    productContainer.appendChild(productDiv);
  
    const addButton = productDiv.querySelector('.agregar-carrito');
    addButton.addEventListener('click', () => {
      agregarAlCarrito(producto.id);
      console.log('Se agrego al carrito', producto);
    });
  });
  
  const vaciarButton = document.getElementById('vaciar');
  vaciarButton.addEventListener('click', vaciarCarrito);
  