import express from 'express';
import Drink from '../models/Drink.js';

const router = express.Router();

//GEt all drinks
router.get('/', async (req, res) => {
    try {
        const drinks = await Drink.find();
        res.json(drinks);
    } catch (err) {
        console.error('Error fetching drinks:', err);
        res.status(500).send('Error fetching drinks');
    }
  
});

//Add a new drink
router.post('/', async (req, res) => {
    try {
        console.log("Received body", req.body);
        //Check if the request body is an array
        if (Array.isArray(req.body)) {
            console.log("Processing as bulk insert")
            //Validate drinks before inserting
            const validDrinks = req.body.filter(drink =>
                drink.name && drink.quantity !== undefined && drink.price !== undefined && drink.category
            );

            if (validDrinks.length === 0) {
                return res.status(400).json({message: 'Invalid data: All drinks must have a name, price, and quantity'});
            }
            const drinks = await Drink.insertMany(validDrinks);
            return res.status(201).json({message: 'Drinks added', drinks});
        }
        

        const {name, price, quantity, category} = req.body;

        if (!name || !price || !quantity) {
            return res.status(400).json({message: 'Invalid data: All drinks must have a name, price, and quantity'});
        }

         const drink = new Drink({
            name,
            quantity: Number(quantity),
            price: Number(price),
            category,
         });
         await drink.save();
         return res.status(201).json({message: 'Single drink added',drink});
    } catch (err) {
        console.error('Error adding drink:', err);
        res.status(500).send('Error adding drink');
    }
    
});

//Update Drink
router.put('/:id', async (req, res) => {
    await Drink.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
})

//Delete drink
router.delete('/:id', async (req, res) => {
    await Drink.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
});

export default router;