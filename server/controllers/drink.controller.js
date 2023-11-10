const Drink = require('../models/drink.model')

exports.addDrink = async (req, res) =>{
    try{
        const {name, recipe, liquor} = req.body

        if (!req.auth || !req.auth.userId){  //handles autherization to make a create request, user must be logged in
            return res.status(403).send('User not authorized')
        }

        let picture
            if (req.file){
                picutre = req.file.path
            } else {
                picture = ' '  //if no picture is uploaded a empty string will be saved
            }

        const newDrink = new Drink({
            user: req.uth.userId,
            name,
            recipe,
            liquor,
            picture
        })

        const savedDrink = await newDrink.save()  // creates need drink entries
        res.status(200).json(savedDrink)
        console.log(res.statusCode)
        } catch(err) {
            console.log(err)
            res.status(500).send('Server Error while creating new drink')
        }
}

exports.getAllDrinks = async (req,res) =>{   // finds all drinks that were created
    try {
        const drinks = await Drink.find({})
        res.status(200).json(drinks)
        console.log(res.statusCode)
    } catch(err){
        res.status(500).send('Server Error while getting all drinks')
    }
}

exports.getUsersDrinks = async (req,res) =>{    // finds only the drinks of a specific user
    try{
        const drinks = await Drink.find({ user: req.auth.userId })
        res.status(200).json(drinks)
        console.log(res.statusCode)
    } catch(err) {
        res.status(500).send('Server error while getting users drinks')

    }
}

exports.getDrinksById = async (req,res) =>{   //will get a drink bassed off its id 
    try {
        const drink = await Drink.findById(req.params.id)
        if (!drink) {
             return res.status(404).send('Drink not found')
            }
        res.status(200).json(drink)
        console.log(res.statusCode)
    } catch(err){
        res.status(500).send('Server error while getting drink by id')
    }
}

exports.deleteDrinkById = async (req, res) =>{
    try{
        const drink = await Drink.findByIdAndDelete(req.params.id)
        if (!drink){
          return res.status(404).send('Drink not found')
        }
        res.status(200).json(drink)
        console.log(res.statusCode)
    } catch(err){
        res.status(500).send('Server error while deleting drink')
    }
}
