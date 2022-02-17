const express = require('express')
const router = express.Router()
const minimist = require('minimist')(process.argv.splice(2))

router.get('/', (req, res) => {

    const Args = minimist
    delete Args['_']
    
    const sistOp = process.platform
    const versNode = process.version
    const memoryRss = process.memoryUsage().rss
    const pathExecution = process.execPath
    const proID = process.pid

    const fileProyectG = process.cwd()
    const fileProyectName = fileProyectG.split("\\").pop();
    
    const objData = {
        'Argumentos de entrada': Args,
        'Nombre de la plataforma (sistema operativo)': sistOp,
        'Versión de node.js ': versNode,
        'Memoria total reservada (rss)': memoryRss,
        'Path de ejecución': pathExecution,
        'Process id': proID,
        'Carpeta del proyecto': fileProyectName
    }

    res.send(objData)
})


module.exports = router
