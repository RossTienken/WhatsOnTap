const seeder = require('knex-csv-seeder').default
const path = require('path')
const file = path.join('beer_csv/breweries.csv')

exports.seed = seeder({
  table: 'breweries',
  file: file,
  encoding: 'utf8',
  parser: {
    delimiter: ',',
    quote: '"',
    escape: '\\'
  }
})
