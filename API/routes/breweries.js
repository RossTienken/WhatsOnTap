let express = require('express')
let router = express.Router()
let knex = require('../knex')

/* GET all breweries */
router.get('/', function(req, res, next){
  knex('breweries')
  .select('*')
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})

module.exports = router
