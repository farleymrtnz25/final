const admin = require('../admin');

class TrabajadoresController {
  async obtenerTrabajador(req, res) {
    try {
      const { id } = req.query;
      const trabajadorDoc = await admin.database().ref(`trabajadores/${id}`).once('value');
      if (!trabajadorDoc.exists()) {
        return res.status(404).json({ error: 'Trabajador no encontrado' });
      }
      return res.status(200).json(trabajadorDoc.val());
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async crearTrabajador(req, res) {
    try {
      const nuevoTrabajador = req.body;
      const ref = await admin.database().ref('trabajadores').push(nuevoTrabajador);
      return res.status(201).json({ id: ref.key, message: 'Trabajador creado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async actualizarTrabajador(req, res) {
    try {
      const { id } = req.query;
      const actualizacion = req.body;
      await admin.database().ref(`trabajadores/${id}`).update(actualizacion);
      return res.status(200).json({ message: 'Trabajador actualizado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async eliminarTrabajador(req, res) {
    try {
      const { id } = req.query;
      await admin.database().ref(`trabajadores/${id}`).remove();
      return res.status(200).json({ message: 'Trabajador eliminado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listarTrabajadores(req, res) {
    try {
      const snapshot = await admin.database().ref('trabajadores').once('value');
      const trabajadores = [];
      snapshot.forEach((childSnapshot) => {
        trabajadores.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return res.status(200).json(trabajadores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TrabajadoresController();