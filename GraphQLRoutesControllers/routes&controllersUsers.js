const userModel = require('../models/user.model')

const rootUser = {
    getUsers: async () => {
        const getAllUsers = await userModel.find({})
        return getAllUsers
    },
    oneUser: async (id) => {
        let oneUser = await userModel.findOne(id)
        return oneUser
    },
    createUser: async (name, lastname, age, celphone) => {
        
        const user = {
            name,
            lastname,
            age,
            celphone
        }
        const newUser = new userModel(user)
        newUser.save()
        console.log('user', newUser)
        return newUser
    },
    modifyUser: async (id, datos) => {
        const userToModify = await UserModel.findByIdAndUpdate(id, data, { new: true });
        return userToModify
    },
    deleteUser: async (id) => {
        const deleteUser = await FoodsModel.findByIdAndDelete(id)
        return 'Usuario Eliminado'
    }
}

module.exports = rootUser