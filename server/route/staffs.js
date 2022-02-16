import express from 'express';
import staffsController from '../controllers/staffs.js'
const route = express.Router();

route.get('/', staffsController.getAll)
route.post('/', staffsController.create)
route.patch('/:id', staffsController.update)
route.delete('/:id', staffsController.delete)

export default route