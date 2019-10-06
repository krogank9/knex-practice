const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe.only(`Shopping List service object`, function () {

    let db

    let testItems = [
        {
            id: 1,
            name: "Fish tricks",
            price: "14.00",
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: "Main"
        },
        {
            id: 2,
            name: "Not Dogs",
            price: "4.99",
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            checked: true,
            category: "Snack"
        },
        {
            id: 3,
            name: "Bluffalo Wings",
            price: "5.50",
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            checked: false,
            category: "Snack"
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    after(() => db.destroy())

    before(() => db('shopping_list').truncate())
    afterEach(() => db('shopping_list').truncate())

    context(`Given 'shopping list' has data`, () => {

        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })

        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            // test that ShoppingListService.getAllItems gets data from table
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })


        it(`getById() resolves an article by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestItem = testItems[thirdId - 1]
            return ShoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        date_added: thirdTestItem.date_added,
                        checked: thirdTestItem.checked,
                        category: thirdTestItem.category
                    })
                })
        })

        it(`deleteItem() removes an article by id from 'shopping_list' table`, () => {
            const articleId = 3
            return ShoppingListService.deleteItem(db, articleId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    // copy the test items array without the "deleted" item
                    const expected = testItems.filter(article => article.id !== articleId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an article from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                name: 'updated name',
                price: '0.99',
                date_added: new Date(),
                checked: false,
                category: "Snack"
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(article => {
                    expect(article).to.eql({
                        id: idOfItemToUpdate,
                        ...newItemData,
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertItem() inserts a new article and resolves the new article with an 'id'`, () => {
            const newItem = {
                name: 'new name',
                price: '2.99',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: true,
                category: "Main"
            }
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: newItem.checked,
                        category: newItem.category
                    })
                })
        })
    })
})