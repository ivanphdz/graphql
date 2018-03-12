const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')
const resolvers = {
	Query: {
		cursos: () => Curso.query().eager('[profesor, comentarios]'),
		profesores: () => Profesor.query().eager('cursos'),
		curso: (rootValue, {id}) => Curso.query().eager('[profesor, comentarios]').findById(id),
		profesor: (rootValue, {id}) => Profesor.query().eager('cursos').findById(id),
		buscar: (rootValue, args) => {
			return [
				Curso.query().findById(1),
				Profesor.query().findById(1)
			]
		}
	},
	Mutation: {
		profesorAdd: (_, args) => {
			return Profesor.query().insert(args.profesor)
		},
		profesorEdit: (_, args) => {
			return Profesor.query().patchAndFetchById(args.profesorId, args.profesor)
		},
		profesorDelete: (_, args) => {
			return Profesor.query().findById(args.profesorId).then((profesor) => {
				return Profesor.query().deleteById(args.profesorId).then((filasBorradas) => {
					 if(filasBorradas > 0) return profesor
					 throw new Error (`El profesor con id {args.profesorId} no se encuentra`)
				})
			})
		},
		cursoAdd: (_, args) => {
			return Curso.query().insert(args.curso)
		},
		cursoEdit: (_, args) => {
			return Curso.query().patchAndFetchById(args.cursoId, args.curso)
		},
		cursoDelete: (_, args) => {
			return Curso.query().findById(args.cursoId).then((curso) => {
				return Curso.query().deleteById(args.cursoId).then(() => {
					return curso
				})
			})
		}
	},
	ResultadoBusqueda: {
			__resolveType: (obj) => {
				if(obj.nombre) return 'Profesor'
					return 'Curso'
			}
		}
}

module.exports = resolvers