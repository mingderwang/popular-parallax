const { test } = require('tap')

const buildApp = require('./app')

test('A user with the `admin` role should be able to retrieve the `totalRevenue` field without inline fragments', async t => {
  const app = await buildApp()
  const res = await doQuery(app, 'admin', `
    query {
      searchData {
        totalRevenue
      }
    }
  `)

  t.same(res.data.searchData, { totalRevenue: 42 })
})

// TODO: add the other tests

async function doQuery (app, userType, query) {
  const res = await app.inject({
    method: 'POST',
    url: '/graphql',
    headers: {
      'x-user-type': userType
    },
    body: {
      query
    }
  })

  return res.json()
}
