const admin = require('../admin');

class TrabajadoresController {
  async obtenerTrabajador(req, res) {
    try {
      const { id } = req.query;
      const trabajadorDoc = await admin.firestore().collection('trabajadores').doc(id).get();

      if (!trabajadorDoc.exists) {
        return res.status(404).json({ error: 'Trabajador no encontrado' });
      }

      return res.status(200).json(trabajadorDoc.data());
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async crearTrabajador(req, res) {
    try {
      const nuevoTrabajador = req.body;
      const docRef = await admin.firestore().collection('trabajadores').add(nuevoTrabajador);
      return res.status(201).json({ id: docRef.id, message: 'Trabajador creado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async actualizarTrabajador(req, res) {
    try {
      const { id } = req.query;
      const actualizacion = req.body;
      await admin.firestore().collection('trabajadores').doc(id).update(actualizacion);
      return res.status(200).json({ message: 'Trabajador actualizado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async eliminarTrabajador(req, res) {
    try {
      const { id } = req.query;
      await admin.firestore().collection('trabajadores').doc(id).delete();
      return res.status(200).json({ message: 'Trabajador eliminado' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listarTrabajadores(req, res) {
    try {
      const snapshot = await admin.firestore().collection('trabajadores').get();
      const trabajadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(trabajadores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TrabajadoresController();