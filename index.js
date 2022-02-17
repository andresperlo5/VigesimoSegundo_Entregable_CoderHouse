require('dotenv').config()
require('./dbMongoAtlas')

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const morgan = require('morgan')
const routerRoutes = require('./routes/index.routes')
const ArrayProducts = require('./products/products.Array')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const opcionesMongoose = { useNewUrlParser: true, useUnifiedTopology: true }

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const userModel = require('./models/user.model')
const bcryptjs = require('bcryptjs')

const cluster = require('cluster')
const { cpus } = require('os')

const options = { default: { puerto: 8080 } }
const minimist = require('minimist')(process.argv.splice(2), options)
console.log('minimist', minimist)
delete minimist['_']
const PortMinimist = minimist.puerto
console.log('PortMinimist', PortMinimist)

const { graphqlHTTP } = require('express-graphql')
const schemaUserMsg = require('./GraphQLRoutesControllers/schema')
const routeAndcontrollersUsers = require('./GraphQLRoutesControllers/routes&controllersUsers')
const routeAndcontrollersMsg = require('./GraphQLRoutesControllers/routes&controllersMsg')

app.use('/graphql', graphqlHTTP({
    schema: schemaUserMsg,
    root: routeAndcontrollersUsers,
    graphiql: true
}))

app.use(session({

    store: MongoStore.create({
        mongoUrl: process.env.mongodb,
        mongoOptions: opcionesMongoose
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())
app.use(passport.session())

//Login PassPort
passport.use('local-login', new LocalStrategy(async (username, password, done) => {

    const user = await userModel.findOne({ username })

    if (user) {

        const passCheck = await bcryptjs.compare(password, user.password);

        if (passCheck) {
            done(null, user)
            return
        }
    }

    done(null, false)

}))

//Register PassPort
passport.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log('entra a Register PassPort')
    const user = await userModel.findOne({ username })
    console.log('userRegister', user)
    if (user) {
        console.log('usuario existe')
        return done(null, false)
    }

    const salt = await bcryptjs.genSalt(10);
    password = await bcryptjs.hash(password, salt);

    const userCreate = new userModel({ username, password });
    console.log('userCreate', userCreate)
    userCreate.save()

    done(null, userCreate)

}))

//Serializar
passport.serializeUser((user, done) => {
    console.log('user', user.id)
    done(null, user.id)
})
//Deserealizar
passport.deserializeUser((id, done) => {
    console.log('entro a deseRializar')
    console.log('id deseRializar', id)

    let user = userModel.findOne({ id })
    console.log('user deseRializar', user)

    done(null, user)
})

app.use('/api', routerRoutes)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

const msn = [];
const table = ArrayProducts;

io.on("connection", (socket) => {
    console.log("Usuario Conectado!");

    socket.emit("message_back", msn);
    socket.emit("message_back_table", table);
    socket.on("message_client", (data) => {
        console.log(data);
    });

    socket.on("message_client_table", (data) => {
        console.log(data);
    });

    socket.on("data_client", (data) => {
        msn.push(data);
        msn.reverse()
        /* socket.emit("message_back", msn); */
        io.sockets.emit("message_back", msn)
    });

    socket.on("data_client_table", (data) => {
        console.log('se ingresa a la table');
        table.push(data);
        /* socket.emit("message_back", msn); */
        io.sockets.emit("message_back_table", table)
    });
});

//puerto se ejecuta en consola (minimist)
server.listen(PortMinimist, () => {
    console.log('Servidor Andando en el puerto: ', PortMinimist);
})
