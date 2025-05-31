document.addEventListener('DOMContentLoaded', function() {
    const API_URL_TRABAJADORES = 'https://<TU-DOMINIO-NETLIFY>.netlify.app/.netlify/functions/api/trabajadores';
    const API_URL_INVENTARIO = 'https://<TU-DOMINIO-NETLIFY>.netlify.app/.netlify/functions/api/inventario';

    // Lógica para manejar formularios de trabajadores
    document.getElementById('crearTrabajadorForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const cargo = document.getElementById('cargo').value;
        const salario = parseInt(document.getElementById('salario').value);
        const telefono = document.getElementById('telefono').value;

        try {
            const response = await fetch(API_URL_TRABAJADORES, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, apellido, cargo, salario, telefono })
            });

            const result = await response.json();
            document.getElementById('crearTrabajadorResult').innerHTML = `
                <div class="success">Trabajador creado con ID: ${result.id}</div>
            `;
            document.getElementById('crearTrabajadorResult').style.display = 'block';
            resetForm('crearTrabajadorForm');
        } catch (error) {
            document.getElementById('crearTrabajadorResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Lógica para actualizar trabajador
    document.getElementById('actualizarTrabajadorForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('updateId').value;
        const campo = document.getElementById('updateCampo').value;
        const valor = document.getElementById('updateValor').value;

        try {
            const response = await fetch(`${API_URL_TRABAJADORES}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [campo]: valor })
            });

            const result = await response.json();
            document.getElementById('actualizarTrabajadorResult').innerHTML = `
                <div class="success">${result.message}</div>
            `;
            document.getElementById('actualizarTrabajadorResult').style.display = 'block';
            resetForm('actualizarTrabajadorForm');
        } catch (error) {
            document.getElementById('actualizarTrabajadorResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Lógica para eliminar trabajador
    document.getElementById('eliminarTrabajadorForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('deleteId').value;

        try {
            const response = await fetch(`${API_URL_TRABAJADORES}/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            document.getElementById('eliminarTrabajadorResult').innerHTML = `
                <div class="success">${result.message}</div>
            `;
            document.getElementById('eliminarTrabajadorResult').style.display = 'block';
            resetForm('eliminarTrabajadorForm');
        } catch (error) {
            document.getElementById('eliminarTrabajadorResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Lógica para listar trabajadores
    document.getElementById('listarTrabajadoresBtn').addEventListener('click', async function() {
        try {
            const response = await fetch(`${API_URL_TRABAJADORES}/listar`);
            const trabajadores = await response.json();

            const tableBody = document.getElementById('trabajadoresBody');
            tableBody.innerHTML = '';

            trabajadores.forEach(trabajador => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${trabajador.id}</td>
                    <td>${trabajador.nombre}</td>
                    <td>${trabajador.apellido}</td>
                    <td>${trabajador.cargo}</td>
                    <td>$${trabajador.salario}</td>
                    <td>${trabajador.telefono}</td>
                `;
                tableBody.appendChild(row);
            });

            document.getElementById('trabajadoresTable').style.display = 'table';
            document.getElementById('listarTrabajadoresResult').innerHTML = `
                <div class="success">Listado ${trabajadores.length} trabajadores</div>
            `;
            document.getElementById('listarTrabajadoresResult').style.display = 'block';
        } catch (error) {
            document.getElementById('listarTrabajadoresResult').innerHTML = `
                <div class="error">Error al listar: ${error.message}</div>
            `;
        }
    });

    // Lógica para manejar formularios de inventario
    document.getElementById('crearProductoForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const productoNombre = document.getElementById('productoNombre').value;
        const productoCantidad = parseInt(document.getElementById('productoCantidad').value);
        const productoPrecio = parseFloat(document.getElementById('productoPrecio').value);

        try {
            const response = await fetch(API_URL_INVENTARIO, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: productoNombre, cantidad: productoCantidad, precio: productoPrecio })
            });

            const result = await response.json();
            document.getElementById('crearProductoResult').innerHTML = `
                <div class="success">Producto creado con ID: ${result.id}</div>
            `;
            document.getElementById('crearProductoResult').style.display = 'block';
            resetForm('crearProductoForm');
        } catch (error) {
            document.getElementById('crearProductoResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Lógica para actualizar producto
    document.getElementById('actualizarProductoForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('productoUpdateId').value;
        const campo = document.getElementById('productoUpdateCampo').value;
        const valor = document.getElementById('productoUpdateValor').value;

        try {
            const response = await fetch(`${API_URL_INVENTARIO}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [campo]: valor })
            });

            const result = await response.json();
            document.getElementById('actualizarProductoResult').innerHTML = `
                <div class="success">${result.message}</div>
            `;
            document.getElementById('actualizarProductoResult').style.display = 'block';
            resetForm('actualizarProductoForm');
        } catch (error) {
            document.getElementById('actualizarProductoResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Lógica para eliminar producto
    document.getElementById('eliminarProductoForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('productoDeleteId').value;

        try {
            const response = await fetch(`${API_URL_INVENTARIO}/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            document.getElementById('eliminarProductoResult').innerHTML = `
                <div class="success">${result.message}</div>
            `;
            document.getElementById('eliminarProductoResult').style.display = 'block';
            resetForm('eliminarProductoForm');
        } catch (error) {
            document.getElementById('eliminarProductoResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Lógica para listar productos
    document.getElementById('listarProductosBtn').addEventListener('click', async function() {
        try {
            const response = await fetch(`${API_URL_INVENTARIO}/listar`);
            const productos = await response.json();

            const tableBody = document.getElementById('productosBody');
            tableBody.innerHTML = '';

            productos.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>$${producto.precio}</td>
                `;
                tableBody.appendChild(row);
            });

            document.getElementById('productosTable').style.display = 'table';
            document.getElementById('listarProductosResult').innerHTML = `
                <div class="success">Listado ${productos.length} productos</div>
            `;
            document.getElementById('listarProductosResult').style.display = 'block';
        } catch (error) {
            document.getElementById('listarProductosResult').innerHTML = `
                <div class="error">Error al listar: ${error.message}</div>
            `;
        }
    });

    // Función para reiniciar formularios
    function resetForm(formId) {
        document.getElementById(formId).reset();
    }
});