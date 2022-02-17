const userModel = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const passport = require('passport')

exports.RegisterUSer = async (req, res) => {
    try {

        let { usuario, contrasenia } = req.body

        const userExists = await userModel.findOne({ usuario })

        if (!userExists) {

            const salt = await bcryptjs.genSalt(10);
            contrasenia = await bcryptjs.hash(contrasenia, salt);

            const userCreate = new userModel({ usuario, contrasenia });

            userCreate.save()
            res.status(201).render('registerSuccess', {})
        } else {
            res.status(400).render('userExists', {})
        }

    } catch (error) {
        console.log('Error', error)
    }
}

exports.LoginUSer = () => {
    try {

        console.log('entro a login')

    /*     const { usuario, contrasenia } = req.body

        const userExists = await userModel.findOne({ usuario })

        if (!userExists) {
            res.status(400).render('errorCredentials', {})
        }

        const passCheck = await bcryptjs.compare(contrasenia, userExists.contrasenia);

        if (!passCheck) {
            res.status(400).render('errorCredentials', {})
        }

        userExists.save()

        const usuarioCookie = (req.session.usuario = usuario)
        const contraseniaCookie = (req.session.contrasenia = contrasenia)

        console.log('usuarioCookie', usuarioCookie)
        console.log('contraseniaCookie', contraseniaCookie)

        res.status(200).redirect(`/api/productos-test/`) */

    } catch (error) {
        console.log('error', error)
    }
}

exports.LogoutUSer = async (req, res) => {
    try {

        const usuarioCookie = req.session.usuario
        const userLog = await userModel.findOne({ usuario: usuarioCookie })

        if (!userLog) {
            res.status(404).json({ msg: 'usuario no encontrado' })
        } else {

            userLog.save()

            req.session.destroy((err) => {
                if (err) console.log(err)
            })

            res.render('logout', { info: userLog })

        }

    } catch (error) {
        console.log('error', error)
    }
}