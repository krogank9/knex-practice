require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function searchItemsByName(searchTerm) {
    knexInstance
      .select('id', 'name', 'price', 'category', 'checked', 'date_added')
      .from('shopping_list')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
  }

  function paginateItems(page) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (page - 1)
    knexInstance
      .select('id', 'name', 'price', 'category', 'checked', 'date_added')
      .from('shopping_list')
      .limit(itemsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
  }

  function getItemsAddedAfter(daysAgo) {
    knexInstance
     .select('id', 'name', 'price', 'category', 'checked', 'date_added')
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
      )
      .from('shopping_list')
      .orderBy([
        { column: 'date_added', order: 'ASC' },
      ])
      .then(result => {
        console.log(result)
      })
  }

  function getCategoryPrices() {
    knexInstance
      .select('category')
      .from('shopping_list')
      .sum('price AS total')
      .groupBy('category')
      .then(result =>  {
        console.log("COST PER CATEGORY");
        console.log(result);
      })
  }
  
//  getItemsAddedAfter(5)
  
  getCategoryPrices()
  
//  paginateItems(2)
  
//  searchItemsByName('sal')