const express = require('express')
const router = express.Router()
const { listApis, createApi, putApi, removeApi } = require('../../controllers/apiController')

router.get('/', listApis)
router.post('/', createApi)
router.put('/:id', putApi)
router.delete('/:id', removeApi)

module.exports = router
