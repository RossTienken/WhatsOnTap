let express = require('express')
let router = express.Router()
let knex = require('../knex')

/* GET all breweries */
router.get('/', function(req, res, next){
  knex('breweries')
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})

/* GET brewery by id*/
router.get('/:id', function(req, res, next){
  let id = req.params.id
  knex('breweries')
  .where('id', id)
  .then(data=>{
    res.send(data[0])
  })
  .catch(error=>{
    res.send(error)
  })
})

module.exports = router
