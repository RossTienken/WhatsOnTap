let express = require('express')
let router = express.Router()
let knex = require('../knex')

function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const capitalized = str => {
  return str.replace(/\w\S*/g, (txt)=> {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

/* GET all beers */
router.get('/', function(req, res, next){
  knex('beers')
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})

/* GET beer based on Name */
router.get('/:name', function(req, res, next){
  let name = req.params.name
  knex('beers')
  .where('name', capitalized(name))
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})

module.exports = router
