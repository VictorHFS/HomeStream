let controller = require('./controller/cast-controller')
let router = require('express').Router()


router.get('/', controller.get)