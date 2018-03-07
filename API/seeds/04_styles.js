const seeder = require('knex-csv-seeder').default
const path = require('path')
const file = path.join('beer_csv/styles.csv')

exports.seed = seeder({
  table: 'styles',
  file: file,
  encoding: 'utf8',
  parser: {
    delimiter: ',',
    quote: '"',
    escape: '\\'
  }
})
