const admin = require('../admin');

class InventarioController {
  async obtenerProducto(req, res) {
    try {
      const { id } = req.query;
      const productDoc = await admin.database().ref(`inventario/${id}`).once('value');
      if (!productDoc.exists()) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      return res.status(200).json(productDoc.val());
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async crearProducto(req, res) {
    try {
      const nuevoProducto = req.body;
      const ref = await admin.database().ref('inventario').push(nuevoProducto);
      return res.status(201).json({ id: ref.key, message: 'Producto creado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async actualizarProducto(req, res) {
    try {
      const { id } = req.query;
      const actualizacion = req.body;
      await admin.database().ref(`inventario/${id}`).update(actualizacion);
      return res.status(200).json({ message: 'Producto actualizado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async eliminarProducto(req, res) {
    try {
      const { id } = req.query;
      await admin.database().ref(`inventario/${id}`).remove();
      return res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listarProductos(req, res) {
    try {
      const snapshot = await admin.database().ref('inventario').once('value');
      const productos = [];
      snapshot.forEach((childSnapshot) => {
        productos.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return res.status(200).json(productos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new InventarioController();