const msgModel = require('../models/message.model')
const userModel = require('../models/user.model')
const { normalize, schema, denormalize } = require('normalizr')
const util = require('util')

exports.CreateMessage = async (req, res) => {
    try {

        const newMsg = await msgModel(req.body)
        await newMsg.save()
        res.status(201).redirect('/api/productos-test')

    } catch (error) {
        console.log('error', error)
    }
}

exports.GetAllMessage = async (req, res) => {
    try {

        const usuarioCookie = req.session.passport.user
        console.log('usuarioCookie', usuarioCookie)
        const user = await userModel.findOne({ _id: usuarioCookie })
        console.log('usuarioCookie', user)
        if (!user) {
            res.redirect('/api/users')
        } else {
            const allMessages = await msgModel.find().select('-_id -__v')

            const data = {
                id: '999',
                mensajes: [allMessages]
            }

            const SchemaAuthor = new schema.Entity('author')
            const SchemaText = new schema.Entity('text')

            const SchemaFinal = new schema.Entity('posts', {
                author: SchemaAuthor,
                text: SchemaText
            })

            const normalizrAuthor = normalize(data, SchemaFinal)

            let porcentaje = (Object.keys(normalizrAuthor).length / Object.keys(data).length) * 100
            console.log(`compresion de los mensajes al: ${porcentaje}%`)

            res.render('products', { message: allMessages.reverse(), data: porcentaje, info: user })

        }

    } catch (error) {
        console.log('error', error)
    }
}
