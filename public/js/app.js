document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://<TU-DOMINIO-NETLIFY>.netlify.app/.netlify/functions/api/trabajadores';

    // Formulario Crear Trabajador
    document.getElementById('crearForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const cargo = document.getElementById('cargo').value;
        const salario = parseInt(document.getElementById('salario').value);
        const telefono = document.getElementById('telefono').value;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, apellido, cargo, salario, telefono })
            });

            const result = await response.json();
            document.getElementById('crearResult').innerHTML = `
                <div class="success">Trabajador creado con ID: ${result.id}</div>
            `;
            document.getElementById('crearResult').style.display = 'block';
            resetForm('crearForm');
        } catch (error) {
            document.getElementById('crearResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Formulario Actualizar Trabajador
    document.getElementById('actualizarForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('updateId').value;
        const campo = document.getElementById('updateCampo').value;
        const valor = document.getElementById('updateValor').value;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [campo]: valor })
            });

            const result = await response.json();
            document.getElementById('actualizarResult').innerHTML = `
                <div class="success">${result.message}</div>
            `;
            document.getElementById('actualizarResult').style.display = 'block';
            resetForm('actualizarForm');
        } catch (error) {
            document.getElementById('actualizarResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Formulario Eliminar Trabajador
    document.getElementById('eliminarForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('deleteId').value;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            document.getElementById('eliminarResult').innerHTML = `
                <div class="success">${result.message}</div>
            `;
            document.getElementById('eliminarResult').style.display = 'block';
            resetForm('eliminarForm');
        } catch (error) {
            document.getElementById('eliminarResult').innerHTML = `
                <div class="error">Error: ${error.message}</div>
            `;
        }
    });

    // Botón Listar Trabajadores
    document.getElementById('listarBtn').addEventListener('click', async function() {
        try {
            const response = await fetch(`${API_URL}/listar`);
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
            document.getElementById('listarResult').innerHTML = `
                <div class="success">Listado ${trabajadores.length} trabajadores</div>
            `;
            document.getElementById('listarResult').style.display = 'block';
        } catch (error) {
            document.getElementById('listarResult').innerHTML = `
                <div class="error">Error al listar: ${error.message}</div>
            `;
        }
    });

    // Función para reiniciar formularios
    function resetForm(formId) {
        document.getElementById(formId).reset();
    }
});