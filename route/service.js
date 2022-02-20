import express from 'express'
import serviceController from '../controllers/service.js'
const route = express.Router()

route.post('/', serviceController.addNewService )
route.get('/', serviceController.getServices )
route.delete('/:id', serviceController.delete )
route.patch('/:id', serviceController.update )

export default route