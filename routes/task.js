const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
//   editTask,
} = require('../controllers/task')

router.get('/',getAllTasks)
router.get('/:id',getTask)
router.post('/',createTask)

router.delete('/:id',deleteTask)
router.patch('/:id',updateTask)

// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
