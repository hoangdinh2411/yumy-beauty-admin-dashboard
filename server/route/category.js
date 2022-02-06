import express from 'express'
import categoryController from '../controllers/category.js'
const route = express.Router()

route.post('/', categoryController.create )
route.get('/', categoryController.getCategories )
route.patch('/:id', categoryController.update )
route.delete('/:id', categoryController.delete )

export default route