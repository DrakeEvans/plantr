const { db, Gardener, Plot, Vegetable } = require('./models')


db.sync({force: true, logging: false})
    .then(() => {
        console.log('Database synced!')
        // db.close() // only if using a version of node without `finally`
    })
    .then(() => {

            const vegData = [
                {name: 'cucumber', color: 'green', planted_on: Date.now() -200000 },
                {name: 'broccoli', color: 'green', planted_on: Date.now() -100000 },
                {name: 'tomatoe', color: 'red', planted_on: Date.now() -300000 },
                {name: 'potatoe', color: 'brown', planted_on: Date.now() -10000 }
            ] 
            return Vegetable.bulkCreate(vegData, {returning: true})
    })
    .then((result) => {
        console.log('result', result)
    })
    .then((allVeggies) => {
        const arrNames = ['Patrick', 'Drake', 'Matt', 'Corey'];
        const arrAges = [56, 27, 30, 35];
        return allVeggies.map((elem, index) => {
            Gardener.create({name: arrNames[index], age: arrAges[index], favoriteVegetableId: elem.id})
        })
    })
    .then((allGardeners) => {
        console.log('allGardeners', allGardeners)
        const arrSize = [10,20,50,60];
        const arrShaded = [true, true, false, false];
        return allGardeners.map((elem, index) => {
            Plot.create({size: arrSize[index], shaded: arrShaded[index], gardenerId: elem.id})
        })
    })
    .catch(err => {
        console.log('Disaster! Something went wrong! ')
        console.log(err)
        // db.close() // only if using a version of node without `finally`
    })
    .finally(() => { // only if using a version of node WITH `finally`
        // db.close()
    })
