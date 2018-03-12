const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
	union ResultadoBusqueda = Curso | Profesor

	type Curso {
		id: ID!
		titulo: String!
		descripcion: String
		profesor: Profesor
		rating: Float
		comentarios: [Comentario]
	}

	type Profesor {
		id: ID!
		nombre: String!
		nacionalidad: String!
		genero: Genero
		cursos: [Curso]
	}

	enum Genero {
		MASCULINO
		FEMININO
	}

	type Comentario {
		id: ID!
		nombre: String!
		cuerpo: String!
	}

	type Query {
		cursos: [Curso]
		profesores: [Profesor]
		curso(id: Int): Curso
		profesor(id: Int): Profesor
		buscar(query: String): [ResultadoBusqueda]
	}

	type Mutation {
		profesorAdd(profesor: NuevoProfesor): Profesor
		profesorEdit(profesorId: Int!, profesor: ProfesorEditable): Profesor
		profesorDelete(profesorId: Int!): Profesor
		cursoAdd(curso: NuevoCurso): Curso
		cursoEdit(cursoId: Int!, curso: CursoEditable): Curso
		cursoDelete(cursoId: Int!): Curso
	}


	input NuevoProfesor{
		nombre: String!
		genero: Genero
		nacionalidad: String!
	}

	input ProfesorEditable{
		nombre: String
		genero: Genero
		nacionalidad: String
	}

	input NuevoCurso{
		titulo: String!
		descripcion: String
		rating: Float
	}

	input CursoEditable{
		titulo: String!
		descripcion: String
		rating: Float
	}
`

const schema = makeExecutableSchema({
	typeDefs: typeDefs,
	resolverValidationOptions: { requireResolversForAllFields: true },
	resolvers: resolvers
})



module.exports = schema