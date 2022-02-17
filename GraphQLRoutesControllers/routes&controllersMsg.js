const MsgModel = require('../models/message.model')

const rootMsg = {
    getMessages: async () => {
        const getAllMessages = await MsgModel.find({})
        return getAllMessages
    },
    oneMessage: async (id) => {
        let oneMessage = await MsgModel.findOne(id)
        return oneMessage
    },
    createMessage: async (data) => {
          const newMessage = new MsgModel(data)  
          newMessage.save()
          return newMessage
    },
    modifyMessage: async(id, data) => {
        const modifyMessage = await MsgModel.findByIdAndUpdate(id, data, { new: true });
        return modifyMessage
    },
    deleteMessage: async(id) => {
        const deleteMessage = await FoodsModel.findByIdAndDelete(id)
        return 'Mensaje Eliminado'
    }
}

module.exports = rootMsg