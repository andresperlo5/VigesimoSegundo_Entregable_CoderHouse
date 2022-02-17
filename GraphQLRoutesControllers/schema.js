const { buildSchema } = require('graphql')

const schemaUserMsg = buildSchema(`
    type Usuario {
        id: Int,
        name: String, 
        lastname: String, 
        age: String, 
        celphone: String
    }

    type Mensaje {
        id: Int,
        name: String,
        lastname: String
        age: String
        alias:String
        avatar: String
        text:String
    }

    type Query {
        usuarios:[Usuario]
        usuario(id:Int) : Usuario
        mensajes:[Mensaje]
        mensaje(id:Int) : Mensaje
    }

    type Mutation {
        createUser(name:String, lastname:String, age:String, celphone:String) : Usuario
        modifyUser(id: Int, name:String, lastname:String, age:String, celphone:String): Usuario
        deleteUser(id: Int): Usuario
    }
    
`)

module.exports = schemaUserMsg