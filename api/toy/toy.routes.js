const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware.js')
const { getToys, removeToy, addToy, getToyById, updateToy } = require('./toy.controller.js')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/:id', getToyById)
router.post('/', addToy)
router.put('/:id', updateToy)
router.delete('/:id', removeToy)

module.exports = router