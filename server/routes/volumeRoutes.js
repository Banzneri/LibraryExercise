import * as volumeQueries from '../queries/volumeQueries.js'

const volumeRoutes = (app) => {
  app.get('/volumes', volumeQueries.getAllVolumes)
  app.get('/volumes/:id', volumeQueries.getVolumesByBookId)
  app.post('/volumes/:id', volumeQueries.addVolume)
}

export default volumeRoutes
