const calcular = (numRandom) => {
    let random = []

    for (let i = 0; i < 1000; i++) {
        let result = Math.floor(Math.random() * numRandom)
        random.push(result)
    }

    return random
}

process.on('message', (msg) => {
    if (msg === 'START') {
        let result = calcular()
        process.send(result)
    } else {
        console.log('No se ha inicializado todavia el proceso correctamente')
    }
})
