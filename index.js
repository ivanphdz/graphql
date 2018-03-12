const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./schema')
require('./db/setup')

const app = express()

app.use('/graphql',
	bodyParser.json(),
	graphqlExpress({ schema: schema })
)

app.use(
	'/graphiql',
	graphiqlExpress({
		endpointURL: '/graphql'
	})
)

const PORT = 5555
app.listen(PORT, () => {
	console.log('Servidor corriendo OK')
})