import * as volumeController from '../controllers/volumeController.js'

const volumeRoutes = (app) => {
  app.get('/volumes', volumeController.getAllVolumes)
  app.get('/volumes/:id', volumeController.getVolumesByBookId)
  app.get('/volumes/book/:id', volumeController.getFreeVolumesByBookId)
  app.post('/volumes/:id', volumeController.addVolume)
  app.delete('/volumes/book/:id', volumeController.deleteFreeVolumeByBookId)
}

export default volumeRoutes
